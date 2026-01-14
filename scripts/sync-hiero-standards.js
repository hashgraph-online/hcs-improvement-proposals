#!/usr/bin/env node
/**
 * Sync standards from hiero-consensus-specifications to hcs-improvement-proposals.
 *
 * This script fetches the docs/standards/ folder from the upstream hiero-consensus-specifications
 * GitHub repository and copies it to the local docs/standards/ folder at build time.
 * This keeps the hol.org site in sync with the Linux Foundation canonical source
 * without duplicating content in git.
 *
 * Files matching *-old.md are preserved locally (not overwritten) as they are legacy docs
 * specific to hol.org.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const HIERO_REPO = 'https://github.com/hiero-ledger/hiero-consensus-specifications.git';
const HIERO_BRANCH = process.env.HIERO_BRANCH || 'main';
const LOCAL_ROOT = path.resolve(__dirname, '..');
const TMP_DIR = path.join(LOCAL_ROOT, '.hiero-sync-tmp');

const SYNC_PATHS = [
  { src: 'docs/standards', dest: 'docs/standards' },
  { src: 'docs/assets', dest: 'docs/assets' },
];

const PRESERVE_PATTERNS = [/-old\.md$/];
const SKIP_PATTERNS = [/^_category_\.json$/];

/**
 * Escape angle brackets that MDX would interpret as JSX tags.
 * Matches patterns like <placeholder>, <topicId>, <long title>, etc.
 * but NOT valid HTML tags like <div>, <code>, <a>, etc.
 * Uses HTML entities to escape, which works in both YAML and MDX.
 */
function escapeMdxAngleBrackets(content) {
  const validHtmlTags = new Set([
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
    'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
    'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
    'em', 'embed',
    'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins',
    'kbd', 'label', 'legend', 'li', 'link',
    'main', 'map', 'mark', 'menu', 'meta', 'meter',
    'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output',
    'p', 'param', 'picture', 'pre', 'progress',
    'q', 'rp', 'rt', 'ruby',
    's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg',
    'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
    'u', 'ul', 'var', 'video', 'wbr',
  ]);

  return content.replace(/<([a-zA-Z][a-zA-Z0-9\s_-]*)>/g, (match, tagContent) => {
    const tagName = tagContent.trim().split(/\s/)[0].toLowerCase();
    if (validHtmlTags.has(tagName)) {
      return match;
    }
    return `&lt;${tagContent}&gt;`;
  });
}

function shouldPreserve(filename) {
  return PRESERVE_PATTERNS.some((pattern) => pattern.test(filename));
}

function shouldSkip(filename) {
  return SKIP_PATTERNS.some((pattern) => pattern.test(filename));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function cleanupTmp() {
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

function copyRecursive(srcDir, destDir, stats = { copied: 0, skipped: 0 }) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`Source directory not found: ${srcDir}`);
    return stats;
  }

  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, stats);
    } else if (entry.isFile()) {
      if (shouldSkip(entry.name)) {
        stats.skipped++;
        continue;
      }

      if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const content = fs.readFileSync(srcPath, 'utf8');
        const escapedContent = escapeMdxAngleBrackets(content);
        fs.writeFileSync(destPath, escapedContent, 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      stats.copied++;
    }
  }

  return stats;
}

function getLocalOnlyFiles(srcDir, destDir) {
  const localOnly = [];

  if (!fs.existsSync(destDir)) return localOnly;

  const destEntries = fs.readdirSync(destDir, { withFileTypes: true });
  const srcEntries = fs.existsSync(srcDir)
    ? new Set(fs.readdirSync(srcDir))
    : new Set();

  for (const entry of destEntries) {
    if (entry.isFile() && !srcEntries.has(entry.name)) {
      if (shouldPreserve(entry.name)) {
        localOnly.push(entry.name);
      }
    }
  }

  return localOnly;
}

async function main() {
  console.log('Syncing standards from hiero-consensus-specifications...\n');
  console.log(`Repository: ${HIERO_REPO}`);
  console.log(`Branch: ${HIERO_BRANCH}\n`);

  cleanupTmp();

  try {
    console.log('Cloning repository (sparse checkout)...');
    execSync(
      `git clone --depth 1 --filter=blob:none --sparse --branch ${HIERO_BRANCH} ${HIERO_REPO} "${TMP_DIR}"`,
      { stdio: 'pipe' }
    );

    execSync('git sparse-checkout set docs/standards docs/assets', {
      cwd: TMP_DIR,
      stdio: 'pipe',
    });

    let totalCopied = 0;
    const preservedFiles = [];

    for (const { src, dest } of SYNC_PATHS) {
      const srcDir = path.join(TMP_DIR, src);
      const destDir = path.join(LOCAL_ROOT, dest);

      const localOnly = getLocalOnlyFiles(srcDir, destDir);
      preservedFiles.push(...localOnly.map((f) => path.join(dest, f)));

      console.log(`Syncing ${src} -> ${dest}`);
      const stats = copyRecursive(srcDir, destDir);
      totalCopied += stats.copied;
      console.log(`  Copied ${stats.copied} files`);
    }

    if (preservedFiles.length > 0) {
      console.log('\nPreserved local-only files (not in hiero):');
      preservedFiles.forEach((f) => console.log(`  - ${f}`));
    }

    console.log(`\nSync complete. Total files copied: ${totalCopied}`);
  } finally {
    cleanupTmp();
  }
}

main().catch((err) => {
  cleanupTmp();
  console.error('Sync failed:', err?.message || err);
  process.exit(1);
});
