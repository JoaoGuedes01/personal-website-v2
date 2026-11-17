# Security headers

Status: not started.

## Why

Cloudflare Pages reads a `public/_headers` file and applies it to every response. It is static, free,
and gives the site a sound baseline: it blocks framing, limits what scripts can load, and stops
referrer leaks. It also removes the easy findings in any online scanner, which matters on the site
of someone who works in security.

## Approach

Add `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/pagefind/*
  Cache-Control: public, max-age=3600
```

Then a Content Security Policy, which needs care:

- The site uses a few inline scripts (theme restore before paint, the picker, JSON-LD). A strict
  policy needs either hashes for them or moving them into files. Hashing is fragile because Astro
  can change the inline output, so prefer moving them into bundled scripts where that is possible,
  and allow `'unsafe-inline'` for scripts only as a stopgap.
- Start with `Content-Security-Policy-Report-Only` so nothing breaks, check the browser console on
  every page type, then enforce.
- Search loads `pagefind.js` with a dynamic import from the same origin, which `script-src 'self'`
  allows. Analytics, if added, needs its host added.

## Cost

Zero.

## Risks

A wrong CSP breaks the theme picker, search or syntax highlighting silently. Test on a preview
deployment of a pull request, not on the live site.

## Checklist

- [ ] Add the simple headers and verify with `curl -I` on the preview URL.
- [ ] Add a report-only CSP and click through every page type.
- [ ] Move or hash the inline scripts, then enforce.
- [ ] Run the site through an online header scanner.
