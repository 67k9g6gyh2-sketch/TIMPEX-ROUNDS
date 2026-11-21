// Optional: lets TIMPEX Rounds Update open with no signal.
// Upload this file next to index.html on GitHub Pages. Patient data never passes through here;
// it only caches the app's own files, and tells the open app when a newer copy has been downloaded.
const CACHE = 'timpex-rounds-v5';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => c.addAll(['./', './index.html']))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const tell = () => self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage({ type: 'timpex-update' })));
// Serve from the cache at once, then fetch a fresh copy for next time (stale-while-revalidate).
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const page = req.mode === 'navigate';
  const work = caches.open(CACHE).then(async c => {
    const key = page ? './index.html' : req;
    const hit = await c.match(key, { ignoreSearch: true }), old = hit && page ? hit.clone() : null; // the page reads hit's body
    // A navigation request can't take options, so the page is fetched by its address, skipping the HTTP cache.
    const net = (page ? fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(req)).then(async r => {
      if (!r.ok || r.type === 'opaque') return r;
      if (old) {
        const [a, b] = await Promise.all([old.text(), r.clone().text()]);
        await c.put(key, r.clone());
        if (a !== b) { await tell(); await new Promise(res => setTimeout(res, 4000)); await tell(); }
      } else await c.put(key, r.clone());
      return r;
    }).catch(() => hit);
    return { hit, net };
  });
  e.respondWith(work.then(({ hit, net }) => hit || net));
  e.waitUntil(work.then(({ net }) => net).catch(() => {}));
});
