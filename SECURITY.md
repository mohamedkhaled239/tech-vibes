# Security

This is a **client-only static SPA** — there is no application server, no
database, and no authenticated session. That removes whole classes of risk
(SQL injection, server-side auth bugs, SSRF). The remaining surface is the
browser bundle, the one outbound API call (EmailJS), and the hosting layer.

## Secrets

- **No secret keys in the bundle.** The only third-party credentials are the
  EmailJS **publishable** client keys, which are designed to live in the
  browser. They are read from `VITE_*` env vars (see [ENVIRONMENT.md](./ENVIRONMENT.md)),
  not hardcoded, and `.env` is gitignored.
- If you rotate the EmailJS keys, update the env vars and rebuild.

## Input handling & XSS

- All user input (contact form) is bound through React state and rendered as
  text — React escapes it by default. There is **no** `dangerouslySetInnerHTML`
  anywhere in the codebase.
- The form submits only to EmailJS over HTTPS; no input is reflected back into
  the DOM as markup.
- The form fails closed if email config is missing (error banner, no throw).

## Open redirects & external links

- Routing is client-side via React Router with a fixed route table — there are
  no user-controlled redirect targets.
- All external links (`socials`, live-site CTAs) use
  `target="_blank" rel="noopener noreferrer"`, preventing reverse-tabnabbing.

## Security headers (configured)

Set at the edge by `nginx.conf`, `vercel.json`, and `netlify.toml`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

## Content Security Policy

A CSP is shipped in `nginx.conf`. It allows the app's own scripts, Google Fonts
(styles + font files), images over HTTPS/data URIs, and restricts XHR to the
EmailJS API:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://api.emailjs.com;
frame-ancestors 'self'; base-uri 'self'; form-action 'self'
```

Notes:
- `style-src` needs `'unsafe-inline'` because the design relies on inline
  `style={{…}}` props (accent theming) and Tailwind's injected styles.
- `img-src https:` is broad because portfolio/case-study imagery may load from
  remote CDNs; tighten to specific hosts if you self-host all images.
- To apply the same CSP on Vercel/Netlify, add it to their `headers` blocks
  (kept out by default there since inline-style hashing differs per platform).

## Dependencies

- Run `npm audit` before releases; keep Vite, React, and Framer Motion current.
- CI installs with `npm ci` against the committed lockfile for reproducibility.

## Reporting

Found an issue? Email **Support@tech-vibes.org** with details and steps to
reproduce. Please do not open a public issue for security matters.
