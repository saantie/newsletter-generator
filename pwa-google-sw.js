const CACHE_NAME = 'newsletter-v2';
const ASSETS = [
  './', './index.html', './manifest.json',
  'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js',
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebaseapp.com') || e.request.url.includes('googleapis.com') || e.request.url.includes('gstatic.com')) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => { if (res.ok && e.request.method === 'GET') { const clone = res.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, clone)); } return res; }).catch(() => cached)));
});
