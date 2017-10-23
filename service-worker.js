'use strict';

var dataCacheName = 'Overlay-data';
var cacheName = 'Overlay-cachedata';
var filesToCache = [
	'/',
	'/index.html',
	'/login.html',
	'/main.html',
	'/bosonic/dist/bosonic-runtime.js',
	'/bosonic/dist/bosonic-runtime.min.js',
	'/bosonic/lib/CustomEvent.js',
	'/bosonic/lib/document-register-element',
	'/bosonic/lib/DOMTokenList.js',
	'/bosonic/lib/importNode.js',
	'/bosonic/lib/pep-0.4.1-pre.js',
	'/bosonic/src/mixins/a11y.js',
	'/bosonic/src/mixins/custom_attributes.js',
	'/bosonic/src/mixins/dom.js',
	'/bosonic/src/mixins/events.js',
	'/bosonic/src/mixins/gestures.js',
	'/bosonic/src/mixins/selection.js',
	'/bosonic/src/platform/bootstrap.js',
	'/bosonic/src/platform/ShadowDOM.js',
	'/bosonic/src/runtime/base.js',
	'/bosonic/src/runtime/bootstrap.js',
    '/bosonic/src/runtime/register.js',
	'/css/app.css',
	'/css/b-tree.css',
	'/css/graph-creator.css',
	'/css/jquery-ui.css',
	'/css/OLDucomponents.css',
	'/css/style.css',
	'/css/ucomponents.css',
	'/css/themes/bootstrap.css',
	'/css/themes/pace_center_radar.css',
	'/css/themes/pace_loading_bar.css',
	'/css/themes/site.css',
	'/dependencies/animate.css',
	'/dependencies/animate.css/animate.css',
	'/dependencies/bootstrap/dist/css/bootstrap.css',
	'/dependencies/bootstrap/dist/js/bootstrap.js',
	'/dependencies/fontawesome/css/font-awesome.css',
	'/dependencies/iCheck/icheck.js',
	'/dependencies/jquery/dist/jquery.js',
	'/dependencies/jquery-ui/jquery-ui.js',
	'/dependencies/metisMenu/dist/metisMenu.css',
	'/dependencies/metisMenu/dist/metisMenu.js',
	'/dependencies/slimScroll/jquery.slimscroll.js',
	'/fonts/pe-icon-7-stroke/css/helper.css',
	'/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
	'/Icon/128.png',
	'/Icon/144.png',
	'/Icon/256.png',
	'/Icon/48.png',
	'/Icon/512.png',
	'/Icon/64.png',
	'/Icon/96.png',
	'/images/powered-ulysses.png',
	'/images/icons/bowtie-icon.png',
	'/images/icons/clusterview-icon.png',
	'/images/icons/clusterview2-icon.png',
	'/images/icons/download-icon.png',
	'/images/icons/edit-icon.png',
	'/images/icons/highlight-icon.png',
	'/images/icons/modelview-icon.png',
	'/images/icons/modelview2-icon.png',
	'/images/icons/newmodel-icon.png',
	'/images/icons/nodeview-icon.png',
	'/images/icons/search-icon.png',
	'/images/icons/trash-icon.png',
	'/images/icons/upload-icon.png',
	'/mapview_js/d3.legend.js',
	'/mapview_js/d3.v3.js',
	'/mapview_js/FileSaver.min.js',
	'/mapview_js/graphcreator.js',
	'/mapview_js/jquery-3.1.0.js',
	'/mapview_js/lasso.js',
	'/mapview_js/lasso.min.js',
	'/mapview_js/mapviewclass.js',
	'/mapview_js/queue.v1.js',
	'/ribbon/css/docs.css',
	'/ribbon/css/metro-colors.css',
	'/ribbon/css/metro-icons.css',
	'/ribbon/css/metro-responsive.css',
	'/ribbon/css/metro-rtl.css',
	'/ribbon/css/metro-schemes.css',
	'/ribbon/css/metro.css',
	'/ribbon/images/Calendar-Next.png',
	'/ribbon/images/Folder-Rename.png',
	'/ribbon/images/Notebook-Save.png',
	'/ribbon/js/docs.js',
	'/ribbon/js/ga.js',
	'/ribbon/js/jquery-2.1.3.min.js',
	'/ribbon/js/metro - Copy.js',
	'/ribbon/js/metro.js',
	'/scripts/BroadcastEventArg.js',
	'/scripts/BroadcastEventData.js',
	'/scripts/EUMainDashboardCISController.js',
	'/scripts/EUMainDashBoardToolbarRegion.js',
	'/scripts/EUNodeActionCISController.js',
	'/scripts/EUNodeActionRegion.js',
	'/scripts/EUNodeAlertsRegion.js',
	'/scripts/EUNodeInformationRegion.js',
	'/scripts/EUNodesMapViewRegion.js',
	'/scripts/EUNodesTreeViewRegion.js',
	'/scripts/EUNodeTimelineRegion.js',
	'/scripts/GetNodePredictivePatternInformationArg.js',
	'/scripts/GetSessionStateInformationArg.js',
	'/scripts/HomeCISController.js',
	'/scripts/HomeCISRegionSingle.js',
	'/scripts/jquery-3.1.0.js',
	'/scripts/launcher.js',
	'/scripts/layout.js',
	'/scripts/app.js',
	'/scripts/main.js',
	'/scripts/mapvieweventhandler.js',
	'/scripts/OLDEUNodeAlertsRegion.js',
	'/scripts/OLDEUNodeInformationRegion.js',
	'/scripts/OLDEUNodeTimelineRegion.js',
	'/scripts/OLDlayout.js',
	'/scripts/PredictivePatternInfoAvailableArg.js',
	'/scripts/require.js',
	'/scripts/SessionStateInfoAvailableArg.js',
	'/scripts/startlauncher.js',
	'/scripts/lib/b-accordion.html',
	'/scripts/lib/b-collapsible.html',
	'/scripts/lib/b-dialog.html',
	'/scripts/lib/b-selectable.html',
	'/scripts/lib/b-tabs.html',
	'/scripts/lib/b-tree.html',
	'/scripts/lib/bosonic-runtime.js',
	'/scripts/lib/bosonic-runtimeOLD.js',
	'/scripts/lib/hello-world.html',
	'/scripts/lib/u-components.html',
	'/scripts/lib/u-mapview.html',
	'/scripts/lib/u-ribbon.html',
	'/scripts/lib/webcomponents.js',
	'/scripts/utility/pace.js',
	'/webcis/cis.csv',
	'/webcis/BinaryMappings.csv',
	'/webcis/EUMainDashboardCISController.xml'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'http://10.20.0.65:8081';
  if (e.request.url.indexOf(dataUrl) > -1) {

    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
	e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
