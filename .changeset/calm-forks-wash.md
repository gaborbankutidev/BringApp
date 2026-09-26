---
"@bring/blocks-wp": patch
---

Security: form submissions are now sanitized recursively (array field values were stored raw) and the Form Submissions admin screens escape all output, closing a stored XSS in wp-admin reachable from the public /bring/form/submit endpoint
