---
"@bring/blocks-wp": patch
"@bring/blocks-editor": patch
---

Security: the public dynamic routes now only expose publicly viewable content — `/bring/dynamic/props` rejects drafts/private/pending posts and non-viewable taxonomies, `/bring/dynamic/list` rejects internal post types (form submissions, redirects, layouts) and caps the list size (filterable via `bring_dynamic_list_max_limit`, default 500). `/bring/editor/options` now requires the editor JWT like `/bring/editor/save`; the editor hook sends it. Also fixes `offset` being read from the `limit` param.
