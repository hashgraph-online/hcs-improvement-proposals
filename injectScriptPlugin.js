module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          // Google Tag Manager
          {
            tagName: 'script',
            innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-578HRX7P');`,
          },
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://stats.tier.bot/script.js',
              'data-website-id': '09a60445-7371-492c-9d75-c17be79fa569',
              'data-domains': 'hashgraphonline.com',
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
        postBodyTags: [
          // Google Tag Manager (noscript)
          {
            tagName: 'noscript',
            innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-578HRX7P"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          },
        ],
      };
    },
  };
};
