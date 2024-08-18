self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/teste-pwa/',
        '/teste-pwa/index.html',
        '/teste-pwa/icons/menor.png',
        '/teste-pwa/icons/maior.png',
        // Adicione outros recursos necessários para o funcionamento offline aqui
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
