import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

type MarkdownNode = {
  type?: string;
  value?: string;
  url?: string;
  children?: MarkdownNode[];
};

const remarkRewriteGithubAutolinks = () => {
  const visit = (node: MarkdownNode | undefined) => {
    if (!node) return;

    if (
      node.type === 'link' &&
      typeof node.url === 'string' &&
      node.url.startsWith('https://github.com/') &&
      Array.isArray(node.children) &&
      node.children.length === 1 &&
      node.children[0]?.type === 'text' &&
      node.children[0]?.value === node.url
    ) {
      node.children[0].value = 'GitHub';
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  };

  return (tree: MarkdownNode) => {
    visit(tree);
  };
};

const config: Config = {
  title: 'Hashgraph Online',
  tagline: 'Building the future of the internet, on-graph.',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  headTags: [
    {
      tagName: 'style',
      attributes: {},
      innerHTML: `
        /* Font fallbacks with size-adjust to prevent CLS during font loading */
        @font-face{font-family:'Roboto Fallback';src:local('Arial');size-adjust:100.3%;ascent-override:92%;descent-override:22%;line-gap-override:0%}
        @font-face{font-family:'Roboto Mono Fallback';src:local('Courier New');size-adjust:106%;ascent-override:85%;descent-override:22%;line-gap-override:0%}
        /* Critical CSS for above-the-fold content */
        body{margin:0;font-family:'Roboto','Roboto Fallback',system-ui,-apple-system,sans-serif;background:#fff}
        .navbar{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.95);backdrop-filter:blur(8px)}
        [data-theme='dark'] body{background:#111827;color:#f3f4f6}
        [data-theme='dark'] .navbar{background:rgba(17,24,39,.95)}
        main{min-height:100vh}
        section{position:relative;overflow:hidden}
        .container{max-width:1280px;margin:0 auto;padding:0 1rem}
        h1,h2,h3{font-family:'Roboto Mono','Roboto Mono Fallback',monospace;font-weight:500}
        .text-brand-blue{color:#5599fe}
        .bg-brand-blue{background:#5599fe}
        .text-brand-purple{color:#a679f0}
        .text-brand-green{color:#48df7b}
        /* Hero skeleton critical styles */
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}
        .bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
        .from-gray-200{--tw-gradient-from:#e5e7eb;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
        .to-gray-100{--tw-gradient-to:#f3f4f6}
        [data-theme='dark'] .dark\\:from-gray-700{--tw-gradient-from:#374151}
        [data-theme='dark'] .dark\\:to-gray-800{--tw-gradient-to:#1f2937}
        /* Reserve space for standards page header to prevent CLS */
        .standards-main-title{min-height:3.5rem}
      `,
    },
  ],

  // Set the production url of your site here
  url: 'https://hol.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'HashgraphOnline', // Usually your GitHub org/user name.
  projectName: 'hashgraph-online', // Usually your repo name.

  onBrokenLinks: 'warn',
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenAnchors: 'ignore',

  // Client modules for post-hydration effects
  clientModules: [
    './src/clientModules/hydration-marker.ts',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          remarkPlugins: [remarkRewriteGithubAutolinks],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          remarkPlugins: [remarkRewriteGithubAutolinks],
        },
        sitemap: {
          ignorePatterns: [
            '/sdk/**',
            '/hackathon/**',
            '/blog/updates/**',
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/og-card.png',
    algolia: {
      appId: 'INUYES5FGM',
      apiKey: '2b3fe9b2882e46e19fa5fce6272efe4f',
      indexName: 'Docs',
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    navbar: {
      title: 'HOL',
      logo: {
        alt: 'Hashgraph Online Logo',
        src: 'Logo_Icon.webp',
        href: 'https://hol.org',
        target: '_self',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'dropdown',
          label: 'Platform',
          position: 'left',
          items: [
            { label: 'Agent Registry', href: 'https://hol.org/registry' },
            { label: 'Hashnet MCP', href: 'https://hol.org/mcp' },
            { label: 'Points Portal', href: 'https://hol.org/points' },
            { label: 'Use Cases', href: 'https://hol.org/use-cases' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            { label: 'API Docs', href: 'https://hol.org/registry/docs' },
            { label: 'Standards SDK', to: '/docs/libraries/standards-sdk' },
            { label: 'Tutorials', to: '/tutorials' },
            { label: 'Getting Started', href: 'https://hol.org/start' },
            { label: 'Conversational Agent', to: '/docs/libraries/conversational-agent' },
            { label: 'Explore All Tools', to: '/tools' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Standards',
          position: 'left',
          items: [
            { label: 'Standards Overview', to: '/standards' },
            { label: 'Standards Library', to: '/docs/standards/' },
            { label: 'Files & Hashinals', to: '/hashinals' },
            { label: 'Data Registries', to: '/registries' },
            { label: 'Universal Agent Identity', to: '/hcs-14' },
            { label: 'Identity Metadata', to: '/profiles' },
            { label: 'Auditable Points', to: '/hcs-20' },
            { label: 'Agent Communication', to: '/openconvai' },
            { label: 'AppNet Accounts', to: '/floras' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          position: 'left',
          items: [
            { label: 'DAO Members', href: 'https://hol.org/members' },
            { label: 'Patchwork Event', to: '/patchwork' },
            { label: 'Africa Hackathon (Ended)', to: '/hackathon' },
            { label: 'OpenConvAI Hackathon (Ended)', to: '/hedera-ai-agents-hackathon' },
            { label: 'Hedera x AI Demo Day (Ended)', to: '/hederaai' },
            { label: 'Newsletter', href: 'https://hol.org/newsletter' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Company',
          position: 'left',
          items: [
            { label: 'About', href: 'https://hol.org/overview' },
            { label: 'Careers', href: 'https://hol.org/careers' },
            { label: 'Blog', to: '/blog' },
            { label: 'Contact', href: 'https://hol.org/contact' },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            {
              label: 'Agent Registry',
              href: 'https://hol.org/registry',
            },
            {
              label: 'Hashnet MCP',
              href: 'https://hol.org/mcp',
            },
            {
              label: 'Points Portal',
              href: 'https://hol.org/points',
            },
            {
              label: 'Use Cases',
              href: 'https://hol.org/use-cases',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Getting Started',
              href: 'https://hol.org/start',
            },
            {
              label: 'Standards SDK',
              to: '/docs/libraries/standards-sdk',
            },
            {
              label: 'API Docs',
              href: 'https://hol.org/registry/docs',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hashgraph-online',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://hol.org/overview',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Careers',
              href: 'https://hol.org/careers',
            },
            {
              label: 'Contact',
              href: 'https://hol.org/contact',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'DAO Members',
              href: 'https://hol.org/members',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/hashinals',
            },
            {
              label: 'X',
              href: 'https://x.com/HashgraphOnline',
            },
            {
              label: 'Newsletter',
              href: 'https://hol.org/newsletter',
            },
          ],
        },
      ],
      copyright: `Built on Hedera Hashgraph. Open-source standards. 28M+ transactions processed. Copyright © ${new Date().getFullYear()} Hashgraph Online DAO LLC.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.nightOwl,
      additionalLanguages: [
        'typescript',
        'bash',
        'json',
        'jsx',
        'tsx',
        'yaml',
        'solidity',
        'markdown',
        'go',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
    scripts: [],
  } satisfies Preset.ThemeConfig,

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    require.resolve('./injectScriptPlugin.js'),
  ],
};

export default config;
