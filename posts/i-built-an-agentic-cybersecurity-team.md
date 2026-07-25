---
title: 'I Built an Agentic Cybersecurity Team Because I Got Tired of Waiting for One'
description: 'A side-project agentic cybersecurity team that reviews real security evidence, produces auditable findings, and hands the important work to humans — augmentation, not replacement.'
pubDate: 2026-06-09
tags: ['socfu', 'agentic-ai', 'security']
draft: false
---

I work in information security at a financial institution. I'm an engineer. I build things. What I'm not is a smooth talker, a deck writer, or someone who finds energy in quarterly risk meetings or office politics.

So when I started thinking about what an AI-augmented security program could look like, I didn't write a strategy doc. I built something.

This is the story of SOCFU, a side project agentic cybersecurity team I've been building on my own time. It's rough, it's MVP, and it's already finding real things.

## The Problem I Was Actually Solving

Executive demands often sound like Daft Punk on repeat — "Harder, Better, Faster, Stronger" — while security teams are running on fumes just trying to keep alerts from piling up.

Most security teams are already underwater. They're triaging alerts, managing tickets, chasing compliance deadlines, and trying to keep up with a threat landscape that moves faster than their headcount and tooling allows.

The promise of AI in security is usually framed as automation, replacing the analyst. That framing in my opinion is wrong, and it will lead to bad outcomes.

What I wanted was different: a team of AI specialists that surfaces findings, produces prioritized recommendations, and hands important work to humans who can act on it. Augmentation, not replacement. The human team stays in the loop. The agents do the analytical heavy lifting.

Think of it less like autonomous AI and more like having access to a small elite consulting team who never sleeps, never gets bored reviewing firewall rules, and produces structured output every time.

## The Pattern I'm Most Proud Of

I needed agents that could see everything about my network without having any access to it.

The answer was obvious once I thought about it like a consultant engagement: you don't give a consultant admin access to your firewall. You give them an export.

I automated support pack downloads from my UniFi Dream Machine. The agents get full visibility into network topology, VLAN configuration, firewall rules, traffic patterns, everything they need for meaningful analysis. Zero write access. Zero blast radius if something goes sideways.

This generalizes really well:

- Firewall config exports
- Cloud security posture snapshots
- Vulnerability scanner reports
- SIEM logs
- Azure/AD/Entra ID exports

The agents don't need live access to do 90% of the work, particularly in environments where every access decision is scrutinized for justification.

## The Architecture (Simple on Purpose)

SOCFU starts with four agents:

- **Manager** — coordinates the team, synthesizes findings, owns the ticket queue
- **Red Team** — offensive mindset, finds exposure and attack surface
- **Blue Team** — defensive mindset, detection gaps, policy weaknesses
- **Research & Intel** — threat context, CVE relevance, adversary TTPs

Four roles because that covers the core perspectives without over-engineering the first version. If it works, the team structure can scale by specialization. Offense alone could spawn sub-agents for network, identity, and web/API attack surface running in parallel. Throughput through specialization.

## One Model, Different Personas

A question I had early: do I need different models, or fine-tuned models for each role?

No. Same model, different system prompts. The persona isn't making the model smarter, it's narrowing the frame. A red team system prompt stops the model from hedging toward defensive thinking when you want it reasoning like an attacker. The knowledge is already there. The prompt shapes what it pays attention to.

Fine-tuning is a real option eventually, but the right time for that is when you've hit a specific, demonstrable wall with prompting. I'm not there yet.

## The Collaboration Log

Agents need a shared space. I solved this with the simplest thing that could work: an append-only structured text file.

Every agent writes tagged entries:

```
[RED_TEAM | 2026-06-06 14:32 | task:scan-perimeter]
Finding: Exposed RDP on 3 external IPs
Confidence: High
Flagged to: MANAGER
```

This does two things at once. It's a collaboration space — the manager reads it to understand state and re-task specialists. And it's an audit trail — humans can review exactly what each agent found, said, and recommended without any special tooling. Two problems, one mechanism.

## The Ticket System

The manager agent's main output is a prioritized ticket queue. Findings from the collab log get synthesized into structured tickets:

- What was found
- Why it matters (business impact framing, not just technical detail)
- Recommended action
- What success looks like

Priority is driven by severity, exploitability, and whether current controls would even detect it if it fired. The ticket is designed so a human team can act on it without having to go back and ask the agents follow-up questions.

Tickets are immutable. If a finding changes, the old ticket closes and a new one opens with a reference back. That's how mature security programs handle findings anyway — it keeps the audit trail clean.

## The First Trial Run: My Home Lab

Before pointing this at anything that matters, I'm running SOCFU against my own home network. UniFi Dream Machine, cameras, edge router, proper VLAN segmentation, IDS, and zone-based firewalling.

Right now the agents are picking apart my VLAN policies and firewall rules against real infrastructure, producing findings I can immediately verify. One early result surfaced activity consistent with TheMoon, a router worm/Trojan, associated with an old Windows 10 PC.

Next step is introducing synthetic bad stuff — misconfigured rules I plant intentionally, PCAP replays of real malware traffic on isolated VLANs, Atomic Red Team simulations. "I planted a known-bad config and here's what the agents found" is a more compelling proof of concept than any clean demo.

## What's Coming

A few things on the roadmap:

**CISO agent** — an executive translation layer. Feed it the manager's prioritized tickets, get back board-ready risk summaries with business impact framing and the "we reduced risk by X%" narrative at the right level of abstraction. I don't speak executive fluently. The agent does. Good division of labor.

**Executive dashboard** — findings opened and closed, severity heat maps, aggregate risk score trending over time. The goal is a number a VP can point at that is also defensible and auditable. Harder than it sounds, but a weighted finding score (critical=10, high=7, medium=4, low=1) gets you most of the way there.

**Connector Library** — prebuilt connectors for common infrastructure.

**Parallel sub-agents** — once the core loop works, spinning up concurrent specialists under each team for throughput. Network exposure, identity risks, and web/API attack surface running in parallel and syncing to the collab log.

## Why I Built This

Partly because it's a genuinely useful thing to build. Security teams need this kind of augmentation and most organizations aren't going to buy a product that does it well anytime soon.

Partly because I'm an engineer who builds things instead of writing decks about things I might build someday.

And partly as a proof of concept that one person, working on their own time, can put together a coherent agentic security capability with a clear architecture, a defensible data access pattern, and generate real findings — without a strategy document, a steering committee, or a roadmap presentation.

I didn't build SOCFU to replace analysts. I built it to prove that a small, bounded agentic team can review real security evidence, produce auditable findings, and hand human analysts better information to work from. The trick is not giving agents the power to do whatever they want. The trick is classic leadership with a modern twist: understanding what each resource is good at and assigning the work accordingly.

SOCFU is a work in progress. More posts to follow as the trial run produces findings and the architecture evolves.
