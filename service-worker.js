/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e205b0e4cb04b67e305be4b8b1a73701"
  },
  {
    "url": "assets/css/0.styles.1e7700b1.css",
    "revision": "32dd343ff0b54dc23f378214041bf407"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8b09a056.js",
    "revision": "75ebff8b57cd57327c5be3e0f8dd3412"
  },
  {
    "url": "assets/js/11.d08ae994.js",
    "revision": "0459a21896c15a418b327146c22e0170"
  },
  {
    "url": "assets/js/12.d1671177.js",
    "revision": "76e13b693f604a2b986c8dab8e593205"
  },
  {
    "url": "assets/js/13.a6d64203.js",
    "revision": "2ecd16937e28f417f2fa2b61dbf4ad71"
  },
  {
    "url": "assets/js/14.73212872.js",
    "revision": "d7cf9bcaa6a06b094e5e326416b32dfe"
  },
  {
    "url": "assets/js/15.a7bcba7c.js",
    "revision": "5f45a138f6f972e4cbb19a836b1f29bd"
  },
  {
    "url": "assets/js/16.92e994da.js",
    "revision": "67ddd2c2e4c3e2cfd5a64e16ab0d51b3"
  },
  {
    "url": "assets/js/17.988a19b3.js",
    "revision": "b4ba8b8724dc68b4635832a2ec3d95f4"
  },
  {
    "url": "assets/js/18.80503c04.js",
    "revision": "36ba6a87666cba3127dd3e619ca305f9"
  },
  {
    "url": "assets/js/19.4b75980e.js",
    "revision": "372ccd5e4af13087c31c0a0244a578f8"
  },
  {
    "url": "assets/js/2.32ec2776.js",
    "revision": "caa591645c333d2c802ff0d041a421b9"
  },
  {
    "url": "assets/js/20.1cd74db6.js",
    "revision": "89bad76c7bbbc520ceba11b258433873"
  },
  {
    "url": "assets/js/21.a9a38733.js",
    "revision": "d111d2ccc6ef162388a011b418eee37e"
  },
  {
    "url": "assets/js/22.9e55f3dc.js",
    "revision": "ea3ce405151eac3127aaccc2aeac5489"
  },
  {
    "url": "assets/js/23.bdaeb703.js",
    "revision": "95b643e0965b37c4b6fd7154337d69d2"
  },
  {
    "url": "assets/js/24.0c8b2bc8.js",
    "revision": "6aeb4a19cb5b83e97b1bf63e3bf2d9a6"
  },
  {
    "url": "assets/js/25.014bc46e.js",
    "revision": "b01241e566b7502422c35b49e44279f6"
  },
  {
    "url": "assets/js/26.8508cb4d.js",
    "revision": "0592e33f0f3982833420cf9efb0c48d6"
  },
  {
    "url": "assets/js/27.4a0e3be0.js",
    "revision": "a628545258f8c5a279849dc940860f0f"
  },
  {
    "url": "assets/js/28.11a74af4.js",
    "revision": "28506969615d2e462d29df6863359ac4"
  },
  {
    "url": "assets/js/29.9e3cf725.js",
    "revision": "edaa334ccbdde36505121371de9559d3"
  },
  {
    "url": "assets/js/3.d9d09990.js",
    "revision": "5c80a4606e274b76c7ae5b4415b26a6d"
  },
  {
    "url": "assets/js/30.2eef4619.js",
    "revision": "b8574eb1dd1ede0003b657b543c57d9c"
  },
  {
    "url": "assets/js/31.b6639dab.js",
    "revision": "b10fff3a4f41f41108795ce9a5545dff"
  },
  {
    "url": "assets/js/32.f67e1bd1.js",
    "revision": "409ca2ce19e4ffed4fc77a16178d7d0a"
  },
  {
    "url": "assets/js/33.eb4db779.js",
    "revision": "1a3334cd75183f92a9ee2daa14c3c3dc"
  },
  {
    "url": "assets/js/4.0e7cc7a7.js",
    "revision": "906d33f1ed090e7556d0fddc0ab9a1f9"
  },
  {
    "url": "assets/js/5.9673c4c9.js",
    "revision": "e0d8525160df10b1164966ab118a565c"
  },
  {
    "url": "assets/js/6.cba7a4d4.js",
    "revision": "db11e93653bf53cc32a4d00ab61e8548"
  },
  {
    "url": "assets/js/7.dbfd5fa7.js",
    "revision": "6d86f882af0b00b562abe64b9512741f"
  },
  {
    "url": "assets/js/8.3a8c7722.js",
    "revision": "058a40ae2e61aaea179d1a56e4cec1d4"
  },
  {
    "url": "assets/js/9.0e7a77ef.js",
    "revision": "26849b91f661dbc89381b524492c682b"
  },
  {
    "url": "assets/js/app.e75c0cb1.js",
    "revision": "91ec4cd1535a647ce65f680e2b84d68e"
  },
  {
    "url": "book/chapter-01/prepare.html",
    "revision": "fe07b17eeddeb8b1ab10c65f22dd8397"
  },
  {
    "url": "book/chapter-01/structure.html",
    "revision": "5a317257108e64f86a76c7913c251b29"
  },
  {
    "url": "book/chapter-01/yakusoku.html",
    "revision": "7cd432aef4067ae180d9f2605b030642"
  },
  {
    "url": "book/chapter-02/00-load-stage.html",
    "revision": "e759ac6451c7c30e97ac13feac19260b"
  },
  {
    "url": "book/chapter-02/01-module-and-container.html",
    "revision": "bdc552bb3d2d603e87756af163a3474d"
  },
  {
    "url": "book/chapter-02/02-forestry-modules.html",
    "revision": "25f2ddcae5df862156cb4c7d902b41e9"
  },
  {
    "url": "book/chapter-02/03-blank-template.html",
    "revision": "218eb56375a294919bc7377167dd3787"
  },
  {
    "url": "book/chapter-02/04-module-helpers.html",
    "revision": "a4f871c6df720c351c2c7daf2b2fded0"
  },
  {
    "url": "book/chapter-02/05-module-manager.html",
    "revision": "b0d058695a9166aed0e2f471163c5a75"
  },
  {
    "url": "book/index.html",
    "revision": "ad1ad9d4f2b2158dfc084f8687afee55"
  },
  {
    "url": "book/preface/kyandy.html",
    "revision": "6cdff7f259fe0f84d0d670ab0d5cf528"
  },
  {
    "url": "book/preface/video.html",
    "revision": "dc7d917bf0e411aed2f001c67095f7ad"
  },
  {
    "url": "index.html",
    "revision": "7b99ae2c1067bac6a4c08e2936ff9f91"
  },
  {
    "url": "source/api/core/ForestryAPI.html",
    "revision": "f29a114ec7c620ffd6a5eb10725242f9"
  },
  {
    "url": "source/api/modules/ForestryModule.html",
    "revision": "ea5b3168b5c0785994bd7f5f07b44c87"
  },
  {
    "url": "source/api/modules/IForestryModule.html",
    "revision": "a30447cf18cc83936b0339b269a75114"
  },
  {
    "url": "source/api/modules/IModuleContainer.html",
    "revision": "e7304d9f387c582589b3852f1200e1ca"
  },
  {
    "url": "source/api/modules/IModuleManager.html",
    "revision": "742264080970f4b595cb8fdc3e589465"
  },
  {
    "url": "source/Forestry.html",
    "revision": "37aa63a3550f7021faa7076982073acd"
  },
  {
    "url": "source/index.html",
    "revision": "1ab61857b651fc6b860dd4da87244dfe"
  },
  {
    "url": "source/modules/BlankForestryModule.html",
    "revision": "c4c49f097a3a402d606fa1f721e08f60"
  },
  {
    "url": "source/modules/ForestryModules.html",
    "revision": "3a45ef543b88deb4bc52ce3ef3f05829"
  },
  {
    "url": "source/modules/ForestryModuleUids.html",
    "revision": "f10612465bba6bd2f0602acbb4474187"
  },
  {
    "url": "source/modules/ForestryPluginUtil.html",
    "revision": "6a29f5b2c572e170dddbf3c0f86404ac"
  },
  {
    "url": "source/plugins/CompatPlugin.html",
    "revision": "ceda9a06009e5645cd8886b141e780a9"
  },
  {
    "url": "source/plugins/ForestryCompatPlugins.html",
    "revision": "ab4bb0d0843876b57bb2842a1811ad2f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
