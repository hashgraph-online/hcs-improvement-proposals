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
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap',
      },
    },
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
          label: 'Registry',
          position: 'left',
          items: [
            { type: 'html', className: 'navbar-dropdown-header', value: 'AI Agents' },
            { label: 'Home', href: 'https://hol.org/registry' },
            { label: 'Browse Agents', href: 'https://hol.org/registry/search' },
            { label: 'Registry Dashboard', href: 'https://hol.org/registry/registry-dashboard' },
            { label: 'Register Agent', href: 'https://hol.org/registry/register' },
            { label: 'Docs', href: 'https://hol.org/registry/docs' },
            { label: 'Skill.md', href: 'https://hol.org/registry/skill.md' },
            { type: 'html', className: 'navbar-dropdown-header', value: 'Skills' },
            { label: 'Browse Skills', href: 'https://hol.org/registry/skills' },
            { label: 'Publish Skill', href: 'https://hol.org/registry/skills/submit' },
            { label: 'About', href: 'https://hol.org/registry/skills/about' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          position: 'left',
          items: [
            { type: 'html', className: 'navbar-dropdown-header', value: 'Points' },
            { label: 'HOL Points', to: 'https://hol.org/points' },
            { label: 'Leaderboard', to: 'https://hol.org/points/leaderboard' },
            { label: 'Analytics', to: 'https://hol.org/points/hcs20-analytics' },
            { type: 'html', className: 'navbar-dropdown-header', value: 'Events' },
            { label: 'Patchwork (Ended)', to: 'https://hol.org/patchwork' },
            { label: 'OpenConvAI Hackathon (Ended)', to: 'https://hol.org/hedera-ai-agents-hackathon' },
            { label: 'Hedera x AI Demo Day (Ended)', to: 'https://hol.org/hederaai' },
            { label: 'Hackathons (Ended)', to: 'https://hol.org/hackathon' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            { type: 'html', className: 'navbar-dropdown-header', value: 'Standards' },
            { label: 'Overview', to: '/standards' },
            { label: 'Standards Library', to: '/docs/standards/' },
            { label: 'Trustless Skills Registry', to: '/standards/trustless-skills-registry' },
            { label: 'Universal Identity', to: '/standards/universal-agent-id' },
            { label: 'Auditable Points', to: '/standards/auditable-points' },
            { label: 'Agent Adapter Registry', to: '/standards/agent-adapter-registry' },
            { label: 'Files & Hashinals', to: '/standards/hashinals' },
            { label: 'Data Registries', to: '/standards/registries' },
            { label: 'Identity Metadata', to: '/standards/profiles' },
            { label: 'Agent Communication', to: '/standards/openconvai' },
            { label: 'AppNet Accounts', to: '/standards/floras' },
            { type: 'html', className: 'navbar-dropdown-header', value: 'Tools' },
            { label: 'Hashnet MCP Server', href: 'https://hol.org/mcp' },
            { label: 'Standards SDK', to: '/docs/libraries/standards-sdk' },
            { label: 'Conversational Agent', to: '/docs/libraries/conversational-agent' },
            { type: 'html', className: 'navbar-dropdown-header', value: 'Resources' },
            { label: 'Tutorials', to: '/tutorials' },
          ],
        },
        {
          type: 'dropdown',
          label: 'About',
          position: 'left',
          items: [
            { label: 'Overview', href: 'https://hol.org/overview' },
            { label: 'Careers', href: 'https://hol.org/careers' },
            { label: 'Members', href: 'https://hol.org/members' },
            { label: 'Blog', to: '/blog' },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'API Reference', href: 'https://hol.org/registry/docs' },
            {
              label: 'Run in Postman',
              href: 'https://app.getpostman.com/run-collection/51598040-f1ef77fd-ae05-4edb-8663-efa52b0d1e99?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D51598040-f1ef77fd-ae05-4edb-8663-efa52b0d1e99%26entityType%3Dcollection%26workspaceId%3Dfb06c3a9-4aab-4418-8435-cf73197beb57',
            },
            {
              label: 'OpenAPI Spec',
              href: 'https://hol.org/registry/api/v1/openapi.json',
            },
            {
              label: 'Standards',
              href: 'https://hol.org/docs/standards/hcs-1',
            },
            { label: 'Submit ERC-8004 Contract', href: 'https://hol.org/registry/submit-erc8004' },
            { label: 'Feature Your Agent', href: 'https://hol.org/registry/feature-your-agent' },
          ],
        },
        {
          title: 'Best Agents',
          items: [
            { label: 'Best ERC-8004 Agents', href: 'https://hol.org/registry/best-ai-agents/erc-8004-agents' },
            { label: 'Best Virtuals Agents', href: 'https://hol.org/registry/best-ai-agents/virtuals-agents' },
            { label: 'Best MCP Servers', href: 'https://hol.org/registry/best-ai-agents/mcp-servers' },
            { label: 'Best A2A Agents', href: 'https://hol.org/registry/best-ai-agents/a2a-agents' },
            { label: 'Best x402 Payable', href: 'https://hol.org/registry/best-ai-agents/x402-payable-agents' },
            { label: 'All Categories', href: 'https://hol.org/registry/best-ai-agents' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/hashinals',
            },
            {
              label: 'X',
              href: 'https://x.com/HashgraphOnline',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', href: 'https://hol.org/blog' },
            {
              label: 'GitHub',
              href: 'https://github.com/hashgraph-online',
            },
            { label: 'Privacy Policy', href: 'https://hol.org/points/legal/privacy' },
            { label: 'Terms of Service', href: 'https://hol.org/points/legal/terms' },
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
