---
"next-app": patch
---

Replace the pasted docs-demo middleware matcher with a single real one, add baseline security headers (nosniff, Referrer-Policy, frame-ancestors 'self' + WP origin, HSTS), read the Sentry org/project from SENTRY_ORG/SENTRY_PROJECT env, and drop the duplicate WP status fetch + per-request console noise.
