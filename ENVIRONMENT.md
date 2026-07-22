# Environment variables

Only variables prefixed `VITE_` are exposed to the client bundle (this is a
Vite rule). Everything here is **build-time** — Vite inlines the values into the
JS when `npm run build` runs. To change a value you must rebuild.

Copy `.env.example` → `.env` for local development. `.env` is gitignored;
`.env.example` is committed as the documented template.

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `VITE_EMAILJS_SERVICE_ID` | Yes* | `service_xxxxxxx` | EmailJS service used by the contact form. |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes* | `template_xxxxxxx` | EmailJS email template. |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes* | `xxxxxxxxxxxxxxx` | EmailJS publishable key. |
| `VITE_SITE_URL` | No | `https://tech-vibes.org` | Canonical origin, no trailing slash. |

\* If any EmailJS var is missing, the contact form fails gracefully into its
error banner instead of throwing — the rest of the site works normally.

## Where to get the EmailJS values

[dashboard.emailjs.com](https://dashboard.emailjs.com) → **Email Services**
(service ID), **Email Templates** (template ID), **Account → API Keys**
(public key). These are *publishable* client keys by design; there is no secret
key in the browser. Keeping them in env still lets each environment use its own
service and keeps them out of the repo.

## Setting them per platform

- **Local**: `.env` file (see `.env.example`).
- **Vercel**: Project → Settings → Environment Variables.
- **Netlify**: Site settings → Environment variables.
- **Docker**: `--build-arg` (see `Dockerfile`) or Compose `args`.
- **CI (GitHub Actions)**: repository **Secrets** → referenced in `.github/workflows/ci.yml`.
