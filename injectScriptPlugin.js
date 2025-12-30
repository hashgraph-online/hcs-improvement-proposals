module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              // Defer GTM loading until after page is interactive to improve INP
              function loadGTM() {
                if (window.gtmLoaded) return;
                window.gtmLoaded = true;
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
              }
              // Load GTM after first user interaction or after 5 seconds
              if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(function() { setTimeout(loadGTM, 3000); });
              } else {
                setTimeout(loadGTM, 5000);
              }
              ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(function(e) {
                document.addEventListener(e, loadGTM, { once: true, passive: true });
              });
            `,
          },
          {
            tagName: 'script',
            attributes: {
              defer: true,
              src: 'https://stats.tier.bot/script.js',
              'data-website-id': '09a60445-7371-492c-9d75-c17be79fa569',
              'data-domains': 'hol.org',
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
