module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://stats.tier.bot/script.js',
              'data-website-id': '09a60445-7371-492c-9d75-c17be79fa569',
            },
          },
          // Google Ads tag (gtag.js)
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://www.googletagmanager.com/gtag/js?id=AW-10841395521',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17512816237');
            `,
          },
        ],
      };
    },
  };
};
