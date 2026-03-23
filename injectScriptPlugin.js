module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
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
              function scheduleGTM() {
                if (document.readyState === 'complete') {
                  window.setTimeout(loadGTM, 3500);
                  return;
                }
                window.addEventListener('load', function onLoad() {
                  window.removeEventListener('load', onLoad);
                  window.setTimeout(loadGTM, 3500);
                }, { once: true });
              }
              if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(scheduleGTM, { timeout: 4000 });
              } else {
                scheduleGTM();
              }
            `,
          },
          {
            tagName: 'script',
            innerHTML: `
              function loadAnalytics() {
                if (window.analyticsLoaded) return;
                window.analyticsLoaded = true;
                var s = document.createElement('script');
                s.defer = true;
                s.src = 'https://stats.tier.bot/script.js';
                s.setAttribute('data-website-id', '09a60445-7371-492c-9d75-c17be79fa569');
                s.setAttribute('data-domains', 'hol.org');
                document.head.appendChild(s);
              }
              function scheduleAnalytics() {
                if (document.readyState === 'complete') {
                  window.setTimeout(loadAnalytics, 2500);
                  return;
                }
                window.addEventListener('load', function onLoad() {
                  window.removeEventListener('load', onLoad);
                  window.setTimeout(loadAnalytics, 2500);
                }, { once: true });
              }
              if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(scheduleAnalytics, { timeout: 3500 });
              } else {
                scheduleAnalytics();
              }
            `,
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
