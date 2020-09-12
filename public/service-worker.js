const staticCacheName = 'site-static-v1';
const assetsUrls = [
    '/',
    '/index.html',
    '/404.html',
    '/css/main.css',
    '/fonts/icomoon/style.css',
    '/img/icons/unknown.png',
    '/img/logos/logo.png',

    "/img/icons/animated/01d.svg",
    "/img/icons/animated/01n.svg",
    "/img/icons/animated/02d.svg",
    "/img/icons/animated/02n.svg",
    "/img/icons/animated/03n.svg",
    "/img/icons/animated/200.svg",
    "/img/icons/animated/201.svg",
    "/img/icons/animated/202.svg",
    "/img/icons/animated/210.svg",
    "/img/icons/animated/211.svg",
    "/img/icons/animated/212.svg",
    "/img/icons/animated/221.svg",
    "/img/icons/animated/230.svg",
    "/img/icons/animated/231.svg",
    "/img/icons/animated/232.svg",
    "/img/icons/animated/300.svg",
    "/img/icons/animated/301.svg",
    "/img/icons/animated/302.svg",
    "/img/icons/animated/310.svg",
    "/img/icons/animated/311.svg",
    "/img/icons/animated/312.svg",
    "/img/icons/animated/313.svg",
    "/img/icons/animated/314.svg",
    "/img/icons/animated/321.svg",
    "/img/icons/animated/500.svg",
    "/img/icons/animated/501.svg",
    "/img/icons/animated/502.svg",
    "/img/icons/animated/503.svg",
    "/img/icons/animated/504.svg",
    "/img/icons/animated/511.svg",
    "/img/icons/animated/520.svg",
    "/img/icons/animated/521.svg",
    "/img/icons/animated/522.svg",
    "/img/icons/animated/531.svg",
    "/img/icons/animated/600.svg",
    "/img/icons/animated/601.svg",
    "/img/icons/animated/602.svg",
    "/img/icons/animated/611.svg",
    "/img/icons/animated/612.svg",
    "/img/icons/animated/615.svg",
    "/img/icons/animated/616.svg",
    "/img/icons/animated/620.svg",
    "/img/icons/animated/621.svg",
    "/img/icons/animated/622.svg",
    "/img/icons/animated/701.svg",
    "/img/icons/animated/711.svg",
    "/img/icons/animated/721.svg",
    "/img/icons/animated/731.svg",
    "/img/icons/animated/741.svg",
    "/img/icons/animated/751.svg",
    "/img/icons/animated/761.svg",
    "/img/icons/animated/762.svg",
    "/img/icons/animated/771.svg",
    "/img/icons/animated/781.svg",
    "/img/icons/animated/801.svg",
    "/img/icons/animated/802.svg",
    "/img/icons/animated/803.svg",
    "/img/icons/animated/804.svg",
    "/img/icons/animated/weather.svg"
    

];
// install service worker
self.addEventListener('install', evt => {
    // console.log('Service Worker has been Installed'); 
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(assetsUrls);
        })
    );
});


// activate service worker ->> Activate Event
self.addEventListener('activate', evt => {
    console.log('Service Worker has been Activated');
    evt.waitUntil(
        caches.keys().then((keys) => { //this return an array of promises: which are all the caches name
            return Promise.all(keys
                .filter(key => key !== staticCacheName) // this filter out the caches which are not the current caches
                .map(key => caches.delete(key)) //then this delete those old caches that has been filtered out
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    // console.log('Fetch .....', evt);
    evt.respondWith(
        caches.match(evt.request).then((cacheResponds)=> {
            return cacheResponds || fetch(evt.request);
            }
        ).catch(() => caches.match('/404.html'))
    )
});