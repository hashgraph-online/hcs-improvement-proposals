module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0];
                var j=d.createElement(s);
                var dl=l!=='dataLayer' ? '&l='+l : '';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window, document, 'script', 'dataLayer', 'GTM-P83WH82S');
            `,
          },
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://www.googletagmanager.com/gtag/js?id=AW-17512816237',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17512816237');
              
              window.gtag_report_conversion = function(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-17512816237/LaqRCOLUzp4bEO284Z5B',
                  'event_callback': callback
                });
                return false;
              }
            `,
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
        ],
        preBodyTags: [
          {
            tagName: 'noscript',
            innerHTML:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P83WH82S" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          },
        ],
      };
    },
  };
};
