/* the screens of the app, kept on the phone: they open at once, also on a weak network. Only this site's own files – never a request to the server */
const V="1.4.9-e6b0603537", C='mf-'+V, F=["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const nav=r.mode==='navigate';
  e.respondWith(caches.open(C).then(c=>c.match(nav?'index.html':r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok&&!nav)c.put(r,res.clone());return res}))))});
