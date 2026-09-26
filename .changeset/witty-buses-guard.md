---
"next-app": patch
---

Security (DP-2019): the embed block only renders https URLs in a sandboxed iframe (`sandbox` + `referrerPolicy="no-referrer"`), and CMS-sourced URLs (menu items, social links, post URLs, image block links) pass through a new `safeHref` helper before reaching `href`, so `javascript:` values from the editor can no longer execute on the public site.
