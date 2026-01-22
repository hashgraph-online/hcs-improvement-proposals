#!/usr/bin/env node
// Generate legal pages from env or remote sources at build time (no legal text in repo).

const fs = require('fs');
const path = require('path');

const DEFAULT_TERMS_URL = process.env.TERMS_URL || 'https://hol.org/points/legal/terms';
const DEFAULT_PRIVACY_URL = process.env.PRIVACY_URL || 'https://hol.org/points/legal/privacy';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function resolveContent({ inlineVar, urlVar, fallbackUrl, name }) {
  if (process.env[inlineVar]) return process.env[inlineVar];
  const url = process.env[urlVar] || fallbackUrl;
  return fetchText(url);
}

async function main() {
  const pagesDir = path.join(process.cwd(), 'src/pages');

  const sanitizeLinks = (text) =>
    text.replace(/<([^\s>]+)>/g, (_match, url) => `[${url}](${url})`);

  const CONTACT_URL = 'https://hol.org/contact/';

  /** Convert relative /points/ links to absolute hol.org URLs */
  const absolutizeLinks = (text) =>
    text.replace(/\]\(\/points\//g, '](https://hol.org/points/');

  const rewriteMailtoLinks = (text) =>
    text.replace(/\[([^\]]+)\]\(mailto:[^)]+\)/g, () => `[Contact us](${CONTACT_URL})`);

  const rewriteEmailAddresses = (text) =>
    text.replace(
      /\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
      () => `[Contact us](${CONTACT_URL})`,
    );

  const normalizeLegacyPointsPrivacyLinks = (text) =>
    text
      .replace(/\(\/points\/privacy-policy\)/g, '(https://hol.org/points/legal/privacy)')
      .replace(
        /\(https:\/\/hol\.org\/points\/privacy-policy\)/g,
        '(https://hol.org/points/legal/privacy)',
      );

  try {
    const [terms, privacy] = await Promise.all([
      resolveContent({ inlineVar: 'TERMS_MD', urlVar: 'TERMS_URL', fallbackUrl: DEFAULT_TERMS_URL, name: 'terms' }),
      resolveContent({ inlineVar: 'PRIVACY_MD', urlVar: 'PRIVACY_URL', fallbackUrl: DEFAULT_PRIVACY_URL, name: 'privacy' }),
    ]);

    fs.writeFileSync(
      path.join(pagesDir, 'terms-of-service.mdx'),
      `---\ntitle: Terms of Service\n---\n\n<!-- auto-generated at build time; source not stored in repo -->\n\n${rewriteEmailAddresses(rewriteMailtoLinks(normalizeLegacyPointsPrivacyLinks(absolutizeLinks(sanitizeLinks(terms)))))}\n`,
      'utf8',
    );

    fs.writeFileSync(
      path.join(pagesDir, 'privacy-policy.mdx'),
      `---\ntitle: Privacy Policy\n---\n\n<!-- auto-generated at build time; source not stored in repo -->\n\n${rewriteEmailAddresses(rewriteMailtoLinks(normalizeLegacyPointsPrivacyLinks(absolutizeLinks(sanitizeLinks(privacy)))))}\n`,
      'utf8',
    );

    console.log('Legal pages generated successfully.');
  } catch (err) {
    console.error('Failed to generate legal pages:', err?.message || err);
    process.exit(1);
  }
}

main();
