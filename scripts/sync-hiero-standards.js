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
const HIERO_LOCAL_PATH =
  process.env.HIERO_LOCAL_PATH ||
  path.resolve(__dirname, '..', '..', 'hiero-consensus-specifications');
const HIERO_SYNC_SOURCE = (process.env.HIERO_SYNC_SOURCE || '').toLowerCase();
const LOCAL_ROOT = path.resolve(__dirname, '..');
const TMP_DIR = path.join(LOCAL_ROOT, '.hiero-sync-tmp');

const SYNC_PATHS = [
  { src: 'docs/standards', dest: 'docs/standards' },
  { src: 'docs/assets', dest: 'docs/assets' },
];

const PRESERVE_PATTERNS = [/-old\.md$/];
const SKIP_PATTERNS = [/^_category_\.json$/, /^index\.mdx$/];

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

function escapeNumericOperatorIdAtSign(content) {
  return content.replace(/\b(\d+\.\d+\.\d+)@(\d+\.\d+\.\d+)\b/g, '$1&#64;$2');
}

function replaceEmptyIdAnchors(content) {
  const emptyAnchorTag = /<a\s+id=(["'])([^"']+)\1\s*><\/a>/g;
  const selfClosingAnchorTag = /<a\s+id=(["'])([^"']+)\1\s*\/>/g;

  return content
    .replace(emptyAnchorTag, '<span id="$2"></span>')
    .replace(selfClosingAnchorTag, '<span id="$2"></span>');
}

function fixHcs25InternalLinks(content) {
  let updated = content;

  updated = updated.replace(
    /^\s*-\s*`\.\/hcs-25\/signals\/index\.md`\s*\([^)]+\)\s*$/m,
    '- [Signal catalog](./hcs-25/signals/index.md) — index + per-signal docs',
  );
  updated = updated.replace(
    /^\s*-\s*`\.\/hcs-25\/adapters\/index\.md`\s*\([^)]+\)\s*$/m,
    '- [Adapter catalog](./hcs-25/adapters/index.md) — index + per-adapter docs',
  );
  updated = updated.replace(
    /^\s*-\s*`\.\/hcs-25\/simple-evals\.md`\s*\([^)]+\)\s*$/m,
    '- [Simple eval methodology](./hcs-25/signals/simple-evals.md) — detailed SimpleMath/SimpleScience rubric',
  );
  updated = updated.replace(
    /^\s*-\s*`\.\/hcs-25\/signals\/simple-evals\.md`\s*\([^)]+\)\s*$/m,
    '- [Simple eval methodology](./hcs-25/signals/simple-evals.md) — detailed SimpleMath/SimpleScience rubric',
  );

  updated = updated.replace(
    /SimpleMath\/SimpleScience eval results \(see `\.\/hcs-25\/simple-evals\.md`\)\./g,
    'SimpleMath/SimpleScience eval results (see [Simple eval methodology](./hcs-25/signals/simple-evals.md)).',
  );
  updated = updated.replace(
    /SimpleMath\/SimpleScience eval results \(see `\.\/hcs-25\/signals\/simple-evals\.md`\)\./g,
    'SimpleMath/SimpleScience eval results (see [Simple eval methodology](./hcs-25/signals/simple-evals.md)).',
  );

  updated = updated.replace(
    /^-\s*Poll topic:\s*hcs:\/\/8\/<topicId>\s*\(or Mirror Node link\)\s*$/m,
    '- Poll topic: `hcs://8/<topicId>` (or Mirror Node link)',
  );
  updated = updated.replace(
    /^-\s*Reference:\s*<txn id or final tally link>\s*$/m,
    '- Reference: (txn id or final tally link)',
  );

  return updated;
}

function fixHcs9InternalLinks(content) {
  return content
    .replace(/\]\(base-schema\)/g, '](../base-schema)')
    .replace(/\]\(base-schema\/\)/g, '](../base-schema/)');
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
        let escapedContent = escapeMdxAngleBrackets(content);

        if (destPath.endsWith(path.join('docs', 'standards', 'hcs-25.md'))) {
          escapedContent = fixHcs25InternalLinks(escapedContent);
        }

        if (
          destPath.endsWith(
            path.join('docs', 'standards', 'hcs-9', 'specification', 'overview.md'),
          )
        ) {
          escapedContent = fixHcs9InternalLinks(escapedContent);
        }

        escapedContent = escapeNumericOperatorIdAtSign(escapedContent);
        escapedContent = replaceEmptyIdAnchors(escapedContent);

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

/**
 * Parse frontmatter from markdown content.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }
  return frontmatter;
}

/**
 * Extract status from markdown body (looks for "### Status: Published" or similar).
 */
function extractStatus(content) {
  const match = content.match(/###?\s*\*?\*?Status:?\*?\*?\s*(\w+)/i);
  if (match) {
    const status = match[1].toLowerCase();
    if (status === 'published' || status === 'draft') {
      return status;
    }
  }
  return 'draft';
}

/**
 * Local category and feature mappings for standards.
 * This supplements the synced data with display metadata.
 */
const CATEGORY_MAP = {
  'hcs-1': { category: 'Core Data Management', features: ['Data chunking', 'File reconstruction', 'Consensus-based storage'] },
  'hcs-2': { category: 'Core Data Management', features: ['Topic organization', 'Registry management', 'Data indexing'] },
  'hcs-3': { category: 'Core Data Management', features: ['Recursive references', 'Resource loading', 'Standardized linking'] },
  'hcs-4': { category: 'Governance & Process', features: ['Lifecycle', 'Last Call', 'Conformance'] },
  'hcs-5': { category: 'Digital Assets & NFTs', features: ['NFT creation', 'File tokenization', 'HTS integration'] },
  'hcs-6': { category: 'Digital Assets & NFTs', features: ['Mutable metadata', 'Dynamic updates', 'Flexible NFTs'] },
  'hcs-7': { category: 'Digital Assets & NFTs', features: ['Smart contracts', 'WASM processing', 'State-reactive NFTs'] },
  'hcs-8': { category: 'Governance & Polling', features: ['Decentralized voting', 'Poll management', 'Result aggregation'] },
  'hcs-9': { category: 'Governance & Polling', features: ['Poll schemas', 'Metadata standards', 'Execution framework'] },
  'hcs-10': { category: 'AI & Communication', features: ['AI communication', 'Agent discovery', 'Decentralized registry'] },
  'hcs-11': { category: 'Identity & Profiles', features: ['Profile metadata', 'Identity standards', 'Cross-app compatibility'] },
  'hcs-12': { category: 'Application Composition', features: ['WASM actions', 'Gutenberg blocks', 'Assembly composition'] },
  'hcs-13': { category: 'Infrastructure', features: ['Schema validation', 'Type-safe data', 'JSON Schema support'] },
  'hcs-14': { category: 'AI & Communication', features: ['Agent identification', 'Cross-protocol routing', 'DID compatibility'] },
  'hcs-15': { category: 'Identity & Profiles', features: ['Multiple profiles', 'Account isolation', 'Same-key management'] },
  'hcs-16': { category: 'AI & Communication', features: ['Multi-party coordination', 'Shared escrow', 'Agent consensus'] },
  'hcs-17': { category: 'Infrastructure', features: ['State verification', 'Hash calculation', 'Audit trails'] },
  'hcs-18': { category: 'AI & Communication', features: ['Agent discovery', 'Formation protocol', 'Autonomous coordination'] },
  'hcs-19': { category: 'AI & Communication', features: ['Privacy compliance', 'Consent management', 'Data processing records', 'GDPR/CCPA support'] },
  'hcs-20': { category: 'Points & Rewards', features: ['Point management', 'Audit trails', 'Reward systems'] },
  'hcs-21': { category: 'Infrastructure', features: ['Adapter declarations', 'HCS-1 manifest pointers', 'Registry-of-registries support'] },
};

const DEFAULT_CATEGORY = { category: 'Uncategorized', features: [] };

/**
 * Generate standards manifest from synced markdown files.
 */
function generateStandardsManifest(standardsDir) {
  const manifest = [];
  const entries = fs.readdirSync(standardsDir, { withFileTypes: true });

  for (const entry of entries) {
    let filePath;
    let hcsId;

    if (entry.isFile() && entry.name.match(/^hcs-\d+\.md$/)) {
      filePath = path.join(standardsDir, entry.name);
      hcsId = entry.name.replace('.md', '');
    } else if (entry.isDirectory() && entry.name.match(/^hcs-\d+$/)) {
      const indexPath = path.join(standardsDir, entry.name, 'index.md');
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
        hcsId = entry.name;
      }
    }

    if (!filePath || !hcsId) continue;
    if (hcsId === 'hcs-XX') continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const status = extractStatus(content);
    const categoryData = CATEGORY_MAP[hcsId] || DEFAULT_CATEGORY;

    const hcsNumber = parseInt(hcsId.replace('hcs-', ''), 10);
    const title = frontmatter.title || `HCS-${hcsNumber}`;
    const description = frontmatter.description || '';

    manifest.push({
      id: hcsId,
      number: hcsNumber,
      title,
      description,
      status,
      category: categoryData.category,
      features: categoryData.features,
      href: `/docs/standards/${hcsId}`,
      icon: hcsId.toUpperCase(),
    });
  }

  manifest.sort((a, b) => a.number - b.number);
  return manifest;
}

async function main() {
  console.log('Syncing standards from hiero-consensus-specifications...\n');
  console.log(`Repository: ${HIERO_REPO}`);
  console.log(`Branch: ${HIERO_BRANCH}`);

  const localStandardsDir = path.join(HIERO_LOCAL_PATH, 'docs', 'standards');
  const localAssetsDir = path.join(HIERO_LOCAL_PATH, 'docs', 'assets');
  const localSourceAvailable =
    fs.existsSync(localStandardsDir) && fs.existsSync(localAssetsDir);
  const useLocalSource =
    HIERO_SYNC_SOURCE !== 'remote' && localSourceAvailable;

  if (useLocalSource) {
    console.log(`Source: local (${HIERO_LOCAL_PATH})`);
    console.log('  (set HIERO_SYNC_SOURCE=remote to force GitHub)\n');
  } else {
    console.log('Source: GitHub (sparse checkout)\n');
  }

  cleanupTmp();

  try {
    if (!useLocalSource) {
      console.log('Cloning repository (sparse checkout)...');
      execSync(
        `git clone --depth 1 --filter=blob:none --sparse --branch ${HIERO_BRANCH} ${HIERO_REPO} "${TMP_DIR}"`,
        { stdio: 'pipe' }
      );

      execSync('git sparse-checkout set docs/standards docs/assets', {
        cwd: TMP_DIR,
        stdio: 'pipe',
      });
    }

    let totalCopied = 0;
    const preservedFiles = [];

    const sourceRoot = useLocalSource ? HIERO_LOCAL_PATH : TMP_DIR;

    for (const { src, dest } of SYNC_PATHS) {
      const srcDir = path.join(sourceRoot, src);
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

    console.log('\nGenerating standards manifest...');
    const standardsDir = path.join(LOCAL_ROOT, 'docs/standards');
    const manifest = generateStandardsManifest(standardsDir);
    const manifestPath = path.join(LOCAL_ROOT, 'src/data/standards-manifest.json');
    ensureDir(path.dirname(manifestPath));
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`  Generated manifest with ${manifest.length} standards`);
  } finally {
    cleanupTmp();
  }
}

main().catch((err) => {
  cleanupTmp();
  console.error('Sync failed:', err?.message || err);
  process.exit(1);
});
