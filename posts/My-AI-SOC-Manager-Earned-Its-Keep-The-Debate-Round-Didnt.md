---
title: 'My AI SOC Manager Earned Its Keep. The Debate Round Didn’t'
description: 'A side-project agentic cybersecurity team that reviews real security evidence, produces auditable findings, and hands the important work to humans — augmentation, not replacement.'
pubDate: 2026-08-07
tags: ['socfu', 'agentic-ai', 'security']
draft: false
---

A few weeks ago, I wrote about a failure inside SOCFU, the agentic cybersecurity team I’m building on my own time. An analyst noticed a real threat, rationalized it away, and the manager accepted the conclusion without challenging the reasoning.

So I made the manager more of a leader.

I added a SOC Lead review step that challenges weak claims and sends vague remediation back. I also added an analyst debate round where the specialists see one another’s work and revise before the final report is assembled.

Then I tried to answer a simple question: was any of it worth the extra compute?  
---

### **The First Test**

I started with three versions of the team:

* Baseline — analysts produce findings with no manager review  
* Manager Review — the SOC Lead reviews the analysts before synthesis  
* Manager Review \+ Debate — analysts debate first, then the SOC Lead reviews them

I ran each version three times against the same synthetic branch-office scenario and scored how many planted issues reached the final report.

The debate round looked useless. It took three times as long and caught no more than the baseline.

Easy call: cut it.

I ran the test again and the ranking flipped. The version that “won” the first time lost the second. Detection scores swung from 70% to 100% inside the same configuration.

Three runs could not tell the teams apart.

Then I realized I was asking the wrong question—or at least not all of the right ones.  
---

### **I Was Measuring the Wrong Thing**

Someone on the analyst team identified every planted issue in every configuration. Team detection was already 100%.

A single analyst pass could find the problems. Detection was not where the manager added value. The manager’s job was not necessarily to find more. It was to make the final remediation safer and more useful.

* Did the report include a rollback plan?  
* Did it explain how to validate the fix?  
* Did it admit what was still unverified?  
* Was the severity justified?  
* Could an engineer act on it without another round of questions?

None of that was in my scorer so I enhanced it.

I added a deterministic Python rubric around actionability, safe-change framing, rollback, validation, uncertainty, severity justification, and grounding. I had already learned not to let the model grade its own math.  
---

### **The Second Test Told a Clearer Story**

I ran the three configurations again, eight times each, using the new quality metric.  
Average across eight runs:

* Baseline quality: 76.8  
* Manager Review quality: 82.9  
* Manager Review \+ Debate quality: 83.8

Review plus debate finished slightly above review alone, but used roughly 2.7 times as many input tokens, took twice as long, and produced a much wider range of scores—from 61 to 95\.

Manager review improved average quality from 76.8 to 82.9 while requiring about 1.6 times the tokens and one additional model call.

The value is in the manager’s review, not the analyst debate.  
---

### **What the Review Actually Changed**

The improvement was not abstract. It showed up in the reports.

**Rollback discipline**

Without review, only one of eight reports included a rollback plan. With manager review, five of eight did.

The manager reliably put a safety net into the deliverable.

**Safer changes**

For an exposed NVR, the baseline recommendation was blunt: “Block immediately.”

After review, the recommendation included a fallback path: a dedicated jump host or vendor-approved secure tunnel, restricted to the Staff VLAN with explicit access controls.

Both reports recognized the exposure. Only one gave an engineer a way to fix it without casually taking down a business function.

**Catching a dismissed threat**

An analyst waved off router-probe traffic as something that “could be legitimate admin testing.”

The manager challenged that conclusion and recognized it as a known signature associated with automated router-exploitation toolkits.

That one matters most to me because it is the failure mode that started this work: an analyst notices something real and then talks itself out of it.

The review is where that gets caught.  
---

### **What About the Debate?**

Debate was not useless.

In one run, the research analyst added a CVE it had initially missed and changed a blunt “disable RDP” recommendation into a scoped management-VLAN fix after seeing another analyst’s work.

That is real value.

But the manager review produced the same class of correction on its own, at a fraction of the cost. Many debate rounds were simply agents re-arguing positions they already held.  
---

### 

### **What Ships**

Manager review stays on by default.  
Debate becomes an opt-in escalation for difficult or ambiguous cases. I would still like to solve this more efficiently through better prompting or perhaps a self-evaluation loop.  
---

### **The Caveats**

This experiment used one synthetic scenario and one local model.

The quality rubric measures good-practice structure: rollback, staging, validation, uncertainty, severity justification, and grounding. It can show that a report is more engineer-ready. It cannot prove every recommendation is technically correct.

Detection was also saturated. A harder scenario may create room for debate to contribute in ways this test could not expose.

And eight runs is still a small sample. The cost difference is structural and easy to measure. The quality difference is a much less precise measurement.  
---

### **Why I’m Sharing This**

I did not build the measurement harness to make my agents look good.

I built it so that whenever I add something clever, that clever thing has to survive a number.

This time the number told me the expensive feature I liked cost almost three times as much, and I could not prove it helped.  
That is not the experiment failing.

That is the experiment doing its entire job.  
---

### **What's Coming**

**The Front End \-** I'd like to share some visuals next time.  A GUI, some examples of findings and recommendations.

---

*SOCFU is a work in progress. More posts will follow as the trial runs produce findings and the architecture evolves.*  
