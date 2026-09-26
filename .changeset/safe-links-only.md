---
"@bring/blocks-client": patch
"next-app": patch
---

Security: new `sanitizeUrl` helper in `@bring/blocks-client` (exported from the package root and `./utils`) — allows relative URLs plus http/https/mailto/tel and returns a fallback (`#`) for any other scheme (`javascript:`, `data:`, ...), with browser-style control-character stripping before scheme detection. The template now renders editor-controlled URL attributes through it (button block, image link, basic sample, footer menu), closing a stored `javascript:` XSS path from block URL attributes to public-site hrefs. Consuming apps should do the same for their own href sinks.
