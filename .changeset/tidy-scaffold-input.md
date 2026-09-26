---
"@bring/create-app": patch
---

Scaffolder input hardening: the project-folder prompt now re-asks until the kebab-cased slug is non-empty (an all-symbol answer used to collapse the scaffold into the current directory), and the project name is stripped of `*/`, `<?` and newlines before being written into the generated plugin's PHP header comment.
