const staticCacheName = 'site-static-v6';
const assets = [
    '/', 
    '/index.html',
    '/js/index.js',
    '/js/scripts.js',
    '/css/styles.css',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700',
    'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
    'https://use.fontawesome.com/releases/v5.13.0/js/all.js',
    '/assets/img/portfolio/applying.png',
    '/assets/img/portfolio/backofthehand.jpg',
    '/assets/img/portfolio/baseofthumb.jpg',
    '/assets/img/portfolio/centreofpalm.jpg',
    '/assets/img/portfolio/fingers.jpg',
    '/assets/img/portfolio/shiatsutherapy.png',
    '/assets/img/portfolio/stretchingfingers.jpg',       
    '/assets/img/portfolio/shiatsu.pdf',
    '/assets/img/portfolio/action.png',
    '/assets/img/portfolio/shiatsu.mp4',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js',
    
];

// Install service worker
self.addEventListener("install", evt => {
    // console.log('Service worker has been installed.');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    
});

// Activate event
self.addEventListener('activate', evt => {
    // console.log('Service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
               .filter(key => key !== staticCacheName)
               .map(key => caches.delete(key)) 
                )
        })
    );
});

// Fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(
            cacheRes => {
                return cacheRes || fetch(evt.request);
            }
        )
    );
}); 