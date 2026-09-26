---
"@bring/blocks-wp": patch
---

Security: `/bring/editor/save` now requires `edit_post` capability for the specific post being saved, not just the general `edit_posts` capability
