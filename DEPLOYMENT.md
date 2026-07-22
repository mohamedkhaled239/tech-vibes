# Deployment

This is a static Vite SPA — the build output in `dist/` is plain HTML/CSS/JS
that any static host can serve. The one universal requirement is a **history
fallback**: every unknown path must serve `index.html` so client-side routing
works (deep links like `/portfolio/vertex` must not 404). Each config below
already handles this.

Before deploying anywhere, set the [environment variables](./ENVIRONMENT.md) on
the platform. Vite inlines `VITE_*` vars **at build time**, so they must be
present when `npm run build` runs — not at runtime.

---

## 1. Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset auto-detects **Vite** (or it's set in `vercel.json`).
3. Add the env vars (Project → Settings → Environment Variables).
4. Deploy. `vercel.json` handles SPA rewrites, asset caching, and security headers.

CLI alternative:
```bash
npm i -g vercel
vercel --prod
```

## 2. Netlify

1. New site from Git at [app.netlify.com](https://app.netlify.com).
2. Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
3. Add the env vars (Site settings → Environment variables).
4. Deploy. `netlify.toml` handles the SPA redirect, caching, and headers.

CLI alternative:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 3. Docker

A multi-stage `Dockerfile` builds the site and serves it with nginx (config in
`nginx.conf` — SPA fallback, gzip, immutable asset caching, security headers).

```bash
# Build (pass build-time env)
docker build \
  --build-arg VITE_EMAILJS_SERVICE_ID=xxx \
  --build-arg VITE_EMAILJS_TEMPLATE_ID=xxx \
  --build-arg VITE_EMAILJS_PUBLIC_KEY=xxx \
  --build-arg VITE_SITE_URL=https://tech-vibes.org \
  -t techvibes-web .

docker run -p 8080:80 techvibes-web
# → http://localhost:8080
```

Or with Compose (reads `VITE_*` from your shell / a `.env` file):
```bash
docker compose up --build -d      # → http://localhost:8080
```

## 4. VPS (Nginx)

On a plain server (Ubuntu/Debian):

```bash
# On your machine (or CI): build with env vars set, then copy dist/ up
npm ci && npm run build
scp -r dist/* user@server:/var/www/techvibes/

# On the server
sudo cp nginx.conf /etc/nginx/sites-available/techvibes
sudo ln -s /etc/nginx/sites-available/techvibes /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Edit the copied config to set your real `server_name` and `root`
(`/var/www/techvibes`). Add TLS with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tech-vibes.org -d www.tech-vibes.org
```

---

## Post-deploy checklist

- [ ] `https://your-domain/` loads and the hero code panel types out.
- [ ] Deep links work: open `https://your-domain/portfolio/vertex` directly (no 404).
- [ ] Language switcher toggles AR ⇄ EN and persists on reload.
- [ ] Contact form submits (EmailJS keys set → success banner).
- [ ] `robots.txt` and `sitemap.xml` are reachable.
- [ ] Update the domain in `sitemap.xml`, `robots.txt`, and `index.html`
      (canonical / OG URLs) if it isn't `tech-vibes.org`.
- [ ] Add a real `public/og-image.png` (1200×630) for social sharing.
