# rezanobakht.dev

New post: add `src/pages/en/<slug>.md` or `src/pages/fa/<slug>.md`:

```md
---
layout: ../../layouts/Post.astro
title: My post
date: 2026-11-23
lang: en   # or fa
description: One line
---
Body...
```

Cloudflare Pages: build `npm run build`, output `dist`.
