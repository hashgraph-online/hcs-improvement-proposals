import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hashgraph Online',
  tagline: 'Building the future of the internet, on-graph.',
  favicon: 'img/favicon.png',

  markdown: {
    mermaid: true,
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
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap',
      },
    },
  ],

  // Set the production url of your site here
  url: 'https://hashgraphonline.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'HashgraphOnline', // Usually your GitHub org/user name.
  projectName: 'hashgraph-online', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenAnchors: 'ignore',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
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
    blog: {
      sidebar: {
        groupByYear: true,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    navbar: {
      title: 'Hashgraph Online',
      logo: {
        alt: 'Hashgraph Online Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/docs/standards/', label: 'Standards', position: 'left' },
        { to: '/openconvai', label: 'OpenConvAI', position: 'left' },
        {
          type: 'dropdown',
          label: 'Hackathons',
          position: 'left',
          items: [
            { to: '/hackathon', label: 'AI Track - Africa Hackathon' },
            { to: '/hackathon#requirements', label: '→ Submission Requirements' },
            { to: '/hackathon#tools', label: '→ Developer Tools' },
            { to: '/hackathon#examples', label: '→ Code Examples' },
            { to: '/hackathon#judges', label: '→ Judges' },
            { to: '/hackathon#faq', label: '→ FAQ' },
            { to: '/hackathon#register', label: '→ Register' },
            { type: 'html', value: '<hr style="margin: 8px 0;">' },
            { to: '/hedera-ai-agents-hackathon', label: 'OpenConvAI Hackathon (Ended)' },
            { to: '/hederaai', label: 'Hedera x AI Demo Day' },
          ],
        },
        { to: '/use-cases', label: 'Use Cases', position: 'left' },
        { to: '/members', label: 'Members', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Standards',
              to: '/docs/standards/hcs-1',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Newsletter',
              to: '/newsletter',
            },
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
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hashgraph-online',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Terms of Service',
              to: '/terms-of-service',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hashgraph Online DAO LLC.`,
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
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
    scripts: [
      {
        src: 'https://stats.tier.bot/script.js',
        async: true,
        'data-website-id': '09a60445-7371-492c-9d75-c17be79fa569',
      },
    ],
  } satisfies Preset.ThemeConfig,

  plugins: [
    '@docusaurus/plugin-ideal-image',
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
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/openconvai',
            from: '/convai',
          },
          {
            from: '/hedera-ai',
            to: '/hederaai',
          },
        ],
      },
    ],
  ],
};

export default config;
