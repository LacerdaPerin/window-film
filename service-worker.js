const CACHE_NAME = 'app-cache-v25'; // Nome do cache, altere a cada nova versão

const urlsToCache = [
    '/peliqueiros-br/',
    '/peliqueiros-br/index.html',
    '/peliqueiros-br/icons/menor.png',
    '/peliqueiros-br/icons/maior.png',
    '/peliqueiros-br/manifest.json',
    // Adicione outros recursos necessários para o funcionamento offline aqui
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Arquivos em cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting(); // Força o Service Worker a ser ativado imediatamente
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Força todas as abas a usar o novo Service Worker
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Serve o arquivo em cache, se disponível; caso contrário, faz uma requisição
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
