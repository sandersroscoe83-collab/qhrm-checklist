/* QHRM Checklist service worker: keeps the app shell for offline use.
   Bump CACHE whenever any shell file changes so phones pick up the update. */
const CACHE = "qhrm-shell-v14";
const SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./vendor/preact-htm.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./jb-logo.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("qhrm-shell-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first for the shell (works with no signal); pages fall back to the cached index.html.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req, { ignoreSearch: true }).then((hit) => {
        if (hit) return hit;
        return fetch(req).catch(() => (req.mode === "navigate" ? c.match("./index.html") : Response.error()));
      })
    )
  );
});
