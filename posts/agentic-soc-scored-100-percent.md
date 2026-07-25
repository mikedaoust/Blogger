---
title: "My Agentic SOC Scored 100% on My First Test. That's Exactly Why I Didn't Trust It."
description: 'A perfect score on the first planted-threat test hid the most valuable finding: an AI analyst that spots a real threat, then rationalizes it away — and a manager that signs off without questioning it.'
pubDate: 2026-06-25
tags: ['socfu', 'agentic-ai', 'security']
draft: false
---

A few weeks ago I wrote [Part 1 about SOCFU](/posts/i-built-an-agentic-cybersecurity-team), the agentic cybersecurity team I'm building on my own time. The next step was to stop running it against clean data and start planting issues on purpose.

So I did that. Here's what happened, including the part that didn't go the way I expected.

## The Setup

The idea is simple: take a network with problems deliberately planted in it so I can repeatedly hand it to the agent team blind, and score what they find.

The first scenario is a fictional branch office. I planted six problems across a range of severities:

- A guest VLAN with unrestricted access into other zones
- The firewall's management interface exposed to the internet
- Cleartext telnet on a NAS
- A system beaconing every five minutes
- A database reachable from any source

I also planted one benign decoy, a chatty smart thermostat. If the team flagged it as malware, that's a false positive. Will SOCFU cry wolf?

## The First Result Looked Perfect

100% detection. Zero false positives.

A perfect score on the first try? I don't think so… So instead of screenshotting the score card I had scripted and celebrating, I read the actual agent output.

The team did flag the beacon. The research analyst even noted the traffic resembled C2 or sync traffic. And then, in the same breath, talked itself out of it because it was a known IP.

The analyst hadn't caught the threat. They'd noticed it and rationalized it away.

## The Fixes: Both Were Mine, Not SOCFU's

First, I'd been labeling the tests as synthetic. The agents possibly read that and relaxed? I removed every tell and told them to treat everything as live production infrastructure.

Second, I had to fix my scorecard to recognize the analyst dismissal. If an agent pairs a planted threat with words like "benign" or "not malicious," it gets downgraded from caught to partial. Noticing isn't catching.

Then I re-ran it. The honest number? Not 100%. Five were caught clean, one noticed-but-dismissed, zero false positives. The thermostat decoy was correctly called a segmentation hygiene issue, not malware.

## The Actual Lesson

The most valuable thing found was a reasoning failure mode: an AI analyst can spot something real and then rationalize it away, and the manager agent confidently signed off based on the analyst's conclusion without questioning the reasoning. The analyst almost had the right answer, and I can't help wondering what would have happened if the manager had challenged the analyst.

## Why I'm Sharing the Miss

I'm still building this on my own time. It's still rough. And I'm still finding things, including problems in my own agents. I didn't expect to immediately have a perfect AI security team. I built it to have a measurable one where I can plant a problem, see what gets caught, and turn the misses into fixes.

The half-miss still feels like a win to me… for now.

## What's Coming

**Manager** — let's make the manager a little more of a leader. The manager should be able to push the agents to think harder instead of just accepting their conclusion without considering the analyst's initial uncertainty.

**Connector Library** — In the first post I mentioned prebuilt connectors for common infrastructure. I've since taken that further. When SOCFU identifies a data source it doesn't have a connector for yet, the goal is for it to build one without being asked, then use that connector twice: once for initial analysis, and again to validate that a remediation actually worked. Secure credential storage is the prerequisite that needs solving first.

SOCFU is a work in progress. More posts to follow as the trial run produces findings and the architecture evolves.
