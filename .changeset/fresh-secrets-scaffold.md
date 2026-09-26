---
"@bring/create-app": patch
---

The scaffolder now generates `.env` files from each `.env.example` (root, next-app, plugins/bring-app) and replaces the `JWT_SECRET_KEY` placeholder with a freshly generated `crypto.randomBytes(32)` base64 secret, so new projects never run on the template's `very-big-secret` default.
