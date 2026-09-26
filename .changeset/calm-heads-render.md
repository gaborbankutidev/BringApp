---
"@bring/blocks-client": patch
---

Security: `RankMathHead` no longer renders the remote RankMath head blob verbatim. Output is now allowlist-sanitized while parsing — only `meta` (minus `http-equiv`), `title` and `link` tags render (with `on*` attributes stripped), and `script[type="application/ld+json"]` is re-serialized through `JSON.parse`/`JSON.stringify` (with `<` escaped) so it can only ever contain JSON. Arbitrary `<script>`/`<iframe>`/event-handler markup coming from the WP origin is dropped instead of executing in every visitor's browser.
