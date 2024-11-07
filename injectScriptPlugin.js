module.exports = function(context, options) {
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
        ],
      };
    },
  };
}; 