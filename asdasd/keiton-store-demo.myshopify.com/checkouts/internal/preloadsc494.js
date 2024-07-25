
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.e6ddb56e26c8d0bbb2ab.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/1224.latest.en.1b1447e6d628fd3d11c0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/1246.latest.en.977bd42927e5b51b14db.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.1ac91e249867b33d5d31.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2593.latest.en.99c5b4a1a240cfa40106.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8831.latest.en.45075a453be683a7996f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/434.latest.en.a09bafb3c1cc77f5d729.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5832.latest.en.2d9e9313aa8eb8aefad8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/1667.latest.en.b1e5f4e7ca87662297b0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4619.latest.en.53831cc837e6dd25931e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.4a4be7ef704fa37cf691.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/1224.latest.en.c87ef29d0239b372980b.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.8ae030d5b62ddbf3a670.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.3e483127dbf554cf988e.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  