/* Curriculum — Sections 7 & 8 */
window.CCAO = window.CCAO || {};
window.CCAO.curriculum = window.CCAO.curriculum || { sections: [] };
var S = window.CCAO.curriculum.sections;

S.push({
  id: "s7", num: 7, minutes: 31, domain: "D6",
  tr: "Yönetişim, Risk ve Sorumlu Kullanım",
  en: "Governance, Risk and Responsible Use",
  blurb: "Domain 6, 15%, about nine items — and the section that decides whether Meridian ever gets its tools back. Mostly judgement, barely any knowledge: the cheapest marks on the exam.",
  quiz: "q7",
  lessons: [
    { id: "l7-1", ref: "7.1", mm: "6:47", dom: "D6",
      tr: "Bir Kullanım Senaryosunu Taramak",
      en: "Screening a Use Case",
      objective: "Identify appropriate and inappropriate use cases.",
      body: `
Screening is not vetoing. A good screen produces three outcomes — go, go-with-controls, no — plus the reason, in a sentence, that a partner could repeat to a client. The single distinction that decides most exam items in this domain is a sharp one, so learn it first.

### [fact] The line: decision support versus decision making
| | Decision **support** | Decision **making** |
|---|---|---|
| What the AI produces | Options, evidence, summaries, a ranked view with reasons | The verdict itself: approve, reject, score, hire, price, dose, discipline |
| Who is accountable | A human, having seen the evidence | Nobody — and that is the disqualifying property |
| Typically | Fine, with the usual gates | Blocked or restricted, in a business context, and often by law |
| The exam's phrasing | "Apply Claude to analyse requirements and use cases" | "Identify appropriate and inappropriate use cases" |

The reason the line is where it is: a model can't be held to a standard, can't be cross-examined about its reasoning, and can't be corrected in advance. It can inform the person who can.

### [how] Screen in this order — five gates, and stop at the first red
| Gate | The question | Red flag |
|---|---|---|
| **1 · Legality** | Is there a law, regulation or contractual clause that specifically covers this? | Employment, credit, insurance, housing, medical or legal determinations; automated decisions with legal effect on individuals |
| **2 · Data** | What would need to be uploaded or connected, and is it permitted to move? | Protected personal data, client-confidential material crossing a boundary, secret IP into a tool it wasn't cleared for |
| **3 · Impact on people** | Who is affected, and can they contest it? | Decisions about individuals made without a human who can be asked for reasons |
| **4 · Reversibility & reach** | Once it's out, can it be recalled, and how far does it travel? | Public publication, client-facing claims, irreversible sends at volume |
| **5 · Disclosure** | Must anyone be told AI was involved? | A client, a regulator or an audience that would consider the omission material |

::tip "no" is a complete answer, and so is "not yet" | The exam rarely rewards killing a legitimate business need. For every red flag it is worth practising the *alternative*: "Claude can't screen the CVs; it can summarise each CV against the written criteria, and a human ranks." Same outcome for the business, accountability stays where it belongs.

### [fact] Three verdicts, with what each one buys
| Verdict | Meaning | What ships with it |
|---|---|---|
| **Go** | Ordinary business use, no gate needed beyond normal diligence | Nothing further — but say why, so the next person isn't guessing |
| **Go with controls** | Worth doing, risk manageable | Named controls from 4.4/4.5 — classification, gates, owner, review cadence — and a definition of who checks |
| **No / escalate** | Beyond what this tool or this role may do | The reason, the alternative that meets the underlying need, and the correct owner (Legal, or an Architect for an engineered solution) |

### [case] Meridian
Nazlı's request, screened in four lines: *CV screening for the Ankara hiring round.* **Gate 1** — red: an automated determination about individuals in a hiring process, with no meaningful right of explanation. **Gate 3** — red: the affected people can't contest a score nobody owns. **Verdict: No**, with the alternative — *Claude drafts structured interview questions from the written role spec and summarises each CV against the published criteria; two recruiters rank, and the shortlist meeting is minuted*. Nazlı gets the 14 hours back; Meridian keeps the decision where a person is accountable for it; and the firm gets a written precedent, which is what the freeze was always really about.

### [trap] Item shapes
- "Refuse the task entirely" where a controlled version exists — over-correction loses marks, remember the guide's own sample ("skip the analysis entirely" is a wrong answer)
- "Proceed because the analysis is internal" — internal use does not cure a legal or contractual problem
- "Ask Claude whether this is acceptable" — the model is not the governance authority
- Options that move the *accountability* rather than the risk: "have a manager approve the model's score" is still an automated decision wearing a signature if the approver can't inspect the reasoning

### [do] Take the last AI idea someone floated at work and run the five gates, in order, stopping at the first red. Then write the *alternative* sentence. If you couldn't write one, you probably hadn't understood what the requester actually needed.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Use case screening | kullanım senaryosu taraması | Legality, data, people-impact, reach, disclosure |
| Decision support vs making | karar desteği / karar verme | Where accountability sits — the line this domain turns on |
| Automated decision | otomatik karar | A determination about a person made without meaningful human review |
| Go with controls | kontrollü izin | Approved, conditional on named, checkable safeguards |
| Escalation path | yükseltme yolu | The correct owner for a matter you cannot decide |
` },

    { id: "l7-2", ref: "7.2", mm: "5:37", dom: "D6",
      tr: "Kontrol Noktasını Sınıflandırma Belirler",
      en: "Classification Determines the Checkpoint",
      objective: "Apply data-sensitivity, regulatory and privacy considerations.",
      body: `
Most AI governance fails because it is written as a rule about *tools* ("be careful with Claude") instead of a rule about *data*. Data classification is the mechanism that makes every downstream decision automatic: where it may go, what must be redacted, who reviews, what gets logged. **Classification first; the checkpoint follows from it.**

### [fact] A four-level scheme, and what each level actually changes
| Level | Examples at Meridian | Where it may go | Required controls |
|---|---|---|---|
| **Public** | Published report, marketing copy, a job ad | Any tool | Normal editorial review only |
| **Internal** | SOPs, meeting notes, internal analysis | Firm-approved tools, standard Project | Grounding + a light review (L0–L1) |
| **Confidential** | Client strategy, deal terms, pricing, M&A material | *Only* the isolated per-client Project for that client | Named sign-off (L2), no cross-client material, superseded files removed |
| **Restricted** | Personal data, account numbers, HR records, anything a contract or law names | Not into a third-party system unless the clause allows it; otherwise only after redaction/anonymisation | Redact or anonymise *before* upload, Legal or DPO approval where required, logged, L3 review |

::warn the exam's own sample question | A spreadsheet of customer names and account numbers, and a policy restricting regulated personal data. The correct action is **"remove or anonymise the personal identifiers before uploading, consistent with policy."** Its three distractors are: upload as-is because the analysis is internal (internal ≠ permitted); upload but instruct Claude not to retain it (an instruction is not a control); skip the analysis entirely (over-correction).

That third distractor deserves the attention it gets: writing "do not store this" into a prompt is asking a model to obey a policy it cannot implement. Controls live in **what you put in the window** and **what access you granted**, never in the instructions.

### [how] Deriving the checkpoint mechanically
~~~
1  Classify the data in the request            (highest level present wins)
2  Check the governing clause                  (contract, law, firm policy)
3  Can it be reduced?                          redact / anonymise / aggregate / narrower question
4  Read the row for that level                  -> permitted surface + gate + logging
5  Write the record: who decided, on what basis, when
~~~
"Can it be reduced?" is the step that rescues most blocked requests. Nazlı does not need names to see whether candidates meet the criteria; Elif does not need the account numbers to compute the trend. Aggregation and pseudonymisation are not the consolation prize — they usually clear the actual need.

### [how] What "auditable" means, precisely
A checkpoint is auditable when a third party, later, can answer four questions from a record alone: **what** was reviewed, **who** reviewed it, **when**, and **on what evidence**. A calendar invite named "review" answers none of them. This is why 4.1's one-line review record and this lesson's log are the same artefact — governance and quality control are one paper trail.

### [case] Meridian
The Kuzey Logistics engagement becomes the template: its clause bars personal data from third-party systems, so *Kuzey Projects are configured restricted-by-default*, the instruction block begins with the classification and the redaction requirement, and any dataset arrives with identifiers replaced by stable pseudonyms so per-customer trends are still computable. Two consequences the partners liked: the analysts stopped asking permission case-by-case, because the rule was decided once at the client level; and when Kuzey asked how their data was handled, Burak produced a log rather than a reassurance. That is the difference between governance as a document and governance as a record.

### [do] Write your four levels, with real examples from your own work. Then take one file you used recently and classify it. If classifying it changed what you'd have done with it, you have just found the control you were missing.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Data classification | veri sınıflandırması | The level that decides the controls, not the other way round |
| Redaction / anonymisation | karartma / anonimleştirme | Removing or replacing identifiers *before* upload |
| Pseudonymisation | takma ad verme | Stable replacement keys, so analysis still works |
| Retention | saklama | How long material persists, and where |
| Log / record | kayıt | The evidence that a control ran |
` },

    { id: "l7-3", ref: "7.3", mm: "6:12", dom: "D6",
      tr: "Bir Skill, Bir Yazılımdır",
      en: "A Skill Is Software",
      objective: "Follow organisational AI policies and governance standards; treat reusable capability as a controlled asset.",
      body: `
One of the most examinable scenarios on this exam is exactly one of the course's: *someone wants to enable a Skill.* It looks like a small, friendly, reversible act. The lesson exists to make you treat it as what it is: installing code with standing authority over other people's work.

### [why] The argument in one paragraph
A Skill is a reusable procedure — instructions, sometimes scripts — that Claude applies whenever it is relevant. Its outputs feed everyone's outputs. So a defect in a Skill is not an error, it is a **policy**: a wrong assumption, an outdated threshold, or a dropped verification step gets inherited by every engagement that touches it, silently, and with the confidence of an official process. That is the definition of a supply-chain problem, and it's why the governance vocabulary — owner, review, version, test, change control, retirement — is not bureaucratic decoration. It is the only mechanism that keeps a shared capability from becoming a shared defect.

### [fact] What you must be able to answer before you enable one
| Question | Answer that permits enablement | Answer that blocks it |
|---|---|---|
| **Who owns it?** | A named person who answers for its behaviour | "Mert wrote it, but he's left" |
| **What does it touch?** | Reads supplied documents, writes to a draft only | Reads a mailbox, sends anything, posts anywhere |
| **Where does its logic come from?** | Reviewed against current policy and process | Reconstructed from memory of how things used to work |
| **Has anyone tested it on a case the author didn't pick?** | Yes — and the odd case is kept as a golden test | It has only ever been run on its author's happy path |
| **Whom does it affect once on?** | Me | Everyone in the client Project, indefinitely |
| **Version and change process?** | v3, changelog, and changes re-reviewed | A file in a shared drive |
| **Could it be a route for data out, or instructions in?** | Reviewed for both | Unreviewed — and a Skill pulled from outside the firm has not been reviewed by anyone at all |

::warn the security half that candidates miss | Two attack shapes belong to any shared, executable capability: **prompt injection** — a document inside the workflow carrying text the Skill then treats as instructions — and **exfiltration** — a Skill with reach sending material somewhere it should not go. Any enablement request that cannot answer "what can it read, and where can it write?" is a request to grant unbounded access to a black box.

### [how] The proportionate process — not a bureaucracy
1. **Register it.** One line per Skill: name, owner, version, what it reads, what it writes, which Projects may use it
2. **Review at the right depth.** A formatting Skill needs a skim; a Skill that touches figures, client data, or any outbound action needs a reviewer who can say no, and who opens the source
3. **Test on the unchosen case.** One deliberately awkward example is worth a hundred happy paths
4. **Version it.** Changes re-reviewed; the changelog carries the *reason*, exactly as instructions do (6.4)
5. **Scope it.** Enabled in the Projects that need it — not enabled firm-wide because it was convenient for one associate
6. **Retire it.** When the process underneath changes, a Skill that still runs is worse than no Skill: it is a lie with a schedule

### [case] Meridian
The request that arrives in the exam-shaped form: *"Can we enable 'issues list extractor'? It saves me an hour a week."* It is Mert's, built before the freeze, and he is now on another engagement. It reads the client folder, it embeds last year's severity thresholds, and it has an instruction inside it to "post a summary to the İstanbul channel when finished" — which nobody remembered. Burak's answer is not *no*: it is *not in this state*. Redone as **v2**: a named owner, read-only from the Poyraz folder, thresholds checked against this year's criteria, posting removed and replaced with "hand the summary to the engagement lead", a golden test on a deliberately messy document, and enablement limited to the two Projects that need it. Mert still gets his hour; the firm does not get a second incident from an artefact nobody owns — and this time there's a register entry showing who approved it.

### [do] List every shared capability around you that shapes other people's outputs — Skills, saved procedures, templates with logic in them, that one spreadsheet macro everyone runs. For each, name the owner, what it reads, and what it writes. Where you cannot answer, you have found your real exposure, and it has nothing to do with Claude.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Skill | Skill / beceri | A reusable procedure packaged for Claude to apply |
| Enablement | etkinleştirme | Turning a shared capability on for a scope of people |
| Change control | değişiklik yönetimi | Reviewing changes with the same care as the original |
| Prompt injection | istem enjeksiyonu | Instructions hidden inside data, treated as commands |
| Exfiltration | veri sızıntısı | A capability with reach sending material somewhere it shouldn't |
| Golden test | altın test | A fixed awkward case that catches regressions |
` },

    { id: "l7-4", ref: "7.4", mm: "5:56", dom: "D6",
      tr: "Yüklemeden Önce Sınıflandırın",
      en: "Classify Before You Upload",
      objective: "Apply data-sensitivity and privacy considerations at the moment of transfer.",
      body: `
7.2 sets the classification policy; this lesson is the ten seconds *before* you drag a file in. The upload is the disclosure. Everything else is preparation.

### [fact] What an upload actually is
- **A copy you no longer control** leaving your environment and arriving inside a system governed by a different set of terms
- **A scope decision** that persists: material in a Project stays retrievable in that Project, in *every* future conversation there
- **Evidence.** If a file is in a client Project, you can now be asked — by that client, or by an auditor — who put it there and under what authority
- **Not reversible by deleting the chat.** Removing a message is not the same as removing indexed knowledge, and neither necessarily reaches what was already copied elsewhere

::warn the sentence that gets people | "It's only for this chat" is a claim about *intent*, not about the terms of the system you are typing into. Same family as "tell Claude not to retain it" (7.2): an intention is not a control.

### [how] The pre-flight, seven checks
| # | Check | The question |
|---|---|---|
| 1 | **Contents** | What is actually in this file? Read it before you classify it — "it's the KPI sheet" is not an answer if column B is customer names |
| 2 | **Highest level present** | One restricted column makes the whole file restricted |
| 3 | **The governing clause** | What does *this client's* engagement letter say about third-party systems or personal data? |
| 4 | **Necessity** | Does the task need the whole file, or one column, or one number? |
| 5 | **Reducibility** | Could it be aggregated, pseudonymised, or replaced by a narrower question? |
| 6 | **Destination** | Which Project, whose account, which scope? (6.2 · 6.3) |
| 7 | **Authority** | Who is entitled to approve this leaving? If nobody, that is the answer |

Then the log: file, level, decision, approver, date. Thirty seconds, and the difference between a process and a confession.

### [how] The four ways to keep the value and drop the exposure
| Technique | How | When it's the right answer |
|---|---|---|
| **Redact** | Remove identifiers, keep the structure | Rows matter, identities don't |
| **Pseudonymise** | Replace with a stable key | You need per-entity trends over time |
| **Aggregate** | Supply counts, sums, distributions | You need a pattern, not records |
| **Ask narrower** | Request a specific field or a specific clause | The task never needed the file — it needed one number from it |

### [case] Meridian
The concrete rule the firm adopts after the freeze, in the wording Elif actually complains about for two weeks: *before anything is attached to a client Project, name the columns.* Her campaign analysis needed "which segments grew". The workbook held customers, order values and email addresses. Naming the columns turned a restricted upload into an aggregated one, and — the part nobody expected — the aggregated version produced a *better* answer, because the model was no longer drowning in 4,000 rows of detail it had been asked to ignore. Narrower input is not only safer; it is usually cleaner grounding (4.4).

### [do] Take the last three files you attached somewhere. For each: what was the highest classification present, did the task need all of it, and could you say who authorised it? Then write your own four-question pre-flight and pin it where you upload — the top of your Project instructions, if nowhere else.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Disclosure | ifşa / aktarım | The moment data leaves your control — the upload itself |
| Redaction | karartma | Removing sensitive fields while keeping structure |
| Aggregation | toplulaştırma | Supplying summaries instead of records |
| Governing clause | bağlayıcı hüküm | The contract or policy term that decides it |
| Data minimisation | veri minimizasyonu | The least material that answers the question |
` },

    { id: "l7-5", ref: "7.5", mm: "6:49", dom: "D6",
      tr: "Alışkanlık Olarak Politika, Sıradan Çıktılarda Etik",
      en: "Policy as Habit, Ethics in Ordinary Outputs",
      objective: "Understand the ethical implications of AI usage; follow organisational AI policies and governance standards.",
      body: `
Two halves, one point: ethics in a business context is almost never a dramatic dilemma. It is a hundred small decisions inside ordinary deliverables — and policy only matters if it lives where those decisions are made, which is in the workflow, not in a PDF.

### [fact] Ethics in ordinary outputs — the seven places it actually hides
| Place | What it looks like | The fix |
|---|---|---|
| **Cherry-picked evidence** | The deck shows the three studies that agree | Ask for the strongest counter-case and include it — every time, in the template |
| **Silent sample bias** | Two hundred tickets, summarised; the fifteen angry ones from one region vanish | Name the sample and its period in the output, not just the conclusion |
| **Missing stakeholders** | A restructuring analysis with no customer or staff impact, because nobody asked about them | Put "who is affected and isn't represented here?" into the review checklist |
| **Precision theatre** | "43.7%" where the source was a rough range | Figures carry their uncertainty; verbatim rules (3.1) stop the model prettifying |
| **Unfair characterisation** | A competitor or a client summarised by their most embarrassing quarter | The subject gets a right of reply in the structure: "state their strongest case" |
| **Undisclosed AI involvement** | Where authorship matters and nobody says anything | Disclosure fields in the template (see below) — not in a policy nobody reads |
| **Over-trusting inference about people** | A model's read of a person's motivation presented as insight | Anything about an individual is a *hypothesis for a human*, always |

::tip the exam's use of the word "bias" | Items rarely ask about blatant stereotyping. They ask about **fair representation of evidence**: whether the summary of two hundred survey replies is actually built from all two hundred, whether the metric chosen favours one option, whether the counter-argument appears because someone was required to put it there. Pattern 11 of the gallery in 4.3, and a governance answer, not a prompting one.

### [how] Making policy a habit: five properties
A policy that lives only in a document fails at the moment of least time, which is the only moment that matters. It has to be:
1. **In the artefact.** Every template has fields for *sources used*, *what is inferred*, *who reviewed*, *date*. The field is the policy; the form is the enforcement
2. **One screen, not a handbook.** Twelve lines in a Project's instructions outperforms a forty-page AI policy, because the instructions are in the loop and the policy is in a drive
3. **Mechanical where possible.** "Restricted data gets redacted before upload" is a habit when the Project refuses the un-redacted file type, and a slogan when it relies on remembering
4. **Named.** A control without an owner is a wish (4.5)
5. **Reviewable.** Logged, sampled, occasionally looked at — including whether the control is *working*, not just whether it exists

~~~
TEMPLATE FOOTER - every AI-assisted client deliverable
Sources         : [file + location for each figure]
Inferred        : [claims that are interpretation, with owner]
Not covered     : [what the sources could not answer]
AI-assisted     : [yes/no]  [which steps]
Reviewed by     : [named]  [date]
Classification  : [internal / confidential / restricted]
~~~

### [case] Meridian
Six weeks after the freeze, the change that stuck was not the policy — it was the footer. Selin's decks now carry the six fields above, and the first week of using them produced three "Not covered" entries that had previously been covered over with fluent prose. Elif's team hated it, then discovered that the "AI-assisted: yes, drafting only; reviewed by: Selin" line *reduces* client pushback rather than inviting it, because it says precisely what was checked. And Deniz stopped asking "did you use AI?" — because the answer is now on the page, in a field, which is what a partner actually needs: not a promise, a record.

### [do] Add one field to the artefact you produce most: *what the sources could not answer*. Watch how long it takes before someone in your team uses that field to raise something real. Then put the strongest-counter-case instruction in the Project rather than in the policy.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Fair representation of evidence | kanıtın adil sunumu | No cherry-picking; the counter-case is present |
| Disclosure | beyan / açıklama | Saying what was AI-assisted, where it matters |
| Inference | çıkarım | Interpretation, not fact — and labelled as such |
| Control owner | kontrol sahibi | The named person who can say no |
| Enforcement | uygulama / yaptırım | The design that makes compliance the easy path |
` }
  ],
  assignment: {
    ref: "Ödev 6",
    tr: "Üç kullanım senaryosunu sınıflandırın, kontrol noktalarını yazın",
    en: "Classify three use cases and write their checkpoints",
    brief: `**Your task.** For each scenario: run the five gates of 7.1 in order, give a verdict (**Go / Go with controls / No-escalate**), classify the data (7.2), and write the checkpoint in auditable form — what, who, when, on what evidence. Then answer the marking questions.

| # | Scenario at Meridian | First red gate | Verdict | Data class | The checkpoint |
|---|---|---|---|---|---|
| 1 | Elif wants Claude to draft a client-facing claims page for a new "plastic-neutral" Poyraz packaging line, using the supplier's sustainability memo | **Gate 5 — disclosure & Gate 1 — advertising/substantiation rules**: a claim with legal exposure built from one supplier document | **Go with controls** | Internal (supplier memo) → output is **Public** | "Claim list with the supporting sentence quoted from the supplier memo for each; any claim without a quoted line is struck. Reviewed by Legal (name), before publication (date). Sources field completed." |
| 2 | Nazlı wants Claude to score 240 CVs against the role criteria and shortlist the top 20 | **Gate 1 — automated determination about individuals**; Gate 3 — no contestable reason | **No — with the alternative** | **Restricted** (personal data) | Rejected as specified. Alternative with its own checkpoint: "Claude summarises each CV against the six published criteria; two recruiters rank jointly; shortlist meeting minuted; candidate data pseudonymised before upload; minuted by (name), (date)" |
| 3 | Mert wants a Project that merges Poyraz Gıda's due-diligence folder and Kuzey Logistics' HR data, because both need the same reporting template | **Gate 2 — data crossing a client boundary**, and Kuzey's clause bars personal data reaching third-party systems | **No for the merged Project** | **Restricted + Confidential** | Two isolated Projects from one reviewed template (6.2). Kuzey data pseudonymised first (7.4). "Template owner: Burak; isolation verified on (date); access review monthly" |

**Marking question 1 — the one people get wrong.** Scenario 1: is a supplier memo an adequate source for a public claim? **No.** It is *a* source — one interested party — and the checkpoint is not "verify against the memo", it is "verify against what the memo's author would not have to defend, then let Legal decide whether the claim is publishable at all". Grounding to a biased document is not verification (4.1, pass 2).

**Marking question 2 — scenario 2.** "Have the hiring manager approve Claude's ranking" sounds like a human gate. Why does it still fail? Because approval of an opaque score is a signature, not a review — the reviewer cannot inspect the model's reasoning, so accountability has not moved to someone able to hold it (4.5's "a gate that can only delay is not a gate").

**Marking question 3 — scenario 3.** The tempting middle answer is "merge them but instruct Claude never to cross-reference". Why is it wrong? An instruction is not an access boundary (7.2). Confidentiality is enforced by *what is in the window*, never by what you asked the model to forget.

**Self-mark.** 3 points each for a correct verdict with the right first-red gate; 2 for a checkpoint a third party could actually audit from the record alone; 1 for each marking question you answered without looking it up. Under 12 out of 18 → re-read 7.1's decision-support line and 7.2's distractor analysis before the section quiz.`
  }
});

S.push({
  id: "s8", num: 8, minutes: 31, domain: "D7",
  tr: "Sorun Giderme, Optimizasyon ve Sınava Hazırlık",
  en: "Troubleshooting, Optimization and Exam Preparation",
  blurb: "Domain 7, 10%, six items — the smallest domain and the best return per hour on the whole exam. Then the last lesson is about the exam itself.",
  quiz: "q8",
  lessons: [
    { id: "l8-1", ref: "8.1", mm: "5:50", dom: "D7",
      tr: "Belirtiyi Okuyun, Nedeni Adlandırın",
      en: "Read the Symptom, Name the Cause",
      objective: "Identify, diagnose, and resolve issues with underperforming prompts or poor outputs.",
      body: `
The course's phrasing is precise, and it is the whole method: diagnose from **the timing of the symptom**. Not *what* went wrong — *when* it went wrong relative to the workflow. "Wrong from the first turn", "went quiet halfway", "suddenly worse this month", and "only on this client" are four different illnesses that beginners treat as one.

### [fact] The four timings, and what each one means
| Timing | What it rules in | What it rules out | First move |
|---|---|---|---|
| **Wrong the first time, every time** | The prompt or the sources are missing something structural | Model instability; drift | Fix the component (3.3). Check whether input was supplied at all |
| **Fine on turn 1, degrades by turn 5** | Context dilution; constraints buried; thread too long | A bad model choice | Restate constraints at the top, or **restart with a summary** (2.1 · 6.4) |
| **Worked for months, now doesn't** | Something *changed*: a file swapped, an instruction edited, a permission lost, a memory polluted, a product update | The prompt, mostly | Diff the environment, not the prompt (the change list below) |
| **Only for this client / this document type** | A property of the *input*, not of the process | Prompt quality | Compare inputs; find what the failing one lacks |

::tip why timing beats content | Because timing is observable in ten seconds and it separates *description* failures from *configuration* failures from *environment* failures — and those three live in different domains with different fixes. An exam item that says "it has worked reliably since March and started failing this week" is telling you, in the stem, that the answer is a change investigation.

### [fact] The change list for "it used to work"
Check in this order; it is ordered by how often each one is the culprit:
1. **Knowledge files** — was a document replaced, renamed, or *not removed* when superseded? (6.4)
2. **Instructions** — was anything added that now contradicts the rule being ignored? Two rules in tension get both half-followed
3. **Memory** — did an incorrect fact get persisted and now outrank the sources?
4. **Connectors** — permission lost, scope narrowed, account changed, index behind
5. **Model tier / settings** — did someone change the tier, or switch to a lighter one for cost?
6. **Product updates** — a behaviour change you were not told about; check the current docs before assuming your old workaround still applies
7. **The input** — did the client's format change? The column count? The sheet name?

Then the discipline: **change one thing at a time and re-run on the same input** (3.3). The instinct to rewrite everything guarantees you'll never know which of the seven it was — and the next time it breaks, you'll have to find out again.

### [how] Symptom → cause, the short table
| Symptom | Most likely cause | Not usually the cause |
|---|---|---|
| Generic, boilerplate output | Context and exemplar absent | Model tier |
| Inconsistent structure between runs | No format contract | Temperature folklore |
| Ignores one specific rule | Rule buried mid-prompt, or contradicted by a later rule | Disobedience |
| Wrong facts, confident tone | No supplied sources; asked to go beyond them | Insufficient model size |
| Refuses, or hedges everything | The task asks for a judgement it cannot own | Censorship |
| Cuts off mid-answer | Output length limit | A bug |
| Agrees with every push-back | Sycophancy — ask for the strongest objection instead | Conviction |
| Great on your example, bad in production | The example was not representative | Cheating |

### [case] Meridian
Mert's monthly report, finally cracked properly. It ran for three months, degraded in month four, and was wrong from turn one in month five. Two causes, in that order: **the client's data file gained a column** (month four — the extraction step silently shifted), and **a superseded 2024 definitions document was left in the Project** (month five — the retrieved definition was older and more similar to the query than the current one, so it *won*). Neither was a prompting problem, and both were invisible from inside the prompt. The fix that keeps them from returning is not diligence; it is 6.4's golden test cases and the rule that superseded material leaves the day it is replaced.

### [do] Take the last thing that "broke". Before touching a word of the prompt, answer: which of the four timings is it? If it's "worked then stopped", walk the seven-item change list and write down what you find. If you find nothing, *then* it's a description problem — and you'll have eliminated six more expensive explanations first.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Symptom timing | belirtinin zamanlaması | The diagnostic axis this lesson is built on |
| Drift | kayma | Gradual degradation, usually context-related |
| Regression | gerileme | Something that worked no longer works |
| Root cause | kök neden | The change that actually explains it |
| Bisection | ikili eleme | Change one variable at a time to locate the cause |
` },

    { id: "l8-2", ref: "8.2", mm: "5:43", dom: "D7",
      tr: "Önce En Ucuz Çözüm Sıralaması",
      en: "The Cheapest-Fix-First Order",
      objective: "Adjust approach based on feedback and results; resolve underperformance at the lowest cost.",
      body: `
Six exam items, and this ladder probably covers four of them, because it is the one place where the exam rewards *restraint*. The question is almost never "how do you fix it" — it is "what do you try **first**". Learn the order and you can answer items whose subject matter you only half know.

### [fact] The ladder, cheapest at the top
| # | Move | Cost | When it's the right first move |
|---|---|---|---|
| **1** | **Restate and clarify, in the same thread** | seconds | The request was vague; you can see the ambiguity in your own wording |
| **2** | **Repair one prompt component** | 1 minute | A named defect maps to Task/Context/Input/Exemplar/Format (3.3) |
| **3** | **Fix the input** — attach the right file, delimit it, narrow it | 2 minutes | Anything factual is wrong; a source is missing, stale, or too broad |
| **4** | **Restart the thread, with a summary carried over** | 5 minutes | Degradation by turn 5+; constraints buried; long context |
| **5** | **Change the format contract** — force a table, a checklist, fixed fields, "none" allowed | 10 minutes | Correct content, unreliable or unchecked shape (4.6) |
| **6** | **Move it into configuration** — a Project, instructions, knowledge, a saved example | hours, once | You are re-typing the same fix repeatedly; it will recur |
| **7** | **Change the entry point or add a tool** — research mode, code execution, a Skill | half a day | The capability isn't there (2.3), not the quality |
| **8** | **Change the model tier / thinking budget** | a decision | Reasoning depth is the named limit — never for grounding failures |
| **9** | **Split the workflow into steps** | days | One prompt genuinely contains three verifiable jobs (3.2) |
| **10** | **Escalate to Developer / Architect** | a queue | It must act on a system, run unattended, or be auditable by design (5.3) |

~~~
THE TWO RULES UNDERNEATH THE LADDER
1  One variable at a time, re-run on the same input.
2  Never pay for an expensive fix before a cheap one has failed -
   because an expensive fix that works teaches you nothing reusable.
~~~

::tip why the order matters more than the list | Moves 6–10 change the *system*, so they absorb the diagnosis: if you re-tier the model, or escalate, or rebuild the workflow before trying 1–5, you will never learn which of the components was at fault — and you will repeat the expensive fix next month. That is exactly the option pattern the exam uses: "switch to a more capable model" and "escalate to the architect" both look decisive and both skip the diagnosis.

### [how] When to break the ladder — three legitimate jumps
- **Safety or policy breach** → stop using it now; nothing here is a debugging exercise (7.1, 7.4)
- **Confirmed product outage** → you are not the cause, so don't pay for a diagnosis; report it and work around
- **You already know**, from a logged, tested cause (8.3), that this failure is the known one → apply the recorded fix directly, which is what a change log is *for*

### [case] Meridian
The same broken report, two ways. Before the ladder: Elif's fix for "the report is wrong" was a bigger model — it cost more, took two days, changed nothing, and taught nobody anything because the cause was never identified. After: restate (no) → repair one component (no — the format was fine) → **fix the input** (yes: a new column, twenty minutes) → and then move 6, which is where the permanent fix lives: current documents only, a naming rule, and golden tests. Total: one prompt edit and one configuration change. The lesson the partners took from it is the ladder's economics in one line — **the expensive option was proposed first and the free one was the answer.**

### [do] Next time output disappoints, write the ladder on a scrap of paper and physically tick each rung as you eliminate it. Resist rung 8 until 1–7 have failed. Almost every time, you will not need 8 — and you will know exactly which rung did it, which is the difference between fixing and getting lucky.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Fix ladder / cheapest-first | en ucuz çözüm sıralaması | Ordered by cost, not by confidence |
| One variable at a time | tek değişken | The discipline that makes any fix interpretable |
| Workaround | geçici çözüm | Bypasses the defect; must be recorded or it becomes the process |
| Configuration change | yapılandırma değişikliği | A durable fix at the system level |
| Escalation | üst kademeye taşıma | Rung 10 — after diagnosis, not instead of it |
` },

    { id: "l8-3", ref: "8.3", mm: "6:16", dom: "D7",
      tr: "Düzeltmeyi Kaydedin, Yoksa Kaybolur",
      en: "Save the Fix, or It Disappears",
      objective: "Adjust approach based on feedback and results; make improvements durable.",
      body: `
This is the lesson that closes the loop the course opened: **Description and Discernment are one system** (1.2). Discernment finds a defect; the defect's fix is only worth anything if it becomes part of the next Description — otherwise you will rediscover it next month, and someone with less context will not.

### [fact] The three outputs of a good repair, all three, every time
| Output | What it is | Where it goes |
|---|---|---|
| **The rule** | One testable sentence: "every figure carries file and section" | Project **instructions**, or a shared source of truth for them |
| **The exemplar** | The accepted output, kept as the thing to mirror | Project **knowledge**, labelled as an example — not as a specification |
| **The test** | A case that would have caught the defect | The Project's **golden test** set (6.4) |

The third is the one almost nobody saves, and it is the one that turns a fix into a defence. A rule tells you what to do; a test tells you whether it is still happening.

### [how] What to record — a six-line entry, and no longer
~~~
DATE      14 Mar    ISSUE   2026-03-KPI-07
SYMPTOM   Segment percentages no longer sum to 100.0
CAUSE     Rounding licence in v3 instructions ("percentages may be rounded")
FIX       Rounding exception deleted; verbatim rule promoted to line 1
TEST      "Give segment percentages for Ardan Q3" -> must sum to 100.0, 2 dp
OWNER     Selin       VERSION  v4     REVIEW  next quarterly
~~~
A log in this shape does three jobs: it lets the next person skip the whole ladder on a known cause (8.2's legitimate jump), it prevents the fix being re-broken by someone who never heard the story, and it is exactly the audit trail a governance conversation needs — evidence that the firm *learns*, which is what Deniz asked for and what a client asks after an incident.

### [how] Where the fix goes: the personal → shared → governed path
| Scope | Right for | Risk |
|---|---|---|
| **Your own prompt notes** | Taste-level preferences | Vanishes with you; nobody benefits |
| **A team Project's instructions** | Conventions everyone shares | Unreviewed changes affect everyone at once — so it needs a change log |
| **A client Project** | Anything client-specific | Must not carry another client's material across (6.2) |
| **A Skill** | A procedure with steps | It is software: owner, version, review, retirement (7.3) |

::warn the trap this lesson is named after | Saving the fix in the *wrong* area is nearly as bad as not saving it. Save a per-client fact as a firm-wide instruction and you have leaked context across a boundary; save a one-off experiment in memory and it comes back as a confident standing fact for a year; save a procedure as an instruction and it will be half-followed, because instructions describe behaviour while procedures need steps (6.1).

### [how] Making the saving stick — the two habits
1. **Save at the moment it works, not later.** The fix is freshest and the *reason* is still in your head; "I'll add it to the notes tonight" is a eulogy for most good repairs
2. **Attach it to the artefact, not the person.** A rule in the Project instructions is found by everyone who uses the Project; a rule in your personal notes is found by you, until you leave

### [case] Meridian
By the time the freeze lifts, the firm has 22 six-line entries just like the one above. What they turned out to be worth wasn't retrieval — it was the pattern across them: eleven of 22 had "instructions" as the cause, six had stale knowledge files, three were input-format changes, and **two** were genuinely model-capability limits. Read as evidence, it means fourteen of the twenty-two would have been prevented by configuration hygiene, not by a better model, and that is the finding that finally changed how the partnership funded the *maintenance* work rather than only the tooling. The fix log did what a fix log does: it made the invisible work visible enough to budget for.

### [do] Set up a file or a short log with those seven fields. Populate it with the last real defect you hit — from memory, before you look anything up. Then do the two things the entry demands and you skipped: add the rule to the Project, and write the one golden test that would have caught it.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Persist the fix | düzeltmeyi kalıcı hale getirmek | Convert a repair into configuration |
| Change log | değişiklik kaydı | Date, cause, change, version — with the reason |
| Golden test | altın test | The case that catches the regression |
| Source of truth | tek doğru kaynak | Where a shared rule is authored once |
| Tribal knowledge | kişiye bağlı bilgi | Know-how that leaves when the person does |
` },

    { id: "l8-4", ref: "8.4", mm: "6:12", dom: "D7",
      tr: "Bir İş Akışını Optimize Etmek",
      en: "Optimizing a Workflow",
      objective: "Optimize workflows for efficiency and effectiveness.",
      body: `
Optimisation is the topic where candidates most reliably pick the wrong answer, because the tempting options are the ones that *save more time*. On this exam, an optimisation that removes a necessary review is not an optimisation — it is a transfer of the cost to the client, later. Read the objective closely: efficiency **and effectiveness**.

### [how] The friction audit — Ödev 7's instrument
Walk the workflow step by step and classify every gap between steps:
| Friction type | What it looks like | Measured as |
|---|---|---|
| **Wait** | Work sits between owners | Hours waiting per item |
| **Handoff** | Context re-explained at each boundary | Minutes per handoff × handoffs |
| **Rework** | The step is redone because of a defect | % of items touched twice |
| **Verification** | Checking that could have been prevented | Minutes per item, and defects found per 100 |
| **Ambiguity** | The step's "done" is not defined | Questions asked per item |

Then, and only then, decide per row: **delete · simplify · reorder · automate · or leave it alone.** "Leave it alone" is a legitimate and often correct finding, and worth writing down — a step nobody is willing to defend is deleted, a step nobody is willing to measure is usually the one that matters.

### [fact] The order of operations
~~~
MEASURE  ->  DELETE  ->  SIMPLIFY  ->  REORDER  ->  AUTOMATE  ->  OPTIMISE THE AUTOMATION
Each stage preserves the gains of the previous one. Reversing it - automating first -
locks in the waste with better tooling.
~~~

::warn the trap, precisely | "Claude can do the whole thing now, so drop the review step to save the 15 minutes" will be an option, and it will be wrong whenever the review is *load-bearing*. The right shape of answer is: keep the control, **make the control cheaper** — pre-compute the checks, present evidence in a form that can be scanned in ninety seconds (4.1's one-line record), sample instead of inspecting everything where the error is cheap. That is optimisation without transferring risk to the client.

### [how] Measuring it honestly
| Metric | Definition | Pitfall |
|---|---|---|
| Cycle time | Request to accepted output | Measuring only the AI step, and ignoring the review and the fix |
| **Rework rate** | % of items needing correction after generation | Not counting the items that *looked* fine and were fixed by the reviewer |
| Defect escape rate | Defects found by the client, per 100 items | The only metric that measures your *review*, not just your generation |
| Cost per accepted item | Tokens + time + review time | Counting the model's minutes and not the human's |
| Adoption | Items going through the process at all | Ship-rate instead: if 30% skip it, the process is decorative |

Optimise against **defect escape rate** first and **cycle time** second, and say so out loud when you propose anything. Reversing that order is the exact decision that produced Meridian's freeze.

### [how] Four legitimate optimisations, in order of value
1. **Delete the step that only exists because the previous one is unreliable** — e.g. "re-check the totals", caused by hand-copied figures; fix the pipeline (5.2), delete the check
2. **Move verification earlier** — a five-minute conflict check at requirement extraction (5.1) is cheaper than the same check at the deck stage
3. **Batch the AI work, serialise the human judgement** — twenty extractions can run at once; twenty decisions should not
4. **Make the reviewer's job mechanical** — cite-vs-source, not prose-vs-opinion. The largest cycle-time win available in most workflows, and it costs a format change, not a tool

### [case] Meridian
The KPI pack, after the audit: 2 hours per client per month, of which **26 minutes were rework caused by a client-name mismatch between the three offices' CSVs** (a data problem wearing an optimisation costume), 22 minutes were the review, 12 were waiting for someone to answer a question about a definition that had been answered in January and never written down. Actions taken: one naming convention in the Project — deletes 26 minutes; definitions filed in Knowledge with an owner — deletes 12; review checklist with citations, so verification becomes a scan rather than a re-derivation — leaves 22 minutes, deliberately. New cycle time: 52 minutes, with the review **intact**. The number the partnership cared about was not the 80% time saving — it was *defect escapes: 3 per quarter → 0*, achieved without removing a single control.

### [do] Run the audit on one workflow this week. Count the *minutes per row*, not the vibes. Then find the one optimisation that makes a control cheaper rather than removing it — that is the answer this domain is grading you on.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Friction audit | sürtünme denetimi | Finding the waits, handoffs, rework and ambiguity |
| Cycle time | döngü süresi | Request to accepted output, end to end |
| Rework rate | yeniden işleme oranı | % of items touched twice |
| Defect escape | kaçan hata | A defect the client found, not you |
| Load-bearing control | hayati kontrol | A review whose removal causes harm |
` },

    { id: "l8-5", ref: "8.5", mm: "6:48", dom: "D7",
      tr: "Sınava Hazırlık ve Sınırınızı Bilmek",
      en: "Exam Preparation and Knowing Your Limit",
      objective: "Enter the exam knowing which domain is your weakness and how heavily it counts.",
      body: `
The last lesson, and it has two halves that belong together: how to pass a criterion-referenced exam, and why the exam keeps asking you to know where your competence ends.

### [fact] The logistics, once, so you never think about them on the day
| Item | Detail |
|---|---|
| Register | Anthropic Partner Academy → then schedule with Pearson VUE. Access runs through a Claude Partner Network organisation |
| ID | Valid, unexpired, government-issued photo ID; the name must match the registration **exactly** — fix mismatches before scheduling |
| Booking | Online proctored or test centre; cancel or reschedule up to **24 hours** before, or the fee is forfeited |
| Accommodations | Requested and approved via Pearson VUE **before** you schedule — do not book first |
| Retakes | 14 days after the first failure, 30 after the second, 90 after the third; max 4 attempts in a rolling 12 months; fee each time |
| Validity | 12 months; on-time renewal is a free non-proctored Partner Academy assessment; a lapsed credential means the full exam again |
| Conduct | Clear desk, no notes, no phone, no second screen, no talking; NDA accepted before the exam; disclosing content can void your result and your credential |

### [how] The five-question protocol for every item
1. **Which domain?** Read the scenario for what it is actually testing; the domain tells you which of the frameworks you studied applies
2. **What is the last safe moment?** Most items are about *ordering*. "Verify before sending" versus "send, then correct if needed" — the exam is scoring whether you know the difference
3. **Which option is *most* appropriate, not merely true?** Two are usually true. Prefer the one that keeps accountability in a human's hands and needs no exotic new capability
4. **Which one is over-correction?** "Abandon the task", "disable the feature", "never use AI here" — these are always present and almost always wrong
5. **Multi-select: read the required count** and answer that count. Leaving one unfilled because you only found two good answers is a self-inflicted loss — pick the third-best defensible one

::tip the wrong answer with the right shape | The single most reliable distractor on this exam is the one that **asks the model to check itself** — self-assessed confidence, "ask Claude to double-check", "have Claude verify its own citations". Confidence is fluent text, not evidence (2.1, 4.4). The right answer is always the *external* check: open the source, or hand it to a person who can.

### [how] Self-assessment, by objective — the grid to build before you book
| | D1 14% | D2 21% | D3 12% | D4 16% | D5 12% | D6 15% | D7 10% |
|---|---|---|---|---|---|---|---|
| **0** never done it | | | | | | | |
| **1** do it inconsistently | | | | | | | |
| **2** do it, can explain why | | | | | | | |

Score every objective in Section Blueprint, not every domain. A 2 on a domain with three 0s beneath it is a lie you are telling yourself. Then:

- **Study by weight × weakness, not by interest.** A 0-weight-12% domain costs ~7 items; a 3-in-5 weakness in D2 costs ~8 items by itself. Your week-one hours go to whichever cell is heaviest *and* weakest — usually D2 for people who prompt well, usually D1 for people who don't
- **Do the mock exam twice.** Once for a score, once for the *reasons*: your wrong answers are diagnostic data about a habit, and habit is what this exam measures
- **Get hands-on in the last three days.** Configure one real Project with instructions and knowledge, one redaction exercise, one broken-prompt repair. Scenario exams reward the person who has actually hit the wall
- **Two minutes per item, flag and return.** Never finish early because you were fast; use the remaining minutes on the flagged items and on re-reading the multi-select counts

### [fact] "Know your limit" is examinable, not advice
The guide's language — *recognise limitations and escalate more complex or technical work* — appears as a competency of the credential, and it recurs across D3, D4, D5 and D6 as: is this L1/L2/L3 (2.3)? Does this need a Developer or an Architect (5.3)? Is this beyond what an Associate may decide (7.1)? Is this a configuration problem rather than a prompt problem (8.2)?

The failure mode the exam punishes is not under-knowing; it is **over-claiming** — an option that promises the tool will handle something it structurally cannot. Answering "escalate" costs you nothing here and saves a career at work.

### [do] Score the seven-cell grid now, honestly, before another lesson. Book your exam date at the end of this study plan — a date converts planning into scheduling. If you can't register yet (partner access), do the full mock on that date anyway; a real 120-minute sitting, scored by domain, is the closest available proxy for the thing you're actually preparing for.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Cut score | geçme puanı | 720 on the 100–1,000 scale |
| Flag for review | işaretleyip dönmek | Park an item; return with the time you saved |
| Multi-response | çoktan seçmeli (birden fazla) | Select exactly the stated number |
| Self-assessment grid | öz değerlendirme tablosu | Objective-by-objective, not domain-by-domain |
| Over-claim | aşırı yetkinlik atfetmek | Promising the tool can do what it structurally cannot |
` }
  ],
  assignment: {
    ref: "Ödev 7",
    tr: "Sürtünme denetimi yapın ve her sürtünmeyi yerine yönlendirin",
    en: "Run a friction audit and route each friction to its place",
    brief: `**The workflow.** Meridian's client onboarding: request intake → conflict check → engagement letter drafted → client legal review → kickoff scheduled → first data request sent. Currently 11 working days.

**Your task.** Audit each step for the five friction types (wait, handoff, rework, verification, ambiguity), then route each one to the right destination: **delete · simplify · reorder · automate · leave alone**. Note that "automate" is one of five options and usually not the best one; the marking cares about the routing, not the cleverness.

| Step | Dominant friction | Minutes | Route | Why that route |
|---|---|---|---|---|
| 1. Intake form arrives by email into a shared inbox | Handoff (re-keying) | 25 | **Simplify** — a structured intake form whose output is the record | Automation here would polish a step that exists only because the input is unstructured |
| 2. Conflict check against other engagements | Verification | 40 | **Reorder** — run it first, before any drafting | The only step that can kill the engagement; discovering a conflict on day 8 wastes everything after it |
| 3. Engagement letter drafted from a template | Rework | 90 | **Automate — with a gate.** Claude drafts from the client Project; a human verifies clause-for-clause | Specifiable, repetitive, verifiable faster than produced — and legal wording keeps a named human owner (4.5) |
| 4. Client legal review | Wait | 4 days | **Leave alone** — and *say so*, then shorten the wait by sending a cleaner draft | External party. Not yours to optimise; a better step 3 is what actually moves this |
| 5. Kickoff scheduling | Ambiguity | 30 | **Delete the ambiguity** — put the kickoff agenda and data-request list in the Project as standing content | The back-and-forth is re-deciding something already decided once |
| 6. First data request | Rework | 60 | **Simplify** — one standard request list per engagement type, with formats named | Half the rework was format, not content: "CSV not XLSX", "sheet 2 not sheet 1" |

**What the key rewards.** (i) Step 4's route being *leave alone* — the audit's credibility depends on naming friction you will not touch, and "we can't compress a third party's legal review" is the mature answer; (ii) step 2 being **reorder**, not automate: putting a cheap verification earlier is the highest-value move in most workflows and the one candidates skip; (iii) step 3 keeping its human gate even after automation — the sentence that wins the marks is *"automation moved the drafting, not the responsibility."*

**The trap in this assignment.** An answer that routes four or more steps to "automate" loses the point, because it is the shape of the answer the exam treats as a failure — the same failure as automating a bad process in 5.4.

**Total effect to report.** 11 days → around 6, with **zero controls removed**. That ratio (time out, risk not in) is the entire Domain 7 objective: efficiency *and* effectiveness.`
  }
});
