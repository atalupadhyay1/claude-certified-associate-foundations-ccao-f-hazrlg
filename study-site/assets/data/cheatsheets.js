/* Quick-reference sheets: the exam-day one-pagers. */
window.CCAO = window.CCAO || {};
window.CCAO.cheats = [
{ id:"c0", title:"Start here · How to use this pack", tag:"orientation",
  md:`
Two facts change everything about how you should prepare. First, this is a **criterion-referenced** exam: you are measured against a fixed standard — 720 on a 100–1,000 scale — not against other candidates. Nobody else's performance helps or hurts you, and there is no curve to clear. Second, **almost every item is a scenario ending in "what is the most appropriate action?"** — so recognition of facts is not the skill being paid for.

### The 30-minute plan
1. Read **Blueprint & item budget** below. Memorise the top three weights: 21 / 16 / 15.
2. Read **Every domain, one line each** — the frameworks in the pack are built to sit on these.
3. Do the **8 section quizzes** in order. Score is diagnostic, not the point: read *every* option rationale, right and wrong.
4. Read the **Exam trap catalogue** twice. This is the highest-rows-per-minute page here.
5. Sit the **60-question mock** timed, 120 minutes, no pausing. Study the per-domain report afterwards, not the total.
6. Re-read only the lessons attached to your two weakest domains, then re-sit the mock.

### The 60-second version of the whole course
~~~
DELEGATION   what does Claude do here, what stays human, who is accountable?
DESCRIPTION  task . context . input . exemplar . format  (+ verification built in)
DISCERNMENT  requirement . grounding . completeness . consistency -> DECIDE
DILIGENCE    permitted? classified? disclosed? reviewed? recorded?
~~~

If a scenario makes you hesitate, ask which of those four lines it is about. Almost every item is one of them, and the answer is nearly always the option that keeps **accountability with a named human** and **verification external to the model**.

::warn about this pack | Independent, unofficial material. It is built from the official CCAO-F Exam Guide v1.0 (July 2026), this course's published syllabus and learning outcomes, and Anthropic's published framework and product documentation — it is *not* a transcript of the paid videos. Framework labels the course coins are reconstructed and flagged as such. Weights come from third-party exam guides; Anthropic does not publish them. Verify current product behaviour in Anthropic's docs.
` },

{ id:"c1", title:"Blueprint & item budget", tag:"D-domain weights",
  md:`
Study by weight × weakness, not by interest. A domain you are already good at and that carries 10% is worth less than a domain you are weak at that carries 21%.

| # | Domain | Weight | ≈ Items of 60 | Section | The one thing that earns the marks |
|---|---|---|---|---|---|
| 2 | Output Evaluation and Validation | **21%** | 13 | 4 | Run the five passes; never verify by reading |
| 4 | Workflow Integration & Solution Design | **16%** | 10 | 5 | A delegation map with owners, modes and gates |
| 6 | Governance, Risk & Responsible Use | **15%** | 9 | 7 | Classification determines the checkpoint; decision support ≠ decision making |
| 1 | Prompting & Task Execution | **14%** | 8 | 3 | Five components; one variable at a time |
| 3 | Product & Model Selection | **12%** | 7 | 2 | Four entry points; cheapest tier that clears the bar |
| 5 | Configuration & Knowledge Management | **12%** | 7 | 6 | Four areas, sorted; everything decays and needs an owner |
| 7 | Troubleshooting & Optimization | **10%** | 6 | 8 | Timing of the symptom; cheapest fix first |

### Rough allocation for a 10-hour plan
| Hours | Where | Why |
|---|---|---|
| 3.0 | D2 | Heaviest, and every other domain depends on it |
| 1.5 | D4 | Second heaviest; mostly frameworks you can rehearse |
| 1.5 | D6 | The cheapest marks: judgement, not knowledge |
| 1.25 | D1 | High overlap with D2 |
| 0.75 | D3 | Narrow, rule-driven, fully markable |
| 0.75 | D5 | Overlaps D1 and D6; learn the four areas once |
| 0.75 | D7 | Six items, short frameworks, excellent return |

### Facts worth reciting
- 60 items · 120 minutes · **~2 min/item** · scaled **100–1,000**, cut at **720** · **$99** · valid **12 months**
- Result report: pass/fail, scaled score, **percent-correct by domain** (the domain figures do **not** determine pass/fail)
- Register via **Anthropic Partner Academy** → schedule with **Pearson VUE**
- Retake waits **14 / 30 / 90 days**, max **4 attempts** per rolling 12 months, fee each time
- Cancel or reschedule up to **24 hours** before; later forfeits the fee
- Renewal on time = free non-proctored Partner Academy assessment; lapsed = full exam at full fee
` },

{ id:"c2", title:"Every domain, one line each", tag:"objectives",
  md:`
The objectives below are the official guide's list. If you can perform each one on a scenario you have never seen, you pass. Tick them yourself — per objective, not per domain.

### D1 · Prompting and Task Execution (14%)
| Objective | The move |
|---|---|
| Create effective prompts | Fill all five components: task · context · input · exemplar · format |
| Apply task decomposition | Split when it can fail more than one way, or you can't check it in one pass |
| Iterate to improve output | Name the defect → one component → change only that → re-run on the same input |
| Adapt by task type | Analysis · research · drafting · brainstorming each need a different instruction set |

### D2 · Output Evaluation and Validation (21%)
| Objective | The move |
|---|---|
| Evaluate accuracy and completeness | Two axes: accuracy is checked by reading, completeness only by comparison to a list |
| Identify hallucinations, inconsistencies, bias | Eleven named patterns; bias usually means the sample, not the wording |
| Apply fact-checking and validation | Open 3 random citations at the source; do not read for plausibility |
| Determine when human review is needed | Stakes · reversibility · audience · regulation → a calibrated gate |
| Edit, adapt, refine, compare | Change selection and order for an audience; keep facts verbatim; diff, don't reread |
| Select output formats | Prose hides gaps; a table or checklist exposes them |

### D3 · Product and Model Selection (12%)
| Objective | The move |
|---|---|
| Select product features | Chat · Project · artifact · research mode — decided in the order reuse → source → object |
| Differentiate Haiku / Sonnet / Opus | Cheapest tier that clears the quality bar |
| Align selection with cost, speed, quality | Name the bar and the cost of a wrong answer before choosing |
| Manage context and memory | Know when to **restart, summarise, or persist** |

### D4 · Workflow Integration and Solution Design (16%)
| Objective | The move |
|---|---|
| Analyse requirements and use cases | Inventory → tagged extraction (verbatim/inferred/conflict/gap) → conflicts first |
| Research, planning, process optimisation | Every figure measured, assumed or derived — and derived means computed |
| Support solution design and iteration | Success criteria before building; run on real work; then standardise |
| Integrate into existing workflows | A delegation map: owner, mode, feature, tier, gate — with steps that stay human |
| Communicate value and limits | Value quantified; each limit paired with its control; one explicit ask |

### D5 · Configuration and Knowledge Management (12%)
| Objective | The move |
|---|---|
| Configure Projects | Four areas — instructions · knowledge · Skills · memory — sorted by what they are |
| Manage knowledge and connectors | A search is never proof of absence; narrow the scope; keep the citation rule |
| Create system-level instructions | One behaviour per line, testable, positively phrased, with owner and version |
| Maintain and update configurations | Superseded files leave the day they are replaced; golden tests catch decay |

### D6 · Governance, Risk and Responsible Use (15%)
| Objective | The move |
|---|---|
| Identify appropriate use cases | Screen: legality → data → impact on people → reversibility → disclosure |
| Apply data, regulatory, privacy considerations | Classify first; the classification determines the permitted surface and the gate |
| Follow AI policies and governance | Policy lives in the artefact and the access design, not in a PDF |
| Understand ethical implications | Fair representation of evidence; disclosure where authorship matters |

### D7 · Troubleshooting and Optimization (10%)
| Objective | The move |
|---|---|
| Diagnose and resolve poor output | Read the **timing** of the symptom before touching anything |
| Adjust approach from feedback | Cheapest fix first, one variable at a time |
| Optimise workflows | Measure → delete → simplify → reorder → automate; never delete a load-bearing control |
` },

{ id:"c3", title:"Decision trees: entry point · layer · tier", tag:"D3",
  md:`
These three questions answer most of Domain 3 and pre-answer parts of D4 and D7. Run them in this order every time.

### 1 · Entry point (four options, one decision)
~~~
Q1 REUSE   Will this instruction/knowledge be needed again, by me or anyone?
           no -> Chat                     yes -> Project
Q2 SOURCE  Is the answer in material I control?
           yes -> attach / Project knowledge
           no  -> research mode  (and cite everything it returns)
Q3 OBJECT  Will the output be edited, handed over, versioned or compared?
           no -> inline in the reply      yes -> Artifact
~~~
Answering Q1 wrong is the expensive mistake. A Project you never reuse is overhead; a chat you re-brief every day is a leak.

### 2 · Capability layer (what has to exist for this to work)
~~~
Model + prompt alone ............................. L1  yours
+ files, tools, config inside the product ........ L2  yours (with the admin)
Must act on a system / run unattended /
guarantee an audit trail .......................... L3  ESCALATE
~~~
**L3 trigger list — memorise:** write/send/delete/approve · scheduled or unattended · data outside the product · volume beyond human review · auditability by design · shared across departments · production model/context strategy · repeated failure after the whole fix ladder.

### 3 · Model tier (alignment, not preference)
~~~
1  Write the quality bar        "no number may need changing; tone matches approved copy"
2  What does a wrong answer cost?  cheap+internal -> down  |  external/irreversible -> up
3  What is the volume?          high volume, low judgement -> Haiku
4  Step up only on a NAMED failure
5  Extended thinking is a different dial from tier - it adds no grounding
~~~

| Tier | Reach for it when |
|---|---|
| **Haiku** | High volume, short, well-specified, cheap to recheck: replies, extraction to a schema, classification, triage |
| **Sonnet** | The default: business analysis, constrained drafting, mid-length documents, multi-step but bounded |
| **Opus** | Ambiguity with real stakes, reconciling conflicting sources, partner-level synthesis, rework dearer than tokens |

### 4 · Restart, summarise, persist (the fourth D3 objective)
| Signal | Meaning | Move |
|---|---|---|
| Contradicts an early turn; ignores an old rule | Context dilution | **Summarise** the state, **restart** the thread |
| Same correction needed again next week | It is durable | **Persist** into Project instructions (8.3) |
| Answer stopped mid-sentence | Output length | Split the request |
| Client replaced a source document | Not a context issue | Update Knowledge; **retire** the old file |
` },

{ id:"c4", title:"The five components & the decomposition patterns", tag:"D1",
  md:`
### The five components — and what each emptiness causes
| Component | Türkçe | Answers | Empty means |
|---|---|---|---|
| **Task** | Görev | What exactly, and done when? | An answer to a question you didn't ask |
| **Context** | Bağlam | For whom, why, what's already decided | Right tone for nobody |
| **Input** | Girdi | Which material am I giving you | **It invents.** #1 cause of fabrication |
| **Exemplar** | Örnek | What does good look like | The internet's average, polished |
| **Format** | Biçim | Structure, length, what stays verbatim | Unusable, and uncheckable |

Order of dependence is the order above. No exemplar rescues a prompt with no input.

### Symptom → component → smallest edit
| Output did this | Component | Smallest edit |
|---|---|---|
| Answered a different question | Task | One verb, one object, an explicit "done when" |
| Right facts, wrong register | Context | Who reads it, for what decision, what's locked |
| Invented a figure or citation | **Input** | Supply it, restrict to it, "if absent write 'not in sources'" |
| Correct but generic | Exemplar | One accepted output; mirror structure, not polish |
| Good content, wrong shape | Format | Container, columns, max length, verbatim fields |
| Ignores one rule repeatedly | Format/Context | Promote the rule to its own labelled line |
| Long and long, same value | Context | Cut. If it wouldn't change the answer, delete it |

### Iteration discipline
~~~
1 name the defect specifically      4 re-run on the SAME input
2 map it to one component          5 compare against the step-1 criterion
3 change ONLY that                   6 moved -> keep & log  |  not -> undo, next
~~~

### Decomposition: pick the pattern by the shape of the work
| Pattern | Use when | Its trap |
|---|---|---|
| **Pipeline** extract→analyse→draft | Material must be reduced before judgement | Steps drift into interpretation without an output contract |
| **Map–reduce** | Volume exceeds one pass (40 contracts, 200 tickets) | A merge with no rules averages everything into nothing |
| **Fan-out / compare** | You need options, or want to see disagreement | Selecting by "which reads best" rewards fluency |
| **Role split** drafter→critic | Quality over speed; verification is expensive | The critic is agreeable — give it a defect checklist |

**Split only if** you can't verify the whole output in one pass, it can fail in more than one independent way, or the material exceeds one faithful read. All three say no → one well-scoped prompt is the correct answer, and some items are testing whether you know that.

### Task type changes the instruction set
| Type | Say this | Because |
|---|---|---|
| Analysis | "State assumptions, then what would change your conclusion. Facts only from the attached material." | Conclusions must be traceable and falsifiable |
| Research | "Only these sources. Quote the exact sentence, name file and section. 'Not covered in sources' is a valid answer." | Prevents retrieval-shaped invention |
| Drafting | "Mirror this approved example's structure and length. Introduce no name, number or date absent from the input list." | Keeps verbatim fields alive |
| Brainstorming | "20 ideas across ≥6 categories. No ranking, no justification. Then group them, separately." | Generation and evaluation in one pass collapse the option space |
` },

{ id:"c5", title:"Discernment protocol · error patterns · review gates", tag:"D2",
  md:`
The heaviest domain, and the most transferable page here. Roughly thirteen items are the same five passes wearing different scenarios.

### The five passes, in order
| # | Pass | Ask | Do this | Fail signal |
|---|---|---|---|---|
| 1 | **Requirement** | Does it answer what was asked, for this audience, under our constraints? | Put the brief beside the output; tick each clause | Anything asked-for is missing |
| 2 | **Grounding** | Is every claim traceable to a source that exists and says that? | Open **3 random** citations — not the first three | One claim not in the source fails the pass |
| 3 | **Completeness** | What is *absent* that should be present? | Compare against the brief, the source inventory, the template, the reader's questions | Silent omission — reads as finished |
| 4 | **Consistency** | Does it agree with itself and what we know? | **Add the numbers.** Check names, dates, totals across the whole thing | A total that ≠ the sum of its parts |
| 5 | **Decide** | What happens next? | One of four, with a written reason | No record = no decision |

**The four outcomes:** use as-is (rare) · use with edits · re-prompt/re-run · escalate or stop. There is no fifth. "Ask Claude to double-check" is not one of them.

::warn the rule above all five | Confidence is not a signal. Never substitute the model's opinion of its own reliability for an external check — the official guide puts that option on the page as a distractor.

### Accuracy vs completeness — the dangerous cell
| | Accurate | Inaccurate |
|---|---|---|
| **Complete** | Ship | Caught by grounding checks |
| **Incomplete** | **The dangerous one.** Nothing on the page is wrong; the defect is off the page | Caught by any decent reviewer |

You cannot find incompleteness by reading. Build the coverage list *before* you ask, and require "none found in sources" instead of an omitted row.

### The eleven error patterns
| # | Pattern | 10-second tell |
|---|---|---|
| 1 | Fabricated citation | Open it *at that location* |
| 2 | Invented statistic | Search the supplied material for the number |
| 3 | Faulty arithmetic | Add the column. Always |
| 4 | Real source, wrong claim | Read the passage, not the pointer |
| 5 | Overgeneralisation | Count the evidence behind *all / every / consistently / never* |
| 6 | Constraint lost mid-answer | Grep for the locked item |
| 7 | Source contamination | Check provenance of each named item |
| 8 | Currency / stale | "As of when?" |
| 9 | Sycophantic shift | Did anything *I supplied* change? |
| 10 | Padding | Read headings and numbers only |
| 11 | Framing & selection bias | What would the other side put in this deck? |

Three families: **grounding** (1,2,4,8) · **structural** (3,5,6,10) · **trust** (7,9,11).

### Verification built into the prompt (so review gets cheap)
~~~
1 SOURCE RESTRICTION  facts only from these documents; no general knowledge for facts
2 VERBATIM FIGURES    file + section/row for every number; do not round; do not convert
3 PERMITTED DOUBT     if not answered here, write "not covered in sources"; never infer
4 RISK INVENTORY      before the deliverable list: ungrounded claims, unmet requirements,
                      assumptions made
5 NO SELF-SCORING     do not state a confidence level; do not assert that something is verified
~~~

### When human review is mandatory
Four criteria: **stakes · reversibility · audience · regulatory exposure**.
~~~
                    REVERSIBLE                 IRREVERSIBLE
low stakes       L0 self-check             L1 spot check (sample 1 in 10)
high stakes      L2 named sign-off         L3 dual sign-off + specialist (Legal/compliance)
~~~
A gate is real only if it has: **a named reviewer**, **evidence they can actually inspect**, and **the ability to say no**. A gate that can only delay is not a gate. And a 100% gate nobody can afford is worse than a designed sample, because it gets skipped.
` },

{ id:"c6", title:"Delegation map · workflow design · escalation", tag:"D4",
  md:`
### Delegate a step when five tests say yes
| Test | Yes when | No when |
|---|---|---|
| **Specification** | "Done" is checkable | Taste, relationships, unwritten context decide |
| **Repetition** | It recurs at volume | One-off; setup costs more than it saves |
| **Error cost** | Cheap and quick to catch | Client-visible, irreversible, load-bearing |
| **Verifiability** | A human checks faster than they produce | Checking needs the same expertise as doing |
| **Accountability** | A human can own the result | The step *is* the accountable act |

4 yes → delegate · 3 → delegate **with a gate** · ≤2 → keep it human, and say so out loud.

### Always stays human
Judgement under ambiguity · domain knowledge not in the sources · creative direction · relationships and trust · **accountability**: the signature, the approval, the decision.

### The map you must be able to draw
| Step | Owner | Mode | Feature | Tier | Gate |
|---|---|---|---|---|---|
| 1 Gather inputs | Human | — | folder | — | naming check |
| 2 Extract requirements | AI | Automation | Project + code exec | Haiku | spot check 1 in 10 |
| 3 Cluster + conflict log | AI + Human | Augmentation | artifact table | Sonnet | human resolves *every* conflict |
| 4 Draft analysis | AI + Human | Augmentation | Project (+research if external) | Sonnet | grounding pass |
| 5 Compute figures | AI via code | Automation | code execution | Sonnet | reconciliation + human recompute |
| 6 Write from verified figures | AI + Human | Augmentation | artifact | Sonnet→Opus | verbatim-figure check |
| 7 Decide the recommendation | **Human** | — | — | — | partner sign-off |
| 8 Send / present | **Human** | — | — | — | named reviewer (L2) |

Every AI row has a named feature, a tier and a gate. Rows 7–8 have no AI owner. A map where everything is "AI + human" is a shrug.

### Requirements from scattered inputs
Inventory → extract with tags → dedupe → **conflicts** → gaps and open questions.
Tags: **[VERBATIM] [INFERRED] [CONFLICT] [GAP]**, each with its source. Without the tags you have a plausible document concealing contradictions, which a client will find for you.

### Numbers in a plan: three tiers
| Tier | Rule |
|---|---|
| **Measured** | File, sheet, row; verbatim, no rounding, no unit conversion in prose |
| **Assumed** | Declared, with an **owner** and **what would falsify it** |
| **Derived** | Inputs + formula + result shown; **computed**, usually by code execution |
One-line test: point at a number, ask *which tier and where are the inputs?* Fifteen seconds, no answer → it's a decoration. Add a reconciliation partner (do the parts sum to the whole?) and a sanity bound (flag anything >2× last period).

### Design loop
**Define success criteria in numbers → draft design → run on 10–20 real items → measure against turn 1 → refine, then standardise.** If you cannot state which number should move and by how much, you are adopting a habit, not running a loop. Metrics that matter: cycle time · **rework rate** · **defect escape rate** · cost per accepted item · adoption.

### Escalate (name the trigger, not the frustration)
Act on a system · unattended or scheduled · needs data outside the product · volume beyond human review · auditability/retention by design · shared across departments · production model and context strategy · repeated failure after the full fix ladder.
**A good escalation** = the step, the measured result, what you tried in ladder order, and the capability you believe is missing. That gets a design; "Claude isn't working" gets a meeting.

### Communicating to stakeholders — four sentences
Value, quantified in their numbers → limits, each paired with the control that covers it → the map, showing what stays human → one explicit ask. Never over-promise; never risk-dump; never let an AI step go undisclosed where authorship matters.
` },

{ id:"c7", title:"Projects · connectors · maintenance", tag:"D5",
  md:`
### The four areas of a Project — and the sorting rule
| Area | Holds | Does not hold |
|---|---|---|
| **Instructions** | Standing *behaviour* rules: grounding rules, house style, verbatim fields, escalation triggers, what to do when data is missing | Client facts; anything weekly; one-off asks |
| **Knowledge** | Documents that must be **cited**: briefs, contracts, definitions, approved exemplars, this cycle's data | Another client's material; superseded files |
| **Skills** | Reusable *procedures* with steps — a report, a format, a check | Anything unowned, unversioned or unreviewed |
| **Memory** | Durable, correct, non-secret conventions | Confidential facts; transient facts; anything you'd rather not be questioned about |

~~~
RULE about how to work        -> Instructions
DOCUMENT that must be cited   -> Knowledge
PROCEDURE that runs in steps  -> Skill
FACT that should just be known-> Memory
ONE-OFF request               -> the chat
~~~
**Behaviour versus evidence.** A metric definition in instructions is an unverifiable paraphrase; in Knowledge it has a source and a version. Conversely "never round figures" in a document applies only when retrieved — so it applies nowhere.

### Instruction lines that survive
One behaviour per line · testable · positively phrased (state what to do instead) · short, non-negotiables first · owner + version + date · always says what to do when it can't.

### Isolation: one Project per client
Isolation follows the **confidentiality boundary**, not the org chart. Separate Projects turn cross-contamination from a matter of individual attention into a matter of access rights — and access rights are auditable. Reusable method across clients → a **template** you duplicate, or a reviewed Skill. Never a shared working Project, and never "add an instruction to keep them separate": **instructions do not create access boundaries.**

### Connector limits — the six, and the mistake each prevents
| Limit | Prevents |
|---|---|
| Permission scope = the authorising identity | Assuming a shared connector means team-wide visibility |
| Index latency | "The file doesn't exist", one hour after it was saved |
| **Search is not exhaustive** | Treating *nothing found* as *nothing there* — the most examinable limit |
| No authority | Citing the most similar file rather than the current one |
| Format blind spots | Believing a document is unreadable because a search missed the figure inside it |
| Connections outlive roles | Access persisting after the engagement ends |

A connector changes **where** the answer comes from; it never changes whether you must **verify** it. Keep the citation rule. Manage it with four answers: which data is allowed · who authorised it and does that still match their role · what is logged and who reads it · how fast it is revoked. Narrow the scope to one client folder: better precision *and* smaller blast radius.

### Decay — what goes stale, how fast, first symptom
| What | Cadence | First symptom |
|---|---|---|
| Knowledge files | On each superseding document, immediately | Last quarter's figure, confidently cited |
| Definitions | Quarterly | Answers correct per an old definition |
| Instructions | Quarterly + after product changes | A rule "ignored" because a later rule contradicts it |
| Memory | After anything surprising | A confidently wrong standing fact nobody wrote down |
| Skills | Per process change | Output following a procedure nobody follows |
| Connectors | Monthly access review | Reach into material the scope shouldn't include |

**Five practices:** version + date every block · change log *with reasons* · **3–5 golden test cases** per Project, run after any change · review memory deliberately · **retire, don't archive** — superseded files must leave the retrievable set.

::warn cautionary tale | A Project line reading *"figures verbatim, except percentages, which may be rounded"* is a licence, not a typo. Configuration without a change log is how a mistake becomes a policy.
` },

{ id:"c8", title:"Governance: screening · classification · Skills", tag:"D6",
  md:`
### The line that decides most D6 items
|  | Decision **support** | Decision **making** |
|---|---|---|
| Output | options, evidence, summaries, a ranked view with reasons | the verdict: approve, reject, score, hire, price, discipline |
| Accountability | a human who saw the evidence | nobody — and that is disqualifying |
| Verdict | fine, with gates | blocked or restricted; often by law as well as policy |
A model cannot be cross-examined about its reasoning or corrected in advance. It can inform the person who can. **A manager approving an opaque score is still an automated decision wearing a signature.**

### Screen a use case in five gates — stop at the first red
**1 Legality** → **2 Data** → **3 Impact on people** → **4 Reversibility & reach** → **5 Disclosure.**
Three verdicts: **Go** (say why) · **Go with controls** (named owner, gates, log, cadence) · **No / escalate** (with the alternative that meets the underlying need). "No" plus an alternative beats a veto; "skip the analysis entirely" is a distractor in the official sample set.

### Classification determines the checkpoint
| Level | Examples | Where it may go | Controls |
|---|---|---|---|
| Public | published report, marketing copy | any approved tool | normal editorial review |
| Internal | SOPs, notes, internal analysis | firm tools, standard Project | grounding + light review |
| Confidential | client strategy, deal terms, M&A | **only** that client's isolated Project | named sign-off, no cross-client material |
| Restricted | personal data, account numbers, HR records | not to third-party systems unless the clause allows; otherwise only after redaction | redact/anonymise **before** upload, Legal/DPO where required, logged, L3 review |
Sequence: **classify → check the governing clause → can it be reduced? → read the row → write the record.** The reduction step rescues most blocked requests: aggregate, pseudonymise, redact, or ask a narrower question.

::warn the four ways people think they have controlled this | ✗ "upload as-is, it's internal" · ✗ "tell Claude not to retain it" · ✗ "add an instruction never to reference the other client" · ✗ "delete it after". **An instruction is not a control.** Controls are what enters the window and what access you granted.

### A Skill is software
Before enabling, you must answer: who **owns** it · what it may **read** · where it may **write** · where its logic came from · whether anyone tested it on a case its author didn't pick · its **version** and change process · whether it is a route for **data out** (exfiltration) or **instructions in** (prompt injection from a document inside the workflow).
Process: register → review at the depth the reach demands → test on the unchosen case → version with reasons → enable only where needed → **retire when the process underneath changes**. A Skill that still runs after its process changed is a lie with a schedule.

### Upload pre-flight — seven checks
Contents (read it; a file is not its filename) → **highest classification present** (one restricted column restricts the file) → governing clause → necessity → **reducibility** → destination (which Project, whose account) → authority. Then log: file · level · decision · approver · date.

### Ethics in ordinary outputs, and policy as habit
Seven hiding places: cherry-picked evidence · silent sample bias · missing stakeholders · precision theatre · unfair characterisation of a subject · undisclosed AI involvement where it matters · over-trusting inferences about people.
Policy only works when it is **in the artefact** (every template has fields: *sources · inferred · not covered · AI-assisted · reviewed by · classification*), **one screen not a handbook**, **mechanical where possible**, **named**, and **reviewed for whether the control works** — not merely whether it exists.
` },

{ id:"c9", title:"Diagnosis · fix ladder · exam-day traps", tag:"D7 + exam",
  md:`
### Read the timing first
| Timing | Rules in | First move |
|---|---|---|
| Wrong every time, from the start | Prompt or sources are structurally missing something | Repair one component; check whether input was supplied at all |
| Fine at turn 1, degrades by turn 5 | Context dilution; buried constraints | Restate at the top, or restart with a summary |
| Worked for months, now doesn't | **Something changed** | Walk the change list — not the prompt |
| Only on this client / document type | A property of the input | Compare inputs; find what the failing one lacks |

**"Worked then stopped" change list, in order of culpability:** knowledge files (swapped/renamed/not removed) → instructions (a newer rule now contradicts it) → memory (a wrong fact got persisted) → connectors (permission, scope, account, index) → model tier or settings → product update → the input's own format.

### Cheapest fix first
~~~
1 restate and clarify, in the same thread          6 move it into configuration (Project/instructions)
2 repair ONE prompt component                       7 change entry point or add a tool
3 fix the INPUT - right file, delimited, narrow     8 change model tier / thinking budget
4 restart the thread with a summary carried over    9 split the workflow into steps
5 change the FORMAT contract                        10 escalate to Developer / Architect
~~~
Two rules underneath: **one variable at a time, re-run on the same input**; and **never pay for an expensive fix before a cheap one has failed** — because an expensive fix that works teaches you nothing reusable. Legitimate jumps: a safety or policy breach (stop) · a confirmed product outage (report and work around) · a cause already recorded in your fix log (apply the known fix).

### Save the fix — three outputs every time
| Output | Where |
|---|---|
| The **rule** — one testable sentence | Project instructions, or the shared source of truth |
| The **exemplar** — the accepted output | Project knowledge, labelled as an example |
| The **test** — a case that would have caught it | The golden test set (6.4) |
Six-line log: date · issue · symptom · cause · fix · test · owner/version/review. Save at the moment it works, and attach it to the **artefact**, not the person.

### Optimise without transferring risk
Measure → **delete** → simplify → reorder → automate → optimise the automation. Metrics: cycle time · rework rate · **defect escape rate** (the only one that measures your review) · cost per accepted item · adoption. Make controls **cheaper**, never absent; "leave it alone" is a legitimate audit finding; and automating a step that exists only because an upstream defect does is how you get a fast wrong workflow.

### The exam trap catalogue
| Pattern | Why it's wrong |
|---|---|
| "Ask Claude to rate its own confidence / verify its own output" | Self-assessment is never a validation method. It appears as a distractor in the official guide |
| "Send it; verify afterwards if needed" | Right instinct, wrong order — the send is the irreversible act |
| "Reword it to sound more formal/professional" | Presentation never touches correctness; it hides the defect better |
| "Skip the analysis / refuse entirely / never use AI here" | Over-correction, and almost always wrong when a control exists |
| "Disable product features to reduce cost" | Removing capability is not trade-off management |
| "Switch to a more capable model" (early) | Buys capability, not grounding — and destroys the diagnosis |
| "Add an instruction not to do X" | An instruction is not an access, retention or capability control |
| "Upload it; it's internal" | Internal use does not cure a policy or contractual restriction |
| "Escalate to a Developer" (early) | Skipping the ladder to an expensive queue; check the layer first |
| "Remove the review step; errors have stopped appearing" | Absence of complaint ≠ absence of error — there's no escape measure |
| "Have a manager approve the model's score" | Approval of something uninspectable is rubber-stamping |
| Multi-select: "select all that apply" you read as "select the best one" | Each item states how many responses to select. **Read the number** |

### Exam-day checklist
Government photo ID, unexpired, **name matching the registration exactly** · accommodations approved *before* scheduling · cancel/reschedule up to **24 h** · clear desk, no notes, no phone, no second monitor, no talking · webcam in view throughout if online · NDA accepted before start (declining ends the session with no refund) · never capture or discuss item content — it can void your result and your credential.
**Pacing:** ~2 min/item. Answer everything, flag the doubtful ones, return with the minutes you saved. Re-read the required response count on every multi-select. There is no partial-credit bonus for leaving one blank — pick the third-best defensible answer.
` }
];
