# ─── Stage 1: build the static site ──────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Install deps against the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# Build. VITE_* build args are inlined into the bundle at build time.
COPY . .
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_SITE_URL
RUN npm run build

# ─── Stage 2: serve with nginx ───────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA-aware config (history fallback, gzip, asset caching, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
