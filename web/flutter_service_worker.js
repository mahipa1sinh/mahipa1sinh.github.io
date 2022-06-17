'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "04be716d5183e959361d669f24039d3e",
"assets/assets/icons/github_2x.png": "6401c06a4431eb5619083e6a1783ed63",
"assets/assets/icons/linkedin_2x.png": "05c47a776fed9b4cd955e073f6528255",
"assets/assets/icons/mob_dev.png": "0b269d07676728567ecc4515b45ee02a",
"assets/assets/icons/pen.png": "858e481ed2f6569c100ad50159f99f86",
"assets/assets/icons/twitter_2x.png": "d5011590d94aab0f6e051754d553459d",
"assets/assets/icons/web.png": "344fd3cde2e70569da2f0df1ef555759",
"assets/assets/images/blog.png": "d2248342582e3e5a0ce0e26b4a4aed3a",
"assets/assets/images/calender.png": "7f1f8986016a9382d8922af6283722d3",
"assets/assets/images/chat.png": "5f0bb2ecc91102627491ead9afa2efdf",
"assets/assets/images/crypto.png": "18095b8133dbe48b6910ce992df44565",
"assets/assets/images/myImage.jpg": "2fb0ccbdc243760baa4230c77491dff0",
"assets/assets/images/news.png": "ba5d13e470404021307b1ed3fb81c4c7",
"assets/assets/logos/bash.png": "1e78ac2b1ce83842d47de985c9be4775",
"assets/assets/logos/c++.png": "a15ba0c670a57fd09076b7cfde43615e",
"assets/assets/logos/c.png": "07d3ae46119591201ff78163df6935e6",
"assets/assets/logos/django.png": "f246d8d1828f46beedddbeb80b8cb177",
"assets/assets/logos/docker.png": "cde17fc546aea7d41499ab92467ad816",
"assets/assets/logos/firebase.png": "6020b885df2be86f537ea893f5ab5dfa",
"assets/assets/logos/flutter.png": "646231c7b3e14f0959ac43175dfcf994",
"assets/assets/logos/git.png": "c42b7c1740b63a7b3e39336c5ed80fcb",
"assets/assets/logos/github.png": "7303fcf0bbe2ecccc0877ff2e6ce7a28",
"assets/assets/logos/golang.png": "547b5edc8cdfaab9386a58c391630ae4",
"assets/assets/logos/javascript.png": "c7140ae897077ae303aa769001cd0619",
"assets/assets/logos/kotlin.png": "dc9cac39b59efefc086138586ffff958",
"assets/assets/logos/kubernetes.png": "8edcc206f34a924f5efb6270316e8bfd",
"assets/assets/logos/mongodb.png": "2d2b10838ac9b36f3c81949000a7649d",
"assets/assets/logos/nodejs.png": "350ea377dddd525f530aa988675b82a5",
"assets/assets/logos/npm.png": "a3c0d5fb5e4b4ca78f6e522279e7f430",
"assets/assets/logos/postgresql.png": "ae153cdcc837019ab460ab844301d138",
"assets/assets/logos/python.png": "875d547546c810dc4b75ded02191c70e",
"assets/assets/logos/typescript.png": "c2d31236b540638e8c2ed4c79141e880",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "b399b4fa4f111bf03c9f7569142af790",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"favicon.png": "ac9a721a12bbc803b44f645561ecb1e1",
"favicon.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"favicon.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "cb6a6de8d40caa12ca3ec7506c9b1121",
"/": "cb6a6de8d40caa12ca3ec7506c9b1121",
"main.dart.js": "a1589b2fba6969143d597deccf0cfbf3",
"manifest.json": "81ee0565c38deb86b27b71bded2ead3e",
"version.json": "8ccea043932c8f38819ea93941dfcae1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
