---
"@bring/blocks-client": patch
---

Security: visitor-controlled slugs are now percent-encoded before being interpolated into WordPress request URLs. `getEntity` and `getRankMathHead` drop `.`/`..`/empty segments and encode the rest (new exported `encodeSlug` helper), closing a path-traversal primitive that let anonymous visitors point the server-side entity fetch at arbitrary endpoints on the WP origin (and, via the unvalidated `redirectTo` trust chain, turn it into an open redirect). The RankMath `getHead` `url=` query value is now fully encoded as well.
