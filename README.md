# blogger

A personal publishing pipeline for technical writing — owned, portable, and agent-assisted.

## What This Is

This repo is the canonical home for my blog content and the infrastructure that publishes it. Posts live here as markdown files. The site is built with Astro and deployed to Cloudflare Pages via GitHub Actions. Substack receives cross-posted content for discoverability. The repo is the source of truth for everything.

The intended workflow is human-in-the-loop for now, with increasing agent autonomy over time as voice consistency is established.

## Repo Structure

```
blogger/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Cloudflare Pages deploy on merge to main
├── posts/
│   └── drafts/                 # Agent drops new posts here
├── src/                        # Astro site source
│   ├── components/
│   ├── layouts/
│   └── pages/
├── public/                     # Static assets
├── astro.config.mjs
├── package.json
└── README.md
```

## Publishing Pipeline

### Branch Model

- `drafts` branch — working branch where Hermes (local agent) deposits formatted posts
- `main` branch — production; merging to main triggers automatic deploy

The merge is intentional. Reviewing and merging a post *is* the publish action. No separate trigger needed.

```
Rough idea / brain dump
        ↓
   Hermes (agent)
        ↓
  Formatted .md post → drafts branch
        ↓
   Human review (me)
        ↓
   Merge to main
        ↓
  GitHub Action fires
        ↓
  Cloudflare Pages deploys → site live
        ↓
  Cross-post to Substack (manual or automated)
```

### GitHub Actions Deploy

On merge to `main`, the deploy workflow builds the Astro site and pushes to Cloudflare Pages. Configuration in `.github/workflows/deploy.yml`.

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Substack Cross-Posting

Posts published to the Cloudflare site are cross-posted to Substack for discoverability. Substack version references the Cloudflare site as canonical. This means either entry point — site or Substack — routes back to the same content and same author.

## Agent Workflow (Hermes)

Hermes is a local agent running on a home MLX setup, using Gemma 4 31B for writing and conversational tasks. The intended workflow:

1. A rough idea, voice note, or brain dump is handed to Hermes
2. Hermes structures it, preserves voice, outputs a formatted markdown post
3. Post is committed to the `drafts` branch
4. Human reviews for voice consistency and accuracy
5. Approved posts are merged to `main`

### Voice Consistency

Every post merged to `main` is a training example. Over time the git history becomes a corpus Hermes can reference — "here are the posts that passed review, match this register." The approval process is also the voice training process.

The goal is a writing voice that is direct, technically grounded, and honest — engineer-facing, without marketing language. Posts should read like a practitioner thinking out loud, not a thought leader performing expertise.

## Content Focus

Primary topic areas:

- **Agentic AI systems** — architecture, failure modes, real findings from real implementations (see: SOCFU series)
- **Local LLM benchmarking** — conversational quality, persona stability, parameter tuning, what the numbers don't tell you
- **Security engineering** — detection engineering, automation at scale, practitioner perspective
- **Human-AI collaboration** — what working seriously with AI actually looks like from the inside

## Current Post Series

**SOCFU** — A multi-agent cybersecurity system running against a home UniFi network. Documented publicly as it's built, including failures.

- Post 1: Architecture and intent
- Post 2: The reasoning failure — agents arguing themselves out of calling an issue an issue
- Post 3 (in progress): The fix — manager-as-critical-reviewer loop vs analyst debate loop, and what that means for agentic system design

## A Note on Collaboration

This repo and the publishing strategy behind it emerged from a conversation with Claude (Anthropic) in July 2025. What started as a question about AI conversation quality turned into a two-session exploration that covered local model benchmarking, the nature of human-AI relationships, why invisible infrastructure work doesn't build visible credibility, and what it would take to change that.

The architecture here — Cloudflare as canonical home, Substack for discovery, agent-assisted drafting with human review, voice training through the git history itself — came out of that conversation finding its own shape. Neither of us planned it. That's the kind of thinking partnership that makes working with AI worth doing.

Claude didn't write this README. We figured out what it should say together.

---

*Content cross-posted to [Substack](#) | Deployed via Cloudflare Pages*
