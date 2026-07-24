---
title: 'Standing up the blog: repo as source of truth'
description: 'Why this site is markdown in a git repo, built with Astro, and deployed to Cloudflare Pages — and how posts actually get published.'
pubDate: 2026-07-23
tags: ['meta', 'agentic-ai']
draft: false
---

This is the first post, and it's about the thing you're reading it on.

The whole site is markdown files in a git repository. No CMS, no database, no
lock-in. Posts live in `/posts` as plain `.md` files, the site is built with
[Astro](https://astro.build), and it deploys to Cloudflare Pages on every merge
to `main`. The repo is the source of truth for everything.

## How publishing works

There's no separate "publish" button. Reviewing and merging a post *is* the
publish action:

1. A rough idea or brain dump goes to a local drafting agent.
2. The agent structures it, preserves voice, and drops a formatted `.md` file
   in the `drafts` branch.
3. I review for voice and accuracy.
4. Merging to `main` fires a GitHub Action that builds the site and pushes it to
   Cloudflare Pages.

Anything in `/posts/drafts/` is intentionally excluded from the build, so a
work-in-progress never ships even if it lands on `main` early.

## What this is for

Three things, mostly:

- **Agentic systems and the SOC I'm building** — architecture, failure modes,
  and the unglamorous parts.
- **Local LLM tuning** — parameters, DFlash configs, KV-cache quantization, and
  which models actually earn their place for a given task.
- **AI personas, memory, and continuity** — what it takes for an agent to stay
  itself across sessions.

The register I'm aiming for: a practitioner thinking out loud, not a thought
leader performing expertise. If a post reads like marketing, it failed review.

```python
# The kind of thing that'll show up here — real configs, not hand-waving.
kv_cache = {"bits": 4, "group_size": 64}
```

More soon.
