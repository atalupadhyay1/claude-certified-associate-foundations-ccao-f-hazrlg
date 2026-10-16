/* Curriculum — Section 5 */
window.CCAO = window.CCAO || {};
window.CCAO.curriculum = window.CCAO.curriculum || { sections: [] };
var S = window.CCAO.curriculum.sections;

S.push({
  id: "s5", num: 5, minutes: 28, domain: "D4",
  tr: "İş Akışı Entegrasyonu ve Çözüm Tasarımı",
  en: "Workflow Integration and Solution Design",
  blurb: "Domain 4, 16%, about ten items. Getting from 'I used Claude once' to 'the team has a process, and it survives an audit'.",
  quiz: "q5",
  lessons: [
    { id: "l5-1", ref: "5.1", mm: "5:53", dom: "D4",
      tr: "Dağınık Girdilerden Gereksinim Çıkarmak",
      en: "Deriving Requirements from Scattered Inputs",
      objective: "Apply Claude to analyse requirements and use cases.",
      body: `
Real requirements do not arrive as a document. They arrive as a call transcript, three emails, an outdated SOP, a complaint log, and something the client said in a meeting nobody minuted. Claude is genuinely good at this and genuinely dangerous at it, because synthesis is exactly where invention becomes invisible.

### [how] The five-move sequence
| Move | What you ask for | The discipline that makes it safe |
|---|---|---|
| **1. Inventory** | List every source you were given, with what it appears to cover | Explicit, so silence later means "no relevant content", not "not read" |
| **2. Extract** | Every requirement as a short statement, **with the source it came from** | A verbatim-or-inferred label on each one |
| **3. Deduplicate and cluster** | Merge duplicates, group into themes | Merging must name both originals, or a nuance dies in the merge |
| **4. Conflicts** | Where do two sources disagree? | The highest-value output, and the one models most often smooth over |
| **5. Gaps and open questions** | What must a human decide because no source answers it? | Phrased as questions a named person can answer |

### [fact] The verbatim / inferred contract
This is the whole lesson in one notation:

~~~
R-07  [VERBATIM] "Weekly variance report, Friday 10:00."   <- source: Ardan brief, para 4
R-08  [INFERRED] Report is read by the CFO, not the board.  <- from para 4 + the 2019 deck; CONFIRM
R-09  [CONFLICT] Brief says Friday 10:00; KPI email says Monday. UNRESOLVED -> ask Ardan
R-10  [GAP]      No stated definition of 'variance'.        -> open question for Selin
~~~

A requirement list with those four tags is a document a human can sign. Without the tags it is Claude's guess about what everyone meant, wearing your client's vocabulary — and it will be treated as authoritative in the next meeting. That is how a fabricated *requirement* becomes more expensive than a fabricated statistic: the statistic gets caught in review, the requirement becomes the basis of the review.

### [how] Using Claude as the analyst, not the author
- Ask for the **question list** before you ask for the requirements document. A good open-questions list is a better early artefact than a complete-looking specification
- Ask it to mark **what it would need to see** to close each gap — that turns vagueness into a shopping list
- Ask for **the two readings a reasonable person could disagree about**, so ambiguity surfaces in week one instead of week six
- Never let it write acceptance criteria you have not verified. Criteria are what the whole design is measured against (5.3); invented criteria measure nothing

### [case] Meridian
Deniz lifts the freeze on one condition: no AI-assisted engagement proceeds without requirements a partner has signed. Mert runs the five moves over eleven scattered inputs for Ardan and produces 34 requirements, of which he marks 9 as inferred and 3 as conflicts. Two of the conflicts were real and would have been discovered by the client, in a review, at the worst moment. The three gaps become the agenda of a 25-minute call that closes the whole scope. The number to notice: the value was not in the 25 verbatim requirements — those were already known. It was in the 12 that nobody had written down anywhere.

### [trap] Item shapes here
- "Ask Claude to produce the full requirements document from the meeting notes" — skips the tagging and the conflicts question, so a plausible document conceals contradictions
- A requirements list without sources, offered as the tidy answer
- Treating "clarify with the client" as a delay to be avoided. Going back to the source is usually the mature answer, and it is nearly always the answer when the scenario says a stakeholder's intent is unclear

### [do] Take one project with messy inputs. Run moves 1, 2 and 4 only — inventory, tagged extraction, conflicts. Stop there. Done properly you now have a meeting agenda and no document yet, which is the correct order.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Requirement | gereksinim | One testable statement of what is needed |
| Verbatim vs inferred | aynen aktarılmış / çıkarılmış | The tag that keeps invention visible |
| Conflict log | çelişki kaydı | Where sources disagree; resolved by a human, not by a model |
| Open question | açık soru | A gap with a named person who can close it |
| Acceptance criteria | kabul ölçütleri | The tests that say the work is done |
` },

    { id: "l5-2", ref: "5.2", mm: "5:27", dom: "D4",
      tr: "Hesaplanmış Rakamlara Dayanan Planlar",
      en: "Plans Grounded in Calculated Numbers",
      objective: "Leverage Claude for research, planning and process optimisation without letting it assert figures.",
      body: `
A plan is a set of numbers with a story attached, and generative models are good at stories and indifferent at arithmetic. The rule this lesson installs is short: **a figure in a plan must have been computed, not written**. This is the specific defence against the failure that froze Meridian.

### [fact] The three-tier number classification
| Tier | Examples | Rule |
|---|---|---|
| **Measured** — from a source | headcount 412; Q3 revenue; survey n = 1,204 | Cite file, sheet, row. Reproduce verbatim: no rounding, no unit conversion inside prose |
| **Assumed** — declared by a human | "6-week rollout"; "15% response rate" | Listed as an assumption, **with who owns it** and what would falsify it |
| **Derived** — computed from the two above | cost per site = headcount × rate × licence price | Must show inputs, formula and result. If the formula can't be shown, it isn't derived — it's invented |

::tip the one-line test | Point at any number in the plan and ask: *which tier, and where are the inputs?* If nobody can answer in fifteen seconds, the number is a decoration. That is the entire check — four minutes for a whole deck.

### [how] Making Claude earn its figures
- **Route arithmetic through code execution, not through prose.** For anything beyond one-step arithmetic, ask it to write and run code over the attached data and return the table it computed. Then verify the *inputs and the formula*, not the answer
- **Never ask for "an estimate of the impact" without supplying the basis.** Ask instead: "list the inputs you would need, then compute from the attached file"
- **Separate calculation from narrative.** Build and verify the numbers table first, then say *write the commentary using only figures that appear in this table*. A number introduced in prose is a number nobody checked
- **Give every derived figure a reconciliation partner**: do the segments sum to the total; does FTE match headcount × hours; does plan cost match the price list
- **Sanity bounds are cheap.** "Flag any derived figure more than 2× the previous period" catches an order-of-magnitude error before the CFO does

### [how] A plan template that survives review
~~~
INPUTS (measured)   field | value | source file + location
ASSUMPTIONS         field | value | owner | what would falsify it
DERIVED             formula | inputs used | result | reconciliation check
SENSITIVITY         result if the two riskiest assumptions move +/- 25%
OPEN                figures still required, and from whom
~~~

Sensitivity is the row that turns a plan from an assertion into a proposal: a stakeholder who can see that the number only holds if an assumption holds will argue with the *assumption* — which is the argument you wanted to have in week one.

### [case] Meridian
Elif's proposal to reorganise three offices around a shared operations desk arrived with "this would save roughly 20% of coordination time". Nobody could say what the 20% was 20% *of*. Rebuilt under the rule above: measured input = 1,480 hours/month logged in ticketing (file, tab, month range); assumption = 12% of that time is cross-office hand-off, owned by Mert, falsifiable by a two-week sample; derived = 178 hours/month with the formula shown; sensitivity at ±25%; reconciliation = the three offices' hours must sum to the total — which they didn't, which is how a duplicated ticket queue was found. The saving is now 178 hours a month. Worth less on paper than "20%", worth infinitely more in the meeting.

### [do] Open the most recent plan with numbers in it. Classify every figure into the three tiers. Count how many were labelled *derived* and cannot show a formula. That count is your exposure — and it usually has very little to do with whether a model wrote the document.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Measured / assumed / derived | ölçülen / varsayılan / türetilen | The three tiers every figure must be sorted into |
| Reconciliation | mutabakat | Do the parts sum to the whole |
| Sensitivity analysis | duyarlılık analizi | What happens if the assumption moves |
| Code execution | kod çalıştırma | Computing the number rather than asserting it |
| Order-of-magnitude error | mertebe hatası | The class of error a sanity bound catches |
` },

    { id: "l5-3", ref: "5.3", mm: "5:06", dom: "D4",
      tr: "Tasarım Döngüsü ve Üst Kademeye Taşıma Sinyali",
      en: "The Design Loop and the Escalation Signal",
      objective: "Use Claude to support solution design, development and iteration; recognise limits and escalate.",
      body: `
Domain 4 is not "make a workflow". It is *design it, prove it, and know the moment it has outgrown you*. The second half is explicitly examinable: the guide lists recognising limitations and escalating to Architects and Developers as a competency of the credential. Candidates who never escalate lose marks in a way they don't expect — "I'll just prompt harder" is a distractor, not grit.

### [how] The loop — five turns, and success criteria are written before turn one
| Turn | What happens | The mistake that kills it |
|---|---|---|
| **1. Define success** | Time per item, error rate, % needing rework, adoption, cost per item — as numbers, before you build | Deciding what "better" means after you have seen the result |
| **2. Draft the design** | Steps, owner per step, where Claude sits, where review sits | Designing around the tool instead of the process |
| **3. Run it on real work** | 10–20 real items, not a demo | Piloting on the one easy example — the pilot that flatters |
| **4. Measure against turn 1** | Same metrics, same definitions | Shipping the pilot because the team liked it |
| **5. Refine, then standardise** | Fix, then write it down (6.4 and 8.3) | Refining forever; or standardising the defect |

~~~
If you cannot state the number you expect to move, and by how much,
you are not running a design loop - you are adopting a habit.
~~~

### [fact] Escalation signals — name the trigger, not the frustration
An Associate escalates well when the *shape* of the request has left their layer (2.3). Each of these is a trigger:

| Signal | Why it is beyond Associate scope | Escalate to |
|---|---|---|
| Must act on a system — write, send, delete, approve | Needs integration, permissions, rollback | **Developer** |
| Must run unattended or on a schedule | Needs orchestration, monitoring, failure handling | **Developer + Architect** |
| Needs data outside the product (a database, an internal API) | Needs a connector/MCP build and a security review | **Developer** |
| Volume exceeds what a person can review reliably | Needs automated checks, sampling design, queues | **Architect** |
| Auditability, retention or logging must be guaranteed by design | Contractual and regulatory engineering | **Architect** + Legal |
| Two departments need the same capability | Reusable asset, ownership, access control | **Architect** |
| Model and context strategy at production scale | Cost and quality trade-offs at volume | **Architect** |
| Repeated failure after the whole fix ladder (8.2) | The problem is the system, not the prompt | **Developer** |

**What a good escalation looks like.** Not "Claude isn't working". It is: the step, the measured result, what you tried in ladder order, and the capability you believe is missing. An escalation written that way gets a design; the other kind gets a meeting.

### [case] Meridian
Mert's report automation is the case study in miniature. He built a monthly pipeline in chat; it works; then it must run while he is on leave, then post into the client's portal, then be evidenced against a contractual deadline. At the first signal he escalates. What he hands over is a paragraph — *step 4 needs write access to the client portal, 12 items a month, currently 100% human-checked, and the contract requires a retained audit trail* — and what comes back is a properly scoped L2 configuration plus an L3 ticket with an owner. What he does **not** get is a chat window that magically sends email. Escalating early is also what keeps Deniz's post-freeze promise intact: controls designed in, not retrofitted after the next incident.

### [do] Take the workflow you are happiest with and fill three cells: success criterion, measured value now, target. If you cannot fill the middle one, you have a habit, not a design — go run ten real items through it this week and count. Then write the escalation paragraph for the one step that needs to act on a system.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Success criteria | başarı ölçütleri | The pre-agreed numbers the design must move |
| Pilot | pilot uygulama | Running it on real work, small, before standardising |
| Escalation | üst kademeye taşıma | Handing over work that has left your layer |
| Orchestration | orkestrasyon | Sequencing automated steps unattended |
| Rollback | geri alma | The ability to undo an action the system took |
` },

    { id: "l5-4", ref: "5.4", mm: "6:20", dom: "D4",
      tr: "Görev Devri Haritası",
      en: "The Task Delegation Map",
      objective: "Map workflows by delegation criteria and name the feature belonging to each AI step.",
      body: `
Delegation is the first of the 4Ds, and the exam's phrasing is "integrate Claude into existing workflows to augment or redesign them". The deliverable of good delegation is a table. If you can produce this table you can answer most D4 items — and the *second half of the objective*, naming the feature per step, is what separates a map from an opinion.

### [how] Hand off a step when five tests say yes
| Test | The question | It fails when |
|---|---|---|
| **Specification** | Can the step be described precisely enough that "done" is checkable? | It depends on taste, relationships or unwritten context |
| **Repetition** | Does it recur, at volume? | It's one-off; the setup costs more than it saves |
| **Error cost** | If it's wrong, is that cheap and quick to catch? | It's client-visible, irreversible, or load-bearing for a decision |
| **Verifiability** | Can a human check the output *faster than* doing the step? | Verification needs the same expertise as production |
| **Accountability** | Is there a human who can own the result? | The step *is* the accountable act — approving, signing, disciplining, deciding |

Four yes → delegate. Three → delegate with a gate (4.5). Two or fewer → keep it human and say so out loud; "not this one" is a complete and respectable design answer.

### [fact] What stays human, by category
- **Judgement under ambiguity** — where the criteria themselves are contested
- **Domain knowledge not in the sources** — the client's politics, the regulator's temperament
- **Creative direction** — deciding what to make, as opposed to making variants
- **Relationships and trust** — the apology, the negotiation, the difficult conversation
- **Accountability** — the signature, the approval, the decision. Always

### [how] The map, with the feature named per step
| Step | Owner | Mode | Feature | Tier | Gate |
|---|---|---|---|---|---|
| 1. Gather client inputs | Human | — | Shared folder | — | naming check |
| 2. Inventory and extract requirements | **AI** | Automation | Project (Ardan) + code execution for tables | Haiku | spot check 1 in 10 |
| 3. Cluster + conflict log | AI + Human | Augmentation | Same Project, artifact table | Sonnet | human resolves *every* conflict |
| 4. Draft the analysis | AI + Human | Augmentation | Project; research mode only where external facts are needed | Sonnet | grounding pass (4.1) |
| 5. Compute figures | **AI via code** | Automation | Code execution over the attached workbook | Sonnet | reconciliation + human recompute |
| 6. Memo from verified figures | AI + Human | Augmentation | Artifact | Sonnet → Opus if sources conflict | verbatim-figure check |
| 7. Decide the recommendation | **Human** | — | — | — | partner sign-off |
| 8. Send / present to client | **Human** | — | — | — | named reviewer, L2 (4.5) |

Read that as the template for *your* workflow. What matters: every AI row has a named feature, a tier and a gate; and rows 7–8 have no AI owner at all. A map where every step reads "AI + human" is not a map, it is a shrug.

::tip the exam's favourite trap here | **Augmenting a bad process.** Automating a step that should not exist produces a faster wrong workflow. Some items ask what the associate should do *first*, and the answer is sometimes "remove the step" — measure (5.3), optimise (8.4), automate last.

### [case] Meridian
The map above is Selin's, drawn after the freeze, and it is what unblocked her — because Deniz's condition was never "no AI", it was "show me the map". Two things surfaced that nobody had said out loud: step 5 had for eighteen months been done by a human's mental arithmetic (the real origin of the fabricated number was partly this, not the model), and step 3's conflicts had been resolved by whoever happened to notice, which is not an owner. Reopening AI use turned out to be less about the tool than about writing down who does what.

### [do] Draw this for one real workflow, six to ten steps, including the two human-only rows you are tempted to leave out. If you cannot name a feature for an AI row, that row is not delegable yet.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Delegation criteria | görev devri ölçütleri | Specifiable · repetitive · cheap-error · verifiable · ownable |
| Hand-off | devir | The point where work changes owner |
| Gate | kontrol noktası | A checkpoint that can stop the item |
| Ownership | sahiplik | The named human accountable for the step's output |
| Redesign vs augment | yeniden tasarım / destekleme | Change the process, or accelerate the existing one |
` },

    { id: "l5-5", ref: "5.5", mm: "5:39", dom: "D4",
      tr: "Değeri ve Sınırları Anlatmak",
      en: "Explaining the Value and the Limits",
      objective: "Communicate Claude's value and limitations to stakeholders.",
      body: `
The last objective of Domain 4, and the one candidates under-prepare because it feels like a soft skill. It is scored because organisations are damaged by over-promising more often than by under-using. Note the pairing: value **and** limitations. Either alone is a failing answer.

### [how] Translate the same facts for each audience
| Stakeholder | Their actual question | Lead with | Do not |
|---|---|---|---|
| **Executive / partner** | What does this change for the business, and what could it cost us? | A number, a risk, and the decision you need from them | A feature tour |
| **Risk / Legal / Compliance** | What data leaves the building, who is accountable, what stops a bad output? | The classification, the gates, the audit record | "It's fine, it doesn't train on our data" — never assert a policy you have not read |
| **The team doing the work** | What changes in my day, and what am I now blamed for? | The map (5.4), the review load, what stays human | Implying the tool replaces their judgement |
| **The client** | Did you check this? Is this yours? | What was verified, by whom, against what | Silent AI-washing — or theatrical over-disclosure of trivia |

::tip the structure that works | One sentence of value, quantified. One sentence of limits. One sentence of controls. One explicit ask. Four sentences. Every audience tolerates a five-minute version of that far better than a thirty-minute demo.

### [fact] Naming limits without killing the proposal
State the limit *with the control that covers it*, in the same breath:
- "It fabricates specific-looking citations on legal text → every citation gets opened before it leaves the room; costs about 15 minutes per deck"
- "It cannot see anything not in the Project → the Project is the scope; anything outside is a human task"
- "It is not accountable → a named reviewer signs, and signing means they checked"
- "Long threads drift → we restart rather than argue with it"
- "It agrees with me when I push → so I ask for the strongest objection to my own view"

A limit stated alone reads as a risk to avoid. A limit stated with its control reads as an operating procedure — which is the only thing a decision-maker can approve.

### [how] Three failure modes, and the first two are symmetric
| Failure | Sounds like | Why it fails |
|---|---|---|
| **Over-promising** | "It'll handle the whole inbox, no review needed" | Unfalsifiable, and the first error destroys trust in the tool *and* in you. Meridian's freeze is the textbook cost |
| **Over-disclosing** | "We use AI in 14 places, with 9 caveats" | Turns a decision into a risk dump; the room hears only the caveats and refuses the whole thing |
| **AI-washing** | saying nothing about how it was made | Presenting AI output as unaided human work where authorship matters. An ethics failure (7.5) *and* a reliability one: an undisclosed AI step is an unaudited step |

### [case] Meridian
Selin has twenty minutes with Deniz to reopen AI use for client work. She does not bring a feature list. She brings: **(1)** value in the firm's own numbers — 6 hours a week per analyst on extraction, about 250 hours across three offices a year; **(2)** limits, each with its control — fabrication against citation verification, drift against restarts, confidentiality against one Project per client; **(3)** the map, showing recommendations and client contact remaining human; **(4)** one ask — that review time is *budgeted*, not expected to be absorbed. She closes with the sentence this whole section exists for: *"the saving is in drafting; the cost is in verification; both are real, and the second is what makes the first safe to have."*

### [do] Write your four sentences for the next AI proposal you make. Then check sentence two: does every limitation you named come with a control, and is that control someone's actual job? If not, you have described a hope, not a plan.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Stakeholder | paydaş | Anyone who can stop you, or must live with it |
| Over-promise | aşırı vaat | Claiming capability the controls do not cover |
| AI-washing | yapay zekâyı gizleme | Presenting AI output as human work where it matters |
| Control | kontrol / önlem | The thing that makes a named limit acceptable |
| Ask | talep | The specific decision you need from the room |
` }
  ],
  assignment: {
    ref: "Ödev 4",
    tr: "Bir iş akışını üç ölçüte göre adım adım haritalayın",
    en: "Map a workflow step by step against three criteria",
    brief: `**The workflow.** Meridian's monthly client KPI pack, currently fully manual across three offices: gather client CSVs → clean and reconcile → compute 12 metrics per client → draft the commentary → senior associate reviews → PDF to client. Two hours per client per month; last month one metric was wrong and the *client* found it.

**Your task.** Map it step by step against **three criteria only**: (a) who owns the step, (b) the mode — automation, augmentation or agency, and (c) the review gate. Add the feature and the tier if you like; they are not marked here.

| Step | Owner | Mode | Gate | Why that gate and not another |
|---|---|---|---|---|
| 1. Gather CSVs | Human analyst | — | Naming and folder check | Low stakes, reversible, cheap |
| 2. Clean and reconcile | **AI + code execution** | Automation | Row count + reconciliation, spot-checked 1 in 3 clients | Volume, specifiable, cheap to verify — and reconciliation *is* the check |
| 3. Compute 12 metrics | **AI via code** | Automation | Formula shown; human recomputes 2 of 12 | Derived figures must be computed (5.2). 100% review is not the answer; a designed sample is |
| 4. Draft commentary | AI + Human | **Augmentation** | Verbatim-figure check against step 3's table | Tone and judgement both matter; only the drafting is delegated |
| 5. Review | Human senior associate | — | Named sign-off | The next step is irreversible and client-facing |
| 6. Send PDF | Human | — | Second pair of eyes on page 1 and on totals | An irreversible external act; the accountable act is never delegated |

**Where marks are lost.** (i) Putting AI anywhere in step 5; (ii) giving step 3 a 100% human gate and then not having capacity for it — an unaffordable gate is a gate that gets skipped, which is worse than a designed sample; (iii) naming automation for step 2 while leaving reconciliation to a human doing it in their head; (iv) an answer where every step is "AI + human".

**The follow-up question — the one that decides your grade here.** Which step should be *deleted* rather than delegated? Scoring answer: step 1's variant handling. Three offices name the same client three different ways, and that is the origin of last month's error. Fix the process — one naming convention in the Project — rather than accelerating the defect. Automating a bad step is Domain 4's classic trap.`
  }
});
