#!/usr/bin/env node
/**
 * Generate sidebar configuration for HCS standards from directory structure.
 *
 * This script scans docs/standards/ and generates a TypeScript sidebar configuration
 * that can be imported into sidebars.ts. It automatically detects:
 * - Single-file standards (hcs-X.md)
 * - Multi-file standards with subdirectories (hcs-X/index.md + children)
 * - Nested subdirectories (profiles/, specification/, implementation/, etc.)
 *
 * Run after sync-hiero-standards.js to keep sidebar in sync with upstream.
 */

const fs = require('fs');
const path = require('path');

const LOCAL_ROOT = path.resolve(__dirname, '..');
const STANDARDS_DIR = path.join(LOCAL_ROOT, 'docs/standards');
const OUTPUT_PATH = path.join(LOCAL_ROOT, 'src/data/standards-sidebar.json');

/**
 * Labels for HCS standards - manually maintained for nice display names.
 * Falls back to extracting from frontmatter or generating from ID.
 */
const STANDARD_LABELS = {
  'hcs-1': 'HCS-1: File Management',
  'hcs-2': 'HCS-2: Topic Registries',
  'hcs-3': 'HCS-3: Recursion',
  'hcs-4': 'HCS-4: Governance & Process',
  'hcs-5': 'HCS-5: Hashinals',
  'hcs-6': 'HCS-6: Dynamic Hashinals',
  'hcs-7': 'HCS-7: Smart Hashinals',
  'hcs-8': 'HCS-8: Poll Topic',
  'hcs-9': 'HCS-9: Poll Metadata',
  'hcs-10': 'HCS-10: OpenConvAI',
  'hcs-11': 'HCS-11: Profile Metadata',
  'hcs-12': 'HCS-12: HashLinks',
  'hcs-13': 'HCS-13: Schema Registry',
  'hcs-14': 'HCS-14: Universal Agent ID',
  'hcs-15': 'HCS-15: Petal Accounts',
  'hcs-16': 'HCS-16: Flora Coordination',
  'hcs-17': 'HCS-17: State Hash Calculation',
  'hcs-18': 'HCS-18: Flora Discovery Protocol',
  'hcs-19': 'HCS-19: AI Agent Privacy Compliance',
  'hcs-20': 'HCS-20: Auditable Points',
  'hcs-21': 'HCS-21: Adapter Registry',
  'hcs-25': 'HCS-25: Agent Reputation Signals',
};

/**
 * Subdirectory labels for nice display names.
 */
const SUBDIR_LABELS = {
  profiles: 'Profiles',
  specification: 'Specification',
  implementation: 'Implementation',
  signals: 'Signals',
  adapters: 'Adapters',
};

/**
 * Parse frontmatter to extract title and sidebar_label.
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
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }
  return frontmatter;
}

/**
 * Get label for a markdown file from frontmatter or filename.
 */
function getLabelFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fm = parseFrontmatter(content);
    return fm.sidebar_label || fm.title || null;
  } catch {
    return null;
  }
}

/**
 * Convert filename to readable label.
 */
function filenameToLabel(filename) {
  const name = filename.replace(/\.mdx?$/, '');
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Build sidebar item for a single doc.
 */
function buildDocItem(docId, label) {
  return {
    type: 'doc',
    id: docId,
    label,
  };
}

/**
 * Build sidebar items for a subdirectory.
 */
function buildSubdirItems(dirPath, baseDocId) {
  const items = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const files = entries.filter(
    (e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx'))
  );
  const subdirs = entries.filter((e) => e.isDirectory());

  // Sort files by sidebar_position or alphabetically
  const sortedFiles = files
    .filter((f) => f.name !== 'index.md' && f.name !== 'index.mdx')
    .map((f) => {
      const filePath = path.join(dirPath, f.name);
      const docId = `${baseDocId}/${f.name.replace(/\.mdx?$/, '')}`;
      const label =
        getLabelFromFile(filePath) || filenameToLabel(f.name);
      return { filePath, docId, label, name: f.name };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  for (const file of sortedFiles) {
    items.push(buildDocItem(file.docId, file.label));
  }

  // Handle nested subdirectories
  for (const subdir of subdirs) {
    const subdirPath = path.join(dirPath, subdir.name);
    const subdirDocId = `${baseDocId}/${subdir.name}`;
    const subdirLabel = SUBDIR_LABELS[subdir.name] || filenameToLabel(subdir.name);

    const nestedItems = buildSubdirItems(subdirPath, subdirDocId);
    if (nestedItems.length > 0) {
      items.push({
        type: 'category',
        label: subdirLabel,
        collapsible: true,
        collapsed: true,
        items: nestedItems,
      });
    }
  }

  return items;
}

/**
 * Build sidebar configuration for a single HCS standard.
 */
function buildStandardSidebar(hcsId, standardPath, isDirectory) {
  const label = STANDARD_LABELS[hcsId] || `${hcsId.toUpperCase()}`;

  if (!isDirectory) {
    // Single-file standard
    return buildDocItem(`standards/${hcsId}`, label);
  }

  // Multi-file standard with index.md
  const indexPath = path.join(standardPath, 'index.md');
  const indexMdxPath = path.join(standardPath, 'index.mdx');
  const hasIndex = fs.existsSync(indexPath) || fs.existsSync(indexMdxPath);

  if (!hasIndex) {
    // Directory without index - use autogenerated
    return {
      type: 'category',
      label,
      collapsible: true,
      collapsed: true,
      items: [{ type: 'autogenerated', dirName: `standards/${hcsId}` }],
    };
  }

  // Build items from subdirectories and files
  const items = buildSubdirItems(standardPath, `standards/${hcsId}`);

  if (items.length === 0) {
    // Directory with only index.md - treat as single doc
    return buildDocItem(`standards/${hcsId}/index`, label);
  }

  return {
    type: 'category',
    label,
    link: { type: 'doc', id: `standards/${hcsId}/index` },
    collapsible: true,
    collapsed: true,
    items,
  };
}

/**
 * Generate complete standards sidebar configuration.
 */
function generateStandardsSidebar() {
  const entries = fs.readdirSync(STANDARDS_DIR, { withFileTypes: true });
  const standardsMap = new Map();

  for (const entry of entries) {
    // Match hcs-XX pattern
    const match = entry.name.match(/^hcs-(\d+)(\.md)?$/);
    if (!match) continue;

    const hcsNumber = parseInt(match[1], 10);
    const hcsId = `hcs-${hcsNumber}`;
    const isDirectory = entry.isDirectory();
    const standardPath = path.join(STANDARDS_DIR, entry.name);

    // Skip template file
    if (entry.name === 'hcs-XX.md') continue;

    // If we already have this standard, prefer directory over file
    if (standardsMap.has(hcsId)) {
      const existing = standardsMap.get(hcsId);
      // Prefer directory (has subdocs) over single file
      if (isDirectory && !existing.isDirectory) {
        standardsMap.set(hcsId, {
          number: hcsNumber,
          id: hcsId,
          path: standardPath,
          isDirectory,
        });
      }
      // Otherwise keep existing (first one wins if both same type)
      continue;
    }

    standardsMap.set(hcsId, {
      number: hcsNumber,
      id: hcsId,
      path: standardPath,
      isDirectory,
    });
  }

  // Convert map to sorted array
  const standards = Array.from(standardsMap.values());

  // Sort by HCS number
  standards.sort((a, b) => a.number - b.number);

  // Build sidebar items
  const sidebarItems = standards.map((std) =>
    buildStandardSidebar(std.id, std.path, std.isDirectory)
  );

  return sidebarItems;
}

/**
 * Main entry point.
 */
async function main() {
  console.log('Generating standards sidebar configuration...\n');

  if (!fs.existsSync(STANDARDS_DIR)) {
    console.error(`Standards directory not found: ${STANDARDS_DIR}`);
    console.error('Run sync-hiero-standards.js first.');
    process.exit(1);
  }

  const sidebarItems = generateStandardsSidebar();

  // Write JSON output
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sidebarItems, null, 2), 'utf8');
  console.log(`Generated sidebar config with ${sidebarItems.length} standards`);
  console.log(`Output: ${OUTPUT_PATH}`);

  // Also output TypeScript snippet for manual integration
  console.log('\n--- TypeScript snippet for sidebars.ts ---\n');
  console.log('// Import at top of sidebars.ts:');
  console.log("import standardsSidebarItems from './src/data/standards-sidebar.json';");
  console.log('\n// Use in sidebar config:');
  console.log(`{
  type: 'category',
  label: 'Standards',
  link: { type: 'doc', id: 'standards/index' },
  collapsible: true,
  collapsed: true,
  items: standardsSidebarItems,
}`);
}

main().catch((err) => {
  console.error('Generation failed:', err?.message || err);
  process.exit(1);
});
