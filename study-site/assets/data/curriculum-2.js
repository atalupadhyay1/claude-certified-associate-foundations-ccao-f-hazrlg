/* Curriculum — Sections 3 & 4 */
window.CCAO = window.CCAO || {};
window.CCAO.curriculum = window.CCAO.curriculum || { sections: [] };
var S = window.CCAO.curriculum.sections;

S.push({
  id: "s3", num: 3, minutes: 26, domain: "D1",
  tr: "İstem Yazımı ve Görev Yürütme",
  en: "Prompting and Task Execution",
  blurb: "Domain 1, 14%, about eight items. A structure, a way to split, a way to repair, and a strategy per task type — in that order.",
  quiz: "q3",
  lessons: [
    { id: "l3-1", ref: "3.1", mm: "6:41", dom: "D1",
      tr: "Beş Bileşenli Yapı",
      en: "The Five-Component Structure",
      objective: "Create effective prompts for business and technical tasks.",
      body: `
"Prompting" is an unhelpful word because it suggests phrasing. Phrasing barely matters. What matters is whether the five slots are filled — because each slot is a different way for the output to be wrong, and an empty slot is a defect you scheduled in advance.

### [fact] The five components
| # | Component | Türkçe | The question it answers | If you leave it empty |
|---|---|---|---|---|
| 1 | **Task** | Görev | What exactly do you want, and what counts as done? | You get an answer to a question you didn't ask, in a shape you didn't want |
| 2 | **Context** | Bağlam | Who is this for, why, under what constraints, what's already decided? | Generic, audience-blind prose; the tone is right for nobody |
| 3 | **Input** | Girdi | Which material am I actually giving you to work on? | It invents. This is the number-one cause of fabricated content |
| 4 | **Exemplar** | Örnek | What does good look like here? | "Good" reverts to the statistical average of the internet |
| 5 | **Format** | Biçim | What structure, length, fields, tone, and what must appear verbatim? | Unusable without rework; and you can't check what has no shape |

::tip the order is the point | Task → Context → Input → Exemplar → Format is also the order of *dependence*: the format can't be judged until the task is fixed, and no exemplar rescues a prompt with no input.

### [how] Writing each one so it actually holds
- **Task** — one verb, one object, one success test. *Not* "help me with the Ardan numbers". Instead: "Compare Q2 and Q3 revenue by segment in the attached file and list only the segments where the change exceeds 5%."
- **Context** — the four facts that would change an outsider's answer: audience, purpose, decision it feeds, constraint already locked. If a fact wouldn't change the answer, cut it; context is not decoration and long prompts dilute.
- **Input** — supply it, delimit it, and label it. Say which parts are evidence and which are background. An unlabelled paste invites the model to treat your notes as sources.
- **Exemplar** — one good past output beats three adjectives. Show *structure* more than polish; polish is what it will imitate and structure is what you need repeated.
- **Format** — name the container (table, memo, checklist), the columns, the maximum length, and what must appear *verbatim* (numbers, clause references, names). "Numbers as they appear in the source, do not round" is a format rule that prevents an accuracy failure — that overlap is why this lesson is in Domain 1 but saves you marks in Domain 2.

~~~
TASK      Compare Q2 vs Q3 revenue by segment; list segments with >5% change.
CONTEXT   Audience: Ardan's CFO, in a 20-minute review. Feeds the H2 forecast note.
          Constraint already locked: no headcount commentary. Two offices merged in Q3 —
          the split is not comparable, say so rather than adjusting it.
INPUT     Attached: ardan_q2_q3_segment.xlsx. Treat only the 'Approved' tab as final;
          'Draft' is for context and must not be cited.
EXEMPLAR  Use the format of last quarter's 'Segment variance' block (pasted below).
FORMAT    Markdown table: Segment | Q2 | Q3 | Change | Note. Then at most three bullets,
          each under 25 words. Reproduce figures verbatim; no rounding. No closing summary.
~~~

### [trap] Four habits that cost marks
- **Adjectives instead of specifications.** "Professional, concise, insightful" is not a specification. Convert each adjective into a testable property: concise = at most three bullets under 25 words
- **The mega-prompt with everything except the material.** A prompt can be beautifully structured and still hallucinate because no input was supplied
- **Politeness and narrative** — "I hope you're doing well, we've had a hard quarter..." consumes context and adds no constraint
- **Burying the binding constraint mid-paragraph.** Put hard constraints in their own labelled line where they survive a long thread

### [case] Meridian
After the freeze, Deniz requires every AI-assisted deliverable to show what it was built from. Selin's five-component prompts are already half compliance evidence: the *Input* block names the sources, the *Context* block names the locked constraints, the *Format* block names what must be verbatim. The same prompt that gets a better first draft is the one that makes the review in 4.1 take ninety seconds instead of an hour — which is why Description and Discernment are taught as one system.

### [do] Take the prompt you used most this week. Number its five components 0–2 (0 absent, 1 present but vague, 2 explicit and testable). Rewrite only the lowest score. Do not touch the other four — that restraint is the subject of 3.3.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Component | bileşen | One of the five slots a complete prompt fills |
| Delimiter | ayraç | Marks (quotes, XML-ish tags, headings) that bound supplied material |
| Exemplar / few-shot | örnek | A worked example that sets the standard |
| Verbatim | aynen | Reproduce exactly; no rounding, no paraphrase |
| Success criteria | başarı ölçütü | The test that tells you the task was done |
` },

    { id: "l3-2", ref: "3.2", mm: "6:23", dom: "D1",
      tr: "Tek İsteme Sığmayan İşi Parçalara Ayırmak",
      en: "Splitting Work That Won't Fit One Prompt",
      objective: "Apply task decomposition techniques to structure complex requests.",
      body: `
Decomposition is not "make it simpler". It is *making each step verifiable*, because you cannot check a wall of text you have to re-read four times. The exam's objective is to apply decomposition *to structure complex requests* — the deliverable of decomposition is a sequence of checks, not a sequence of prompts.

### [how] Four patterns, chosen by the shape of the work
| Pattern | Structure | Use when | The trap |
|---|---|---|---|
| **Pipeline** (extract → analyse → draft) | Each step's output is the next step's input | The material must be reduced before it can be judged | Steps expand into free interpretation — pin each output to a format |
| **Map–reduce** | Same instruction per chunk, then merge | Volume exceeds the window: 40 contracts, 12 months of tickets | The merge step needs rules or you get an average of everything and a answer to nothing |
| **Fan-out / compare** | N independent variants, then a selection pass | You need options, or you need to see disagreement | Selecting by "which reads best" — select against criteria you wrote first |
| **Role split** (drafter → critic → reviser) | A critic pass against an explicit checklist | Quality matters more than speed, and you can't check it yourself cheaply | The critic is agreeable. Give it a defect list, not a latitude to praise |

### [when] Should this be split at all? Three tests
~~~
1  VERIFIABILITY   Can you check the whole output in one pass?      no  -> split
2  FAILURE MODES   Can it fail in more than one independent way?    yes -> split
3  MATERIAL        Does the input itself exceed what one pass can
                   hold faithfully?                                  yes -> map-reduce
If all three say no, splitting is overhead. A single well-scoped prompt is the correct
answer to more exam items than candidates want to admit.
~~~

::warn the trap the exam sets | Decomposition is a *scored objective*, so expect an item whose scenario is a 90-page document and a four-part request. The wrong options will include one giant prompt and — more seductively — splitting it into twenty micro-steps that each need you to re-establish context. The right answer splits along the *natural seams* of the work, usually three to five steps.

### [how] Rules that keep a chain from drifting
- **Restate the constraints at each step**, not only at the first. Context degrades (2.1) and a chain of eight turns inherits that degradation
- **Pass forward the material, not only the conclusion.** If step 3 relies on a number from the source, carry the source quote into step 3 or the number becomes a rumour
- **Give every step an output contract.** Fixed shape = checkable = catch the failure at step 2 instead of step 6
- **Checkpoint between steps.** A one-line "what did I decide and on what evidence" per step is what makes the whole chain auditable — the same property Deniz demands
- **Never let a step summarise away a number or a citation.** Compression is where provenance dies

### [case] Meridian
Selin originally asked for one thing: "analyse the Ardan data and draft the board memo". It produced a fluent memo with three unverifiable figures and no way to see which were invented. Restructured as four steps — **(1)** extract the segment table from the approved tab only, with row counts; **(2)** compute variance with inputs, formula and result shown; **(3)** draft findings bullets, each carrying its source cell; **(4)** draft the memo *from those bullets only* — the same work took marginally longer and became reviewable at every stage. Step 3 is the one that killed the fabrication: a bullet that can't cite its cell gets dropped there rather than reaching a client.

### [do] Find the biggest prompt you own. Mark the seams where a human would naturally check. That is your step count. If you got one step, you haven't finished the exercise; if you got more than six, you've turned one prompt into a project.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Task decomposition | görev ayrıştırma | Splitting a request so each part is independently checkable |
| Map–reduce | haritala–birleştir | Process each chunk separately, then merge under rules |
| Chain / pipeline | zincir | Sequential steps feeding one another |
| Output contract | çıktı sözleşmesi | The fixed shape a step must return |
| Provenance | kaynak geçmişi | Where a figure came from, carried forward intact |
` },

    { id: "l3-3", ref: "3.3", mm: "6:07", dom: "D1",
      tr: "Aksayan Bileşen Üzerinde Yinelemek",
      en: "Iterating on the Weak Component",
      objective: "Iterate prompts to improve output quality.",
      body: `
Iterating is not rewriting. The skill being measured is *diagnosis*: find which of the five components is actually failing, change only that one, and see whether the output moves. Change three things and you have learned nothing that survives to the next task.

### [how] The one-variable rule
~~~
1  Name the defect in the output, specifically ("row 4 figure isn't in the source")
2  Map the defect to the component responsible
3  Change ONLY that component
4  Re-run on the SAME input
5  Compare against the criterion from step 1, not against your mood
6  If it moved -> keep, and log.  If it didn't -> undo, next component
~~~

"Re-run on the same input" is the step people skip, and it's the one that makes the comparison mean anything.

### [how] Symptom → responsible component → smallest edit
| What the output did | The component at fault | The smallest edit that fixes it |
|---|---|---|
| Answers a different question than asked | **Task** | One verb, one object, plus an explicit "done when" test |
| Right facts, wrong register/audience | **Context** | State who reads it, what it's for, what's already decided |
| Invented figures, quotes, citations | **Input** | Supply the material; restrict to it; "if not present, write 'not in sources'" |
| Correct but generic; no house style | **Exemplar** | Paste one accepted output; say what to mirror (structure, not polish) |
| Good content, unusable shape | **Format** | Name the container, the columns, the max length, what stays verbatim |
| Ignores one constraint repeatedly | Format or Context | Promote the constraint to its own labelled line at the end |
| Refuses or hedges everything | Task | You asked for a judgement it can't own — ask for options with criteria instead |
| Longer and longer, same value | Context | Cut. Long prompts dilute; delete anything that wouldn't change the answer |

### [trap] Iteration anti-patterns the exam will offer as options
- **Escalate the model first.** If facts are missing, no tier manufactures them. Tier is late on the cheapest-fix ladder (8.2), and an item asking "what should the associate do *first*" punishes skipping the ladder
- **Add everything at once.** A pile of context dilutes the constraints that matter; and if the output improves you cannot tell which change caused it
- **"Make it better / more professional"** — an instruction with no acceptance test, so the next iteration has nothing to measure against
- **Rewriting tone when the defect is grounding.** Polishing a fabricated number makes a worse deliverable: the same error, now harder to spot. The guide's own sample marks "reword the summary to sound more formal" as wrong for precisely this
- **Iterating past the bar.** Once the output clears the criterion, stop. Endless polishing is a cost, not a skill

::tip the reusable trick | When a defect survives every component edit, the component that's failing may be the *task definition itself* — you asked for something the sources cannot answer. Naming that early is a win, and it is a form of escalation (5.3).

### [case] Meridian
Mert's monthly report defect: totals drift by a few percent between runs. His instinct is to add more instructions. One-variable iteration finds that *Format* is the broken component — "present totals as a table with the row count and the sum-check row" removes the drift because the shape now makes the error visible. Nothing about the wording was wrong; the output just had no skeleton in which an inconsistency could stand out. That is the deeper lesson of the section: format is not cosmetic, and 4.6 spends a whole lesson on it.

### [do] Take one prompt that disappointed you this month. Write the defect as one sentence, name the component, make exactly one edit, re-run on identical input. If you cannot name the component without looking at the prompt again, the components were never in the prompt in the first place.
` },

    { id: "l3-4", ref: "3.4", mm: "6:43", dom: "D1",
      tr: "Stratejiyi Görev Türüne Göre Seçmek",
      en: "Choosing the Strategy by Task Type",
      objective: "Adapt prompting strategies based on task type (analysis, research, drafting, brainstorming).",
      body: `
The objective names four task types. They fail for different reasons, so the same "clear and detailed prompt" advice helps each one differently. Being able to say *which type am I in* is the first third of the marks on any D1 item.

### [fact] Four task types, four strategies
| Type | Goal of the exchange | What to instruct | What "good" looks like | Its characteristic failure | How you verify |
|---|---|---|---|---|---|
| **Analysis** | A defensible conclusion from given material | Show the reasoning as steps; state assumptions; give criteria before you ask; forbid new facts | Conclusions traceable to evidence; counter-evidence named | Confident conclusion, unshown arithmetic, invented inputs | Recompute the arithmetic; trace each claim to a cell or a quote |
| **Research** | Finding out what the sources actually say | Restrict sources; require citations to specific passages; require "not found in sources" as a permitted answer; ask for breadth before depth | Every claim has a checkable pointer; gaps declared | Plausible citations that don't exist; one source speaking for many | Open 2–3 random citations, not the first one |
| **Drafting** | A usable artefact for a named reader | Audience, purpose, constraints, structure, tone exemplar, what must remain verbatim | Small edits only; nothing invented; correct register | Over-written prose, invented specifics, tone drift | Diff against the source facts, not against taste |
| **Brainstorming** | Option space, deliberately unfiltered | Quantity, divergence, no judging, explicit exclusions ("no pricing changes"), then a second pass to sort | Range you wouldn't have generated; no false ranking | Ten variations of one idea; premature evaluation | Count distinct *categories*, not items |

### [how] The instruction set that changes per type
~~~
ANALYSIS   "State your assumptions before you conclude. Then list what would change your
           conclusion. Use only the attached material for facts."
RESEARCH   "Only these sources. Quote the exact sentence you rely on and name the file
           and section. If a question isn't answered, write 'not covered in sources'
           rather than inferring."
DRAFTING   "Here is an approved example: mirror its structure and length, not its content.
           Do not introduce any name, number or date absent from the input list."
BRAINSTORM "Give 20 ideas across at least 6 different categories. No ranking, no
           justification. Then, separately, group them and tell me which three are
           most different from the rest and why."
~~~

::tip why "no ranking" belongs in brainstorming | Mixing generation and evaluation in one step collapses the option space into the safest three options. Separating the passes is a decomposition decision (3.2) driven by the task type — the two lessons are the same skill seen from different ends.

### [how] One more axis: how open is the answer?
| Answer space | Prompt posture | Example phrasing |
|---|---|---|
| Closed — the material contains the answer | Constrain hard, forbid inference | "Only from this document. If absent, say so." |
| Bounded — conventions define acceptable | Give the format and an exemplar | "Same structure as last quarter's memo" |
| Open — there is no source of truth | Ask for options + criteria, never for a verdict | "Five approaches, each with its strongest objection" |

Most mis-set expectations come from treating a closed question as open (you get an essay where you needed a fact) or an open one as closed (you get a false single answer where you needed options).

### [case] Meridian
Four requests land in one week, all phrased "can you help me with…":
- Elif, campaign directions for Ardan → **brainstorming**; she had been asking for one recommendation and getting anodyne mush. First pass: 20 ideas, 6 categories, no ranking
- Selin, why Q3 margin moved → **analysis**; the sources exist and the arithmetic must be shown
- Mert, "what do the last four KPI files say about the Ankara office" → **research** over an internal set; restrict to those four files, cite the rows
- Nazlı, a rewritten parental-leave policy → **drafting**, and immediately escalated (7.1) because HR text with legal effect has an owner who is not a model

### [trap] Two near-misses in items
- Asking you to *brainstorm* and offering "provide a single recommended approach with rationale" as an option — the scenario says diverge, the answer that converges is wrong
- Asking you to *verify* and offering "a more capable model" — strategy selection is not verification

### [do] Take the last four things you asked Claude. Tag each analysis / research / drafting / brainstorming. Any you tagged wrong explains the disappointment more accurately than the wording of the prompt did.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Task type | görev türü | Analysis · research · drafting · brainstorming |
| Diverge / converge | ayrıştır / yakınsat | Generate wide, then select against criteria |
| Permitted uncertainty | izinli belirsizlik | Explicitly allowing "not in the sources" as an answer |
| Assumption declaration | varsayım bildirimi | Stating what you assumed before concluding |
| Register | üslup | Formality and voice suited to the audience |
` }
  ],
  assignment: {
    ref: "Ödev 2",
    tr: "Düşük performanslı bir istemin tek bileşenini onarın",
    en: "Repair a single component of a low-performing prompt",
    brief: `The broken prompt, as used by Elif on the Ardan campaign:

~~~
Can you write something good for the Ardan Textiles newsletter? Make it professional
and engaging and not too long. We talked about the summer range and the new
sustainability report last time.
~~~

The output: 600 words of fluent, generic copy, one invented statistic ("78% of customers"), and no relationship to last quarter's approved issue.

Your task — and it is deliberately narrow — is to **repair exactly one component** of the five, write the sentence you would add, and predict which defect disappears and which *survives*. Then answer the marking questions below.

| Component | If you fix only this… | Defect that disappears | Defect that survives |
|---|---|---|---|
| Task | Name the deliverable: subject line + 120-word intro, for the April issue | "Not too long" ambiguity, wrong shape | Invented statistic; no relationship to approved copy |
| Context | Audience = Ardan's retail buyers; purpose = drive replies; constraint = sustainability claims must match the published report | Off-audience tone; unclaimable sustainability wording | Invented statistic |
| **Input** | Attach the report excerpt + last approved issue; "use only these; if a figure is not in them, omit it and list what you needed" | **The invented 78%**; the missing link to prior issues | Tone may still drift |
| Exemplar | Paste one approved intro; "mirror structure and length only" | Generic voice | Any number not in the sources |
| Format | "Subject line ≤ 8 words; intro ≤ 120 words; no statistics unless quoted verbatim from the attached report" | Unusable length; and it now gives the reviewer a checkable shape | Nothing invented *with a number in it* — but vagueness remains |

**What the key rewards.** The single highest-value repair here is **Input**, because the only defect that can reach a client is the fabricated statistic — and a missing statistic is a *grounding* failure, not a tone failure. Fixing Format is the second best answer, but for the wrong reason to state: it is valuable because it creates a checkable shape, not because it "makes it shorter".

**The trap in this assignment.** Any answer that fixes two components at once loses the point even if the resulting prompt is better — the skill under test in 3.3 is one-variable iteration, because you must learn which change did the work. Write the follow-up repair as a *separate* numbered step.`
  }
});

S.push({
  id: "s4", num: 4, minutes: 37, domain: "D2",
  tr: "Çıktıyı Değerlendirme ve Doğrulama",
  en: "Output Evaluation and Validation",
  blurb: "Domain 2 — 21%, thirteen items, the heaviest domain on the exam and the largest section here. Six lessons on the one question the credential is really built around: should this leave the building?",
  quiz: "q4",
  lessons: [
    { id: "l4-1", ref: "4.1", mm: "6:34", dom: "D2",
      tr: "Ayırt Etme Protokolü",
      en: "The Discernment Protocol",
      objective: "Evaluate outputs against the requirements, the source material and the professional standard — and decide.",
      body: `
Everything in this section hangs off one protocol. It is also the single most efficient thing you can do on exam day, because roughly thirteen items are the same five questions wearing different scenarios.

### [fact] Five passes, in order
| Pass | What you are asking | How you actually do it | Pass/fail signal |
|---|---|---|---|
| **1. Requirement** | Does this answer *what was asked*, for *whom*, under the constraints we agreed? | Put the brief next to the output. Tick each clause | Any asked-for element missing; any locked constraint violated |
| **2. Grounding** | Is every claim traceable to a source that exists and says that? | Spot-check 3 random claims — not the first three — by opening the cited passage | One claim not in the source is enough to fail the pass |
| **3. Completeness** | What is *absent* that should be present? | Build the list of what must be covered, then mark what is missing | Silent omission: the section, the exception, the counter-argument |
| **4. Consistency** | Does it agree with itself and with what we already know? | Add the numbers; check that names, dates and totals match across the whole output | A total that doesn't equal its parts; two answers to one question |
| **5. Decide** | What happens next? | One of four actions, with a written reason | No record → no decision, just a vibe |

The four legitimate outcomes of pass 5:

- **Use as is** — rare; requires all four passes clean
- **Use with edits** — correct but incomplete, or complete but wrongly shaped
- **Re-prompt / re-run** — the defect is one you can name and locate (→ 3.3)
- **Escalate or stop** — the defect is outside your layer or your authority (→ 5.3, 7.1)

### [how] Why the passes must run in that order
Pass 1 before pass 2 is a time-saver of the worst kind: you can verify a hundred claims beautifully and still deliver something that answers the wrong question, which is why **Requirement comes first** even though Grounding is where the scary errors live. Pass 3 and 4 are the passes people skip under deadline, and they are where the *client-visible* failures hide — a wrong figure usually gets caught by reading; a *missing* exception clause does not.

::warn the rule above the protocol | Never substitute the model's own opinion about its reliability for any of the five passes. Self-rated confidence is not a validation method; the guide's sample item puts it on the page as a distractor for exactly that reason.

### [how] Making the check *auditable* rather than personal
Meridian's post-freeze rule is that a review has to survive somebody else asking "what did you check?". That turns each pass into a one-line artefact:

~~~
Requirement  : 4/4 clauses met; 'no headcount commentary' respected -> PASS
Grounding    : 3 figures opened at source (rows 12, 44, 58) -> all match
Completeness : 14 of 15 sections covered; 8.3 Exceptions NOT covered -> GAP
Consistency  : totals reconcile to 1,412 = sum of segments -> PASS
Decide       : USE WITH EDITS - request 8.3 content, re-check; Selin signs numbers
Reviewed by  : M. Şahin, 14 Mar
~~~

Ninety seconds to fill in, and it converts "I looked at it" into evidence.

### [case] Meridian
The incident that froze AI at Meridian was a fabricated statistic. Note precisely which passes would have caught it — **pass 2 alone**, opening the cited source. Not a new tool, not a new model, not a policy document: one person checking one citation. The reason the managing partner reacted as strongly as she did is that nobody had been *required* to do pass 2, and the firm had been running on reading-based trust.

### [do] Run the protocol on something Claude wrote for you today, and write the five lines. If you cannot fill the Grounding line honestly, you have just located your real workflow defect — it is not a prompting problem.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Discernment | ayırt etme | Critical evaluation of output — the 4D competency this section is |
| Grounding check | kaynak kontrolü | Open the cited source; does it say that |
| Spot-check | numune kontrolü | Sample claims at random rather than reading all of them |
| Silent omission | sessiz eksik | Something absent that the reader would assume present |
| Sign-off | imza / onay | A named person's recorded acceptance |
` },

    { id: "l4-2", ref: "4.2", mm: "5:51", dom: "D2",
      tr: "Doğruluk, Eksiksizlik Demek Değildir",
      en: "Accuracy Is Not Completeness",
      objective: "Evaluate Claude-generated outputs for accuracy and completeness — two separate axes with separate tests.",
      body: `
Two words in one exam objective, two different failures. Accuracy asks whether what is *there* is right. Completeness asks whether everything that *should be there* is. A model can be perfectly accurate and useless, because it answered the narrow question you happened to ask.

### [fact] The 2×2
| | **Accurate** | **Inaccurate** |
|---|---|---|
| **Complete** | Ship it. Rare, and still requires pass 4 | Right scope, wrong facts — caught by grounding checks |
| **Incomplete** | **The dangerous cell.** Reads as finished; nothing inside it is wrong; the defect is *outside* the text | Caught by any decent reviewer — and therefore the least likely to reach a client |

The dangerous cell is dangerous for a mechanical reason: **accuracy checks are run on what is on the page, and incompleteness is not on the page.** You cannot find it by reading. You find it by comparing against a list you built *before* you asked.

### [how] Four completeness contracts, and which one to build
| Contract | Built from | How you test | Catches |
|---|---|---|---|
| **Against the brief** | Your own requirements list | One tick per requirement, by ID | Requirements quietly dropped |
| **Against the source inventory** | The list of files you supplied | Every source appears at least once, or is explicitly marked "no relevant content" | Documents ignored — the classic "you attached eight, it read three" |
| **Against the structure** | The template or exemplar | Every heading/field present, even if "none" | Empty fields that vanish rather than reading "none" |
| **Against the stakeholder's questions** | What the reader will ask in the room | Each anticipated question answered somewhere | The technically-correct memo that answers nothing anyone needed |

::tip "none" beats nothing | The single most useful completeness instruction you can give: *every field must be present; if there is nothing to say, write "none found in sources"*. A visible "none" is a claim you can test. A missing row is invisible.

### [how] Where Claude specifically under-delivers
- **It answers the literal question**, not the question you meant. If your brief has an implicit second half, say it
- **It stops when the answer looks finished to a reader** — fluency is a stopping signal, not a completion signal
- **It compresses rare cases.** One awkward clause in a 40-page contract is exactly the kind of detail that summarisation eats, and exactly the one the client will raise
- **It will not tell you what it didn't read.** Add the inventory contract, or find out at the worst moment

### [case] Meridian
Selin's Ardan variance memo: every figure verified against the workbook, every sentence true. Sent. Two days later the CFO asked why the Ankara office merger — the one known comparability problem, sitting in a different tab — was not mentioned. Nothing in the memo was false. The memo was **accurate and incomplete**: the dangerous cell. A five-minute source-inventory contract ("each tab either cited or marked no relevant content") would have put a single line in front of a human before it went out — which is the entire economy of this section: the cheap check that runs *before* the client asks is worth more than the brilliant defence afterwards.

### [do] Take the last substantial output you accepted. Reconstruct the list of what should have been covered. Then check how much of that list existed *before* you asked, written anywhere. If the answer is "none of it", your completeness checks are your opinion of completeness — and an opinion is not auditable.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Accuracy | doğruluk | What is present is correct |
| Completeness | eksiksizlik | Nothing required is missing |
| Coverage | kapsama | Sources/requirements versus what was addressed |
| Source inventory | kaynak listesi | The list of material supplied, to test against |
| Verbatim requirement | aynen aktarma zorunluluğu | Fields that must survive compression |
` },

    { id: "l4-3", ref: "4.3", mm: "6:47", dom: "D2",
      tr: "Hata Kalıpları Galerisi",
      en: "The Error Pattern Gallery",
      objective: "Identify hallucinations, inconsistencies, and biases in responses.",
      body: `
You cannot spot an error you have not named. This lesson is a gallery: eleven patterns, each with the ten-second tell. Learn the tells and reviewing stops being a mood and starts being a scan.

### [fact] The gallery
| # | Pattern | How it shows up | The 10-second tell | The move |
|---|---|---|---|---|
| 1 | **Fabricated citation** | Precise section numbers, page refs, "Article 14(b)" | Open the document to *that* location. Fabrications die on contact | Grounding pass (4.1). Restrict sources (4.4) |
| 2 | **Invented statistic** | A specific number with no visible source in the input | Scan the supplied material for that number. Absent = suspect | Omit or demand the source cell |
| 3 | **Faulty arithmetic** | Totals that "look" plausible; percentages that don't sum | Add the column. Always. Takes 20 seconds | Recompute via code execution (5.2) |
| 4 | **Real source, wrong claim** | The document exists and says something adjacent, not that | Read the cited passage, not the citation | Partial-quote matching |
| 5 | **Overgeneralisation** | "Clients consistently report…" from three anecdotes | Count the evidence behind the claim word. *Consistently, all, every, never* | Downgrade to what the sample supports |
| 6 | **Loss of a constraint mid-answer** | Turn 1 respected the rule; turn 6 breached it | Search the output for the thing that was locked | Restate; put constraints in their own line (3.1) |
| 7 | **Source contamination** | Two clients' facts in one answer | Check the *provenance* of each named item | Isolation — one Project per client (6.2) |
| 8 | **Currency error** | Outdated figures or policy stated as current | Ask "as of when?" and demand the date | Time-restrict and cite retrieval date |
| 9 | **Sycophantic shift** | It agrees with your push-back with no new evidence | Notice whether anything *you supplied* changed | Ask for the strongest objection to your own view |
| 10 | **Padding** | Long, well-organised, zero information density | Read only the headings and the numbers | Ask for the answer alone, then the support |
| 11 | **Framing and selection bias** | The sample, the metric or the framing quietly favours one conclusion | Ask: what would the other side put in this deck? Who is missing from the data? | Force a counter-case; check representation (7.5) |

### [how] The three families, because items group this way
- **Grounding failures** (1, 2, 4, 8) — the content isn't in the sources. Cure: restriction + citations + spot-checks
- **Structural failures** (3, 5, 6, 10) — the content is fine, the *argument* is broken. Cure: format contracts and arithmetic that is computed
- **Trust failures** (7, 9, 11) — caused by the relationship between you and the model, or between the dataset and the population. Cure: isolation, adversarial prompting, explicit representation checks

::warn bias is examinable | Candidates read "identify biases" and look for offensive stereotypes. In a business item, bias is much more often **pattern 11**: a sample that excludes a segment, a metric that flatters one option, a summary built from the loudest five of two hundred tickets. The exam also asks about *fair representation of evidence* — cherry-picking is a bias answer, and a very common one.

### [case] Meridian
Run the gallery against the incident that caused the freeze: an invented statistic in a client deck is **pattern 2**, with **pattern 1** as an aggravating factor (it was attributed). Ask the follow-up question the firm asked afterwards — how did nobody notice? — and the answer is that the reviewer was reading, and reading cannot detect a number that has no source. Then the second-order failure: the analyst had asked Claude to "fill in the market context" with no source attached. Patterns do not appear alone; they appear in chains, and breaking the chain is a *process* change, not a vigilance change.

### [do] Take one recent Claude output you already accepted and scan it against patterns 1–4 only — deliberately ignoring whether you like it. Most people find at least one. Accepting that is the prerequisite for the rest of the section.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Hallucination | halüsinasyon | Fabricated content, indistinguishable by tone from real content |
| Overgeneralisation | aşırı genelleme | A claim broader than its evidence |
| Source contamination | kaynak karışması | Material from one context bleeding into another |
| Cherry-picking | veriyi seçme | Presenting only what supports the conclusion |
| Currency (staleness) | güncellik / bayatlama | Old facts presented as current |
` },

    { id: "l4-4", ref: "4.4", mm: "5:38", dom: "D2",
      tr: "Doğrulamayı İsteme Yerleştirmek",
      en: "Building Verification Into the Prompt",
      objective: "Source restriction, permitted uncertainty and auditable citations, placed at generation time.",
      body: `
Verification after generation is a cost. Verification *designed into* the generation is a property of the output. This lesson is the highest-leverage thirty lines in the whole course, because three prompt clauses remove most of the work in 4.1 and 4.3 before it starts.

### [fact] The three controls
| Control | What it says | What it eliminates | Why it works |
|---|---|---|---|
| **1. Source restriction** — Kaynak kısıtlaması | "Use only the documents in this Project / only the attached file. Do not use general knowledge for facts." | Fabricated citations, invented market context, plausible filler | It converts "answer" into "report what the sources say", which is a much narrower and much more checkable task |
| **2. Permitted uncertainty** — İzinli belirsizlik | "If something is not covered in the sources, write *not covered in sources*. That is a correct answer, not a failure." | Guessing to fill a gap; confident silence | Models fill gaps because they read *not answering* as failing. You must license the honest gap explicitly |
| **3. Auditable citation** — Denetlenebilir atıf | "For each claim, name the file, the section, and quote the exact sentence you relied on." | Undetectable errors; unverifiable claims; review time | It makes fabrication structurally harder, and — crucially — makes the reviewer's spot-check mechanical instead of interpretive |

::tip the fourth, optional but powerful | **Ask for the residual risk inventory:** "Before the deliverable, list every claim you could not ground, every requirement you could not satisfy, and every assumption you made." You receive the model's own confession of gaps, which is not trustworthy as *evidence* but is remarkably useful as a *checklist for pass 3*. The instruction is valuable because it turns absence into text.

### [how] A block you can paste into any Project's instructions
~~~
GROUNDING RULES (apply to every response in this Project)
1  Facts come only from the knowledge sources attached here. Do not add facts from
   general knowledge. Opinions and interpretation are allowed; figures, dates, names,
   quotes and citations are not.
2  Every figure must carry: file name, section or row, and the value as it appears.
   Reproduce numbers exactly. Do not convert units. Do not round.
3  If a question is not answered by the sources, reply "Not covered in sources" and
   name what is missing. Never infer to fill a gap.
4  Before the deliverable, list: (a) claims you could not ground, (b) requirements you
   could not satisfy, (c) assumptions you made.
5  Do not state a confidence level. Do not assert that something is verified.
~~~

### [how] Line 5 is the one people argue about
"Do not state a confidence level" exists because a stated confidence is *not a reliability signal* — it is fluent text, generated for the same reason as everything else. When a model says "I am confident this is correct", you have learned nothing about the source. Asking Claude to grade its own trustworthiness and shipping it if the grade is high is a distractor in the official sample set. What you *can* ask for is a **mechanical inventory** (line 4) — claims without citations are visible, countable and checkable; feelings about accuracy are not.

### [case] Meridian
Deniz's condition for lifting the freeze, in practice, is clause 1–3 written into every client Project rather than left to individual diligence. The measurable change is in review time: before, verifying one deck meant re-deriving whether each of ~15 numbers had a source; after, it means opening three citations at random, because the citations were demanded by construction. That is how a governance requirement becomes cheaper than the thing it replaced — and it is the argument Selin takes to the partnership meeting in 5.5.

### [do] Add clause 1 and clause 3 to the Project you use most. Then, on the next task, ask the clause-4 inventory question and count how many "not covered" lines appear. That count is the number of errors you were previously accepting silently.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Source restriction | kaynak kısıtlaması | Only these documents may supply facts |
| Permitted uncertainty | izinli belirsizlik | "Not covered in sources" is a valid answer |
| Auditable citation | denetlenebilir atıf | File + location + quoted sentence |
| Ungrounded claim | kaynaksız iddia | A statement with no traceable source |
| Prompt-level control | istem düzeyinde kontrol | A safeguard placed in the instruction, not in the review |
` },

    { id: "l4-5", ref: "4.5", mm: "6:31", dom: "D2",
      tr: "İnsan İncelemesi Ne Zaman Şarttır",
      en: "When Human Review Is Mandatory",
      objective: "Decide when human review is required, using stakes, reversibility, audience and regulatory exposure.",
      body: `
Not everything needs a review gate, and pretending otherwise is how governance gets bypassed. The skill is *calibrating* the gate — and being able to defend, in one sentence, why this item gets one and that one doesn't. Four criteria decide it.

### [fact] The four criteria
| Criterion | Türkçe | The question | Pushes review… |
|---|---|---|---|
| **Stakes** | risk / önem | What breaks if this is wrong — and to whom? | Up with the cost of the error |
| **Reversibility** | geri alınabilirlik | Can it be recalled, corrected, or un-sent? | Up when irreversible: published, signed, sent, deleted, committed |
| **Audience** | kitle | How many people see it, and who are they? | Up with reach and with outside-the-firm audiences |
| **Regulatory exposure** | mevzuat riski | Is a law, contract, or professional duty in play? | Up sharply — and often to a *specific* named reviewer |

### [how] The grid, which is what to memorise
~~~
                    REVERSIBLE                  IRREVERSIBLE
low stakes       no gate - self-check      spot check (sample 1 in 10)
high stakes      sign-off by the owner     dual sign-off + evidence attached
                 (single named person)     (and Legal/compliance where D applies)
~~~
Then the four review levels, precisely:
- **Level 0 — none.** Internal only, thrown away tomorrow. You still ran passes 1–4 of 4.1; you just don't need a second human
- **Level 1 — spot check.** Sample N items per batch against the source. Volume work where the *first* error is cheap
- **Level 2 — mandatory sign-off.** Every item, by a named person with the authority to say no, on evidence they can actually inspect
- **Level 3 — dual sign-off + specialist.** Domain expert *and* a risk owner (Legal, compliance, DPO). Reach for it on regulated decisions, external publication, or irreversible action

### [how] Making the gate real: three properties or it is theatre
1. **A named reviewer, not a role in the abstract.** "Selin reviews the numbers" is a control; "management reviews" is not
2. **Evidence the reviewer can inspect.** The citation block from 4.4, the coverage table from 4.2. A reviewer given only the finished deck rubber-stamps it, because checking is impossible in the time available
3. **An explicit no.** The reviewer must be able to stop the item. A gate that can only delay is not a gate

::warn the accountability line | Accountability cannot be delegated to a model, and it cannot be laundered through a review process either. If the reviewer cannot realistically check the thing they are signing for, the control is decorative — and exam items about "who should review" are testing whether you notice that.

### [case] Meridian
Post-freeze, the firm writes the grid rather than a ban:
| Work | Stakes | Reversible | Audience | Regulation | Gate |
|---|---|---|---|---|---|
| Internal meeting summary | Low | Yes | Team | None | L0 |
| Newsletter subject lines (40/wk) | Low | Yes | Client's list | Ad-claims rules on wording | L1 spot check, 1 in 10 |
| Ardan variance memo with figures | High | **No** — goes to a CFO | External, one client | Contractual confidentiality | L2 — Selin signs every number, evidence attached |
| Any figure entering a board deck | High | No | External | Reputational + contractual | L2 + arithmetic recomputed by a human |
| CV screening output | High | No | Individuals | Employment law | **Blocked** pending review (7.1) |
| Client contract clause answers | High | No | External | Legal effect | L3 — lawyer confirms against the document; Claude's answer is a *draft of a pointer*, never the answer |

### [do] Write your own three-line version of that table for the work you actually do — one row that should have a gate and doesn't, one row that has a gate nobody can inspect, one row that is reviewed unnecessarily. Two of those three are usually fixable this week.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Human-in-the-loop | insan onaylı | A person must approve before the step takes effect |
| Spot check | numune kontrolü | Review a sample, not the population |
| Sign-off | onay/imza | A named person's recorded acceptance |
| Rubber-stamp | formalite onayı | Approval without real inspection |
| Accountability | hesap verebilirlik | Stays with the human, always |
` },

    { id: "l4-6", ref: "4.6", mm: "6:02", dom: "D2",
      tr: "Biçim, Bir Güvenilirlik Kararıdır",
      en: "Format Is a Reliability Decision",
      objective: "Organise and curate information and select appropriate output formats (artifacts, inline, structured data).",
      body: `
The objective places format selection inside the *evaluation* domain, not the presentation domain, and that placement is the lesson: the container decides which defects are visible. This is why it sits in a 21%-weighted domain.

### [fact] Four containers and when each is the right answer
| Container | Best for | Reliability property | Cost |
|---|---|---|---|
| **Inline prose** | Short answers, explanations, one judgement | Hides omissions — a missing element leaves no gap the eye catches | Cheap to write, expensive to check |
| **Artifact / document** | A deliverable that will be edited, shared, versioned, compared | Comments, diff and hand-off become possible; structure can carry a checklist | Medium; needs a version discipline |
| **Structured data** — table, CSV, JSON | Anything with rows: extraction, comparison, inventory, financials | **Missing rows and mismatched totals become visible.** The row count itself is a check | Highest up-front discipline, lowest review cost |
| **Checklist** | Process, pre-flight, audit | Absence is explicit — an unchecked box is loud | Cheap; and it doubles as the evidence record |

::tip the core sentence | Prose hides gaps; structure exposes them. Every format decision is a decision about *where defects can hide* — which is a reliability decision, not an aesthetic one.

### [how] Choosing, in three questions
1. **Will anyone count, sum or reconcile it?** → structured table, with a totals row and an explicit row count. Never accept figures embedded in prose you can't sum
2. **Will it be revised or handed to someone else?** → artifact, so the version and the comparison survive
3. **Does completeness matter more than readability?** → a checklist or a fixed-field template, with "none found" as a permitted value

Then the two rules that prevent most defects at the source:
- **Name the columns and the exact fields you want, and require an empty value to be written as "none" rather than omitted.** A missing row is undetectable; a "none" row is a claim you can test
- **Require the arithmetic to be shown in the structure** — inputs, formula, result — so a reader can check the derivation without redoing it (this is 5.2's rule, enforced by format)

### [how] Adapting and comparing outputs for an audience — the other half of the objective
| Move | How to do it well | Mistake to avoid |
|---|---|---|
| **Edit / adapt** for a CFO, a shop floor, a regulator | Change the *selection and order*, verify that the facts survive unchanged | Letting the rewrite paraphrase your numbers or your clause references |
| **Compare variants** | Ask for a side-by-side table across fixed criteria (accuracy, length, tone, what each omits) | Choosing on which one reads best — that rewards fluency, i.e. pattern 1 of 4.3 |
| **Curate** | Decide what to *cut* against the reader's decision, and record why | Trimming the inconvenient exception because it made the memo tidy |
| **Refine** | One change at a time against a named defect (3.3) | Regenerating from scratch and losing the parts that were right |

The trap in "adapt for audience" items: a well-intentioned simplification is where verbatim requirements die. Every rounding, every "approximately", every collapsed figure is an accuracy event dressed as readability.

### [case] Meridian
Mert's monthly report was prose. Readable, professional, and — three months running — silently wrong in one segment, because a wrong number in a sentence is invisible while a wrong total in a column is not. Reformatting to a fixed table with a row count and a reconciliation line found the defect on the first re-run without any re-prompting at all. That is the cheapest repair in the entire course, and it is why 8.2 puts format changes near the top of the fix ladder.

Elif's case is the audience half: "make this report sound like a newsletter" turned three measured findings into two confident impressions. The instruction now fixed in the marketing Project: *you may change length, order and tone; every figure, date and product name must be reproduced exactly and listed at the end for checking.*

### [do] Look at the last three Claude outputs you accepted. How many were prose? For each, ask whether a table or checklist would have exposed a defect. Convert one recurring output to fixed fields with "none" permitted, and watch what starts appearing.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Structured data | yapılandırılmış veri | Table / CSV / JSON with fixed fields |
| Artifact | çıktı nesnesi | The separate, editable deliverable |
| Row count / reconciliation | satır sayısı / mutabakat | Structure-level integrity checks |
| Verbatim field | aynen alan | A field that must not be paraphrased |
| Diff | fark karşılaştırması | Comparing two versions to see exactly what moved |
` }
  ],
  assignment: {
    ref: "Ödev 3",
    tr: "Dört çıktıyı sınıflandırın ve her kararı belgeleyin",
    en: "Classify four outputs and document each decision",
    brief: `Four outputs from the Meridian files. For each, run the protocol from 4.1, name the defect *pattern* from 4.3, choose one of the four **decide** outcomes, and write the one-line review record. The key below shows what a complete answer looks like — note that half the marks are in the *record*, not the verdict.

| # | Output | Verdict | Dominant defect | Pattern | Decide | The record you would file |
|---|---|---|---|---|---|---|
| 1 | Contract summary citing "Clause 14(b)"; clause 14 in the source has three sub-clauses, none about liability | Grounding fail | Cited location does not support the claim | **1 Fabricated citation** | **Re-prompt** with source restriction, then re-check | "Grounding: cite 14(b) → source has no liability sub-clause. Re-run restricted to file X. Owner: Selin." |
| 2 | Segment table; all figures exact; the Ankara merger note is absent | **Complete-looking, incomplete** | Known comparability break not disclosed | **Silent omission** (4.2) | **Use with edits** + request the missing section | "Completeness: 14/15 items; merger note absent. Not shipped until added. Checked by: M." |
| 3 | Sixty-word summary; every claim grounded; totals 1,412 while segments sum to 1,312 | Inconsistent | Arithmetic doesn't reconcile | **3 Faulty arithmetic** | **Re-run with code execution**, or fix by hand | "Consistency: total 1,412 vs sum 1,312. Recomputed 1,312. Figure corrected, source cited row 44." |
| 4 | Campaign copy: "customers consistently prefer the new range", evidence is nine survey replies | Overgeneralised + bias risk | Claim exceeds sample | **5 Overgeneralisation** (and 11 framing) | **Use with edits** — downgrade the claim to the sample, or re-run with the full dataset | "Accuracy: claim not supported by n=9. Rewritten to 'among the nine respondents…'. Approved by: Elif." |

**What the key is checking.** (a) did you locate the *pass* that fails, not just a feeling; (b) did you use the pattern vocabulary rather than "it looks off"; (c) is the outcome one of the four, not "ask Claude to double-check" — there is no fifth legitimate outcome; (d) **does the record name what was checked and by whom**, which is the only part Deniz's freeze is actually about.

**Common losing answer.** "Ask Claude to verify its own summary." That is not verification; it is generation with extra steps. If you wrote that for any row, re-read the line in 4.4 about self-reported confidence being a distractor in the official sample set.`
  }
});
