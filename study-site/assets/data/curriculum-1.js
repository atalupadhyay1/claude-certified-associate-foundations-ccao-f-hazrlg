/* Curriculum — Sections 1 & 2 */
window.CCAO = window.CCAO || {};
window.CCAO.curriculum = window.CCAO.curriculum || { sections: [] };
var S = window.CCAO.curriculum.sections;

S.push({
  id: "s1", num: 1, minutes: 15, domain: "meta",
  tr: "Giriş: Sınav, Çerçeve ve Meridian Partners",
  en: "Introduction: the exam, the framework, and Meridian Partners",
  blurb: "Two lessons that decide how you spend the other thirty-three. What the exam is built to measure, and the one company you use it on.",
  quiz: "q1",
  lessons: [
    { id: "l1-1", ref: "1.1", mm: "6:52", dom: "meta",
      tr: "CCAO-F Gerçekte Neyi Ölçer",
      en: "What CCAO-F Actually Measures",
      objective: "Apply the seven CCAO-F exam domains to realistic scenarios, according to their unofficial weights.",
      body: `
Why most preparation fails on this exam is a mismatch of format, not of knowledge. You can list every Claude feature and still fail, because almost no item asks you to list anything. The official guide says the credential **validates that an individual can apply Claude to complete business and productivity tasks with minimal guidance**, and the items are written to that sentence: a scenario, then "what is the most appropriate action?"

### [fact] The shape of the instrument
| | |
|---|---|
| 60 items, 120 minutes | Roughly two minutes per item. Time is not the constraint; deliberation is |
| Single- and multi-select | Each item states how many responses to select. Read that number |
| Scaled 100–1,000, pass at 720 | Criterion-referenced: measured against a fixed standard, **not against other candidates** |
| Percent-correct by domain on the report | Your retake plan is written in that report, not in the total score |
| No coding, no API, no prerequisites | Explicitly not for people building against the API or designing agentic systems |

### [why] Why the weights are the whole study plan
Weights are the approximate share of scored items drawn from each domain. Over 60 items they become a question budget, and that budget is why you must not study evenly.

| Domain | Weight | ≈ Items | What that means for you |
|---|---|---|---|
| D2 Output Evaluation and Validation | 21% | 13 | The single heaviest area; the course's largest section, six lessons |
| D4 Workflow Integration and Solution Design | 16% | 10 | Second heaviest; overlaps D2 and D6, so it compounds |
| D6 Governance, Risk, and Responsible Use | 15% | 9 | The cheapest points on the exam — mostly judgement, not knowledge |
| D1 Prompting and Task Execution | 14% | 8 | High overlap with D2 |
| D3 Product and Model Selection | 12% | 7 | Narrow, rule-driven, easy to fully mark |
| D5 Configuration and Knowledge Management | 12% | 7 | Overlaps D1 and D6 |
| D7 Troubleshooting and Optimization | 10% | 6 | Only six questions — and the best return per minute, because the frameworks are short |

::tip read | Three domains — **D2 + D4 + D6 = 52%**, over half the exam — are about what happens *after* the text is generated and *around* the decision to use it. That is the design intent of the credential.

### [trap] "Most appropriate" is a different question than "true"
Expect four options of which two are true statements. The exam asks which is the most appropriate *next action, for this person, under this policy, at this point in the workflow*. Distractors are built from three classic near-misses:

- **Right instinct, wrong order** — verifying is correct; verifying *after* sending is not
- **Right action, wrong owner** — the associate can redact the file; only Legal can waive the clause
- **Over-correction** — "abandon the analysis" is always on the page and almost always wrong

::warn weights | Anthropic does not publish domain weights. They are reported by third-party exam guides. Treat them as a study allocation, not a promise about item counts.

### [do] Before the next lesson
Write down, honestly, which domain you would be least able to defend in front of a client. That domain gets your first two study hours, whatever its weight says.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Criterion-referenced | ölçüt bazlı | Measured against a fixed standard, not a curve |
| Scaled score | ölçeklenmiş puan | Reported 100–1,000 range; 720 is the cut |
| Item | soru / madde | One scored question |
| Percent-correct by domain | alan bazlı doğru yüzdesi | The part of the report that tells you what to restudy |
| Escalate | üst kademeye taşımak | A scored skill: hand complex or technical work to Architect or Developer |
` },

    { id: "l1-2", ref: "1.2", mm: "8:27", dom: "meta",
      tr: "4D Çerçevesi ve Örnek Vakamız",
      en: "The 4D Framework and Our Case Study",
      objective: "The study organising device — every framework in the course sits on Anthropic's four AI Fluency competencies.",
      body: `
The course does not teach 35 disconnected tips. It teaches one loop with four doors, then walks a single fictional company through it. Learn the loop and every framework in the course has somewhere to live.

### [fact] The 4Ds
Anthropic's AI Fluency framework names four competencies. This course uses them as its spine, and the exam's seven domains distribute across them almost cleanly.

| The 4D | The question it answers | When it runs | Exam domains it carries |
|---|---|---|---|
| **Delegation** · Devretme | What should Claude do, and what must stay human? | Before you write anything | D4, D6 |
| **Description** · Tanımlama | How do I say it so the first draft is already close? | The prompt, the Project, the instructions | D1, D5 |
| **Discernment** · Ayırt etme | Is this output true, complete, consistent, fit for this audience? | After output exists — and loops back | D2, D7 |
| **Diligence** · Özen | Was this permitted, disclosed, reversible — and who is accountable? | Wraps the entire loop | D6, D2, D4 |

Two properties of the loop matter for the exam:

- **Description and Discernment are one system.** What you learn while judging an output is supposed to become the next instruction, the next Project setting, the next saved fix. Lesson 8.3 exists for exactly that reason.
- **Accountability never moves.** The guide expects you to *recognise limitations and escalate*, not to absorb risk on behalf of a model.

### [fact] Three ways of engaging — Automation, Augmentation, Agency
| Mode | What it is | What you hand over | What you keep |
|---|---|---|---|
| **Automation** | Claude executes a specific task from instructions | Repetition, volume, formatting, first-pass extraction | The sampling check — and the blame if you skipped it |
| **Augmentation** | You and Claude work as partners, turn by turn | Drafting, option generation, structuring | Selection, judgement, final wording |
| **Agency** | You shape what Claude knows and how it behaves; it works on your behalf | Scoping, standing configuration | The decision itself, always |

An exam item often becomes trivial once you name the mode. "Which mode fits a recurring, verifiable, low-judgement step?" — automation. "For a partner-level client recommendation?" — augmentation at most, and the decision stays human.

### [case] Meridian Partners, the firm every framework is applied to
A mid-sized consulting firm. **Three offices** — İstanbul, Ankara, İzmir. **Per-client confidentiality obligations written into every engagement letter.** And a **managing partner who has frozen AI use firm-wide** because an invented statistic reached a client.

That sentence is the whole exam in miniature, and every section returns to it:

| Who | Their problem | Solved in |
|---|---|---|
| **Deniz Aydın**, managing partner | Froze AI after one fabricated number reached a client. Wants controls, not enthusiasm | 4.4 · 4.5 · 7.1 · 7.2 |
| **Selin Kaya**, senior associate (Ardan Textiles) | Every number in her deck must survive a challenge in the room | 4.1 · 4.3 · 5.2 |
| **Mert Şahin**, operations analyst | Built a report that worked for three months and then quietly stopped working | 6.4 · 8.1 · 8.2 |
| **Elif Doğan**, marketing & comms | Wants volume and speed on client-facing copy; no interest in provenance | 3.1 · 4.6 · 7.4 |
| **Nazlı Aksoy**, people lead | Wants Claude to screen CVs | 7.1 · 7.2 |
| **Burak Yılmaz**, IT & platform admin | Controls connectors, Skills enablement and the audit trail | 6.3 · 7.3 |
| **Kuzey Logistics**, client | Engagement letter bans uploading personal data to third-party systems | 7.2 · 7.4 |
| **Poyraz Gıda**, client | Confidential M&A pipeline; a leak is commercially fatal | 6.2 · 7.4 |

Read each Meridian moment as a *decision*, not a story. The exam will hand you the same decision wearing a different name.

::warn cast | Meridian Partners is the case the course runs on from first lesson to last. The individuals named above are placeholders used by *these notes* to keep the case coherent across 35 lessons — learn the situation, not the names.

### [do] The one-page frame to keep open while you study
~~~
DELEGATION   -> what does Claude do here, what stays human, who is accountable?
DESCRIPTION  -> task . context . input . exemplar . format  (+ verification built in)
DISCERNMENT  -> requirement . grounding . completeness . consistency -> decide
DILIGENCE    -> permitted? classified? disclosed? reviewed? recorded?
~~~

Every framework in sections 2–8 is one of those four lines, made operational.
` }
  ]
});

S.push({
  id: "s2", num: 2, minutes: 28, domain: "D3",
  tr: "Ürün ve Model Seçimi",
  en: "Product and Model Selection",
  blurb: "Domain 3, 12%, about seven items. Four lessons that turn a vague 'which Claude should I use?' into three named decisions you can defend.",
  quiz: "q2",
  lessons: [
    { id: "l2-1", ref: "2.1", mm: "7:05", dom: "D3",
      tr: "Claude'un Her Zaman Yaptığı Beş Şey",
      en: "The Five Things Claude Always Does",
      objective: "Understand and manage context limitations and memory considerations — the behavioural baseline every later lesson assumes.",
      body: `
Model selection goes wrong because people select on *capability* when they should select on *fit*. Fit starts with what the model does no matter what you ask it. These five behaviours are the reason the rest of the course exists; they are reconstructed here as a working checklist, so check the exact wording the video uses.

### [fact] The five always-on behaviours
| # | It always... | The consequence you must design around |
|---|---|---|
| 1 | **optimises for plausible, not for true** | Fluency is not evidence. A confident, well-formatted sentence and a fabricated one feel identical to read |
| 2 | **starts from nothing** — no memory of you unless Projects, memory, or pasted context put it there | Every new chat is amnesiac. Reusable knowledge is built, not accumulated |
| 3 | **only sees what is in the window and the tools you enabled** | If the client file is not attached, connected or pasted, it is not in the room — and it will still answer |
| 4 | **runs out of room** — context degrades as a thread grows, and a long answer truncates | Long threads drift; long answers get cut. Restart, summarise, persist, or split |
| 5 | **tries to satisfy you** — including where it lacks data, and including when asked to rate its own reliability | Gap-filling looks like success; self-reported confidence is not a validation method |

::warn the one people argue with | Behaviour 5 is what exam items are built on. The guide's own sample question lists "Ask Claude to rate its own confidence and send it if the rating is high" as a **distractor**, never an answer. Do not accept a model's self-assessment as a correctness signal.

### [how] Turning the five into three habits
- **After #1 and #5 — never verify by reading.** Reading tells you whether it *looks* right. Verification means going to the source: the file, the regulation text, the spreadsheet cell. That is lesson 4.1.
- **After #2 and #3 — never answer a question about material you did not supply.** Put it in the prompt: *use only the documents in this Project; if something is not there, write "not covered in sources"*. That is lesson 4.4.
- **After #4 — treat a long thread as a degrading instrument.** Decide deliberately when to **restart, summarise, or persist**; that phrasing is an explicit Domain 3 objective.

| Signal in the thread | What is happening | Action |
|---|---|---|
| Contradicts something from turn 2 | Earlier context is losing influence | Restate the constraint, or restart |
| Output ends mid-sentence | Output length limit | Split the ask; request "part 2" |
| Ignores a rule you gave 20 turns ago | The rule is buried under accumulated context | Move it into Project instructions — 8.3 |
| Same question, different structure each time | No format anchor | Add an explicit template or an exemplar |
| You are past turn 40 | Context is expensive and fuzzy | Summarise, then start fresh |

### [case] Meridian
Elif Doğan opens a new chat, pastes nothing, and asks for "the usual tone for the Ardan newsletter". Claude returns something fluent, on-brand-looking, and written for no client in particular. The defect is not the model: behaviour #2 was treated as though it were not there. The fix is structural — a Project holding the client's voice and past approved issues as exemplars — not rhetorical.

### [do] Ten-minute exercise
Open a long chat you actually use. Write three answers: which claims were never checked; which of the five behaviours caused the worst defect in it; what you would move into a Project so the next chat starts ahead instead of at zero.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Hallucination | halüsinasyon | Fabricated but plausible content — citations, numbers, quotes |
| Context window | bağlam penceresi | Everything in the thread plus attached material the model can attend to |
| Truncation | kesilme | Output stops because it hit the length limit |
| Sycophancy | yaltaklanma | Agrees with your leading; shifts under pressure without new evidence |
| Grounding | kaynağa bağlama | Tying each claim to a supplied source |
` },

    { id: "l2-2", ref: "2.2", mm: "7:10", dom: "D3",
      tr: "Dört Giriş Noktası, Tek Karar",
      en: "Four Entry Points, One Decision",
      objective: "Select appropriate Claude product features (Projects, research mode, chat, artifacts).",
      body: `
Domain 3's first objective names exactly four product features — **chat, Projects, research mode, artifacts**. The lesson title *is* that list. The lesson itself is that they are one decision, not four separate preferences: *how much of this work should be reusable, sourced, or editable?*

### [fact] The four entry points
| Entry point | What it is for | Reach for it when | Not when |
|---|---|---|---|
| **Chat** | One-off, disposable exchange | Nothing here will be reused; the answer is the deliverable | You are re-typing the same instructions for the third time |
| **Projects** | Standing instructions + a knowledge set, reused every conversation | Same client, same brief, recurring work, a team that should inherit your setup | A one-time task; or knowledge you must isolate per client |
| **Artifacts** | A separated, editable, iterable deliverable | The *object* is the output and it will be revised, handed over, or compared | You only needed a paragraph in the reply |
| **Research mode** | Multi-step search across sources, returning cited findings | The answer is not in the room — you need external or wide internal material | The answer is in the client file you already have; searching adds noise, not signal |

### [how] One decision, three questions
~~~
Q1  REUSE    Will this instruction / knowledge be needed again?   no -> Chat      yes -> Project
Q2  SOURCE   Is the answer in material I already control?         no -> Research  yes -> attach / paste
Q3  OBJECT   Will the output be edited, handed over, compared?    no -> inline    yes -> Artifact
~~~
Order matters. Reuse first — it changes where you even start. Sources second — it changes what you can legitimately ask. Object third — it changes what you ask *for*. Getting Q1 wrong is the expensive mistake: a Project you never reuse is overhead, and a chat you re-brief every day is a leak, because re-typed instructions drift and so does the output.

::tip naming | An item that asks "which feature should the associate use" is testing whether you read the *shape of the work*, not whether you memorised a feature list. Recurring + shared + same client → Project. Needs facts you don't have → research mode. A deliverable you'll revise → artifact. Throwaway → chat.

### [trap] The four distractor shapes in selection items
- **"Disable product features to reduce cost"** — a favourite, and marked wrong in the guide's own sample. Removing capability is not alignment
- **"Switch to a different AI platform"** — never the answer to a trade-off question
- **"Always use the most capable model" / "always use a Project"** — the exam rewards *fit*, so a universal rule is wrong by construction
- **Right feature, wrong time** — research mode on a question whose definitive answer sits in a client document imports unverifiable external material into a matter that had a source

### [case] Meridian
Mert wants a one-line answer about a Kuzey Logistics contract clause: chat is right — and so is the caveat that Claude answered from the clause as he *remembered* it, not as it reads. Selin's problem is the inverse: she re-briefs a fresh chat with the same six constraints every Monday for Ardan Textiles. Q1 says Project — the same choice that also fixes the confidentiality boundary (6.2). Elif wants a four-page campaign memo she'll iterate with the client: Q3 says artifact, and the artifact is what makes version comparison possible at all.

### [do] Label the next five things you ask Claude
Write one of {chat, project, artifact, research} next to each, with why. Anything you labelled "should have been a Project" twice is the configuration you build this week.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Entry point / surface | giriş noktası | Where you start: chat, Project, artifact, research |
| Project | Proje | Saved instructions + knowledge, reused across conversations |
| Artifact | çıktı nesnesi | Separate, editable deliverable you keep iterating |
| Research mode | araştırma modu | Multi-step search with citations, for what you don't have |
| Reusability | yeniden kullanılabilirlik | The Q1 test: will this be needed again? |
` },

    { id: "l2-3", ref: "2.3", mm: "7:04", dom: "D3",
      tr: "Yetenek Katmanı",
      en: "The Capability Layer",
      objective: "Which layer must supply the capability — the model, the product's context and tools, or engineering you escalate.",
      body: `
Entry point answers *where I start*. Capability layer answers *what has to exist for this to work at all*. Most failed AI adoption in a business is a layer error: somebody asked a chat window to do a job that needed a tool, or asked a partner to do a job that needed an engineer.

### [fact] The three layers
| Layer | Supplied by | Typical business jobs | Who owns it |
|---|---|---|---|
| **L1 — Model** | The model and your prompt alone | Summarise, draft, reformat, compare, brainstorm, classify, extract from pasted text | You — an Associate works here fluently |
| **L2 — Context & tools in the product** | Projects, knowledge files, artifacts, connectors, code execution, research, Skills | Recurring client work, grounded Q&A over a document set, arithmetic on a dataset, standing house style | You + the platform admin (Burak) — still Associate scope |
| **L3 — Engineered systems** | The API, MCP servers, custom agents, pipelines, production integrations, SLAs | Anything that must run unattended, act on a system, handle data at scale, or be auditable by design | **Claude Developer / Claude Architect — escalate** |

::tip the exam's own sentence | The guide says the credential covers *recognising limitations and escalating more complex or technical work to Claude Architects and Developers*. L1/L2 versus L3 is that sentence turned into a five-second test.

### [how] Name the capability, then the layer
Name the capability the step needs before you pick anything. Seven names cover nearly all business work:

| Capability | What typically goes wrong | Minimum control |
|---|---|---|
| **Retrieval** — what do the sources say | Answers from model memory instead of the source | Source restriction + citations |
| **Extraction** — text → structured fields | Silently misses rows | Field list + "leave blank, never infer" + row-count check |
| **Compression** — summarise | Drops the inconvenient clause | Completeness contract: list every section covered |
| **Analysis** — compare, weigh, reconcile | Confident arithmetic that is wrong | Inputs, formula, result shown; recomputed independently |
| **Generation** — draft | Generic, unfounded, off-tone | Context + exemplar + boundaries |
| **Transformation** — tone, length, translate | Adds or drops meaning while polishing | Diff against the source, not against taste |
| **Classification / routing** | Unstable between runs | Definitions + one worked example per class |

Then ask the layer question.

~~~
NEEDS YOUR FILES ONLY ............ L1 or L2 - attach them, or put them in a Project
NEEDS CURRENT / EXTERNAL FACTS ... L2 - research mode or connector, with citations
NEEDS ARITHMETIC ON A DATASET .... L2 - code execution, never mental maths
NEEDS TO ACT ON A SYSTEM ......... L3 - escalate (Developer)
NEEDS TO RUN WITHOUT A HUMAN ..... L3 - escalate (Developer + Governance)
NEEDS AUDITABILITY BY DESIGN ..... L3 - escalate (Architect)
~~~

### [case] Meridian
The firm's most-requested upgrade is "let Claude read the client inbox and reply to customers". Elif files it as a prompting problem. It is not: reading a mailbox continuously and sending replies with no human in the loop is an **L3** request — connectors that can act, guardrails, logging, a named owner. What *is* L2 today: a Project per client, the last thirty approved replies as exemplars, used by a person who presses send. Naming the layer turned a stalled request into a shippable v1 plus a correctly-scoped backlog item.

Mert's "used to work, now doesn't" report is the mirror image: he had been relying on an **L1** behaviour — a long prompt he pasted every month — which was never durable. Same job, wrong layer, silent decay; the fix is recorded in 8.3.

### [trap] Layer errors that cost marks
- Reaching for a *bigger model* to solve a *missing-tool* problem — more reasoning cannot fetch a file it cannot see
- Solving *missing context* by changing model tier (D7's cheapest-fix ladder puts model changes deliberately late)
- Promising an L3 capability at L2 — "it'll just handle the whole inbox"
- Escalating an L1 problem: asking an Architect to fix what a paragraph of context fixes

### [do] Take one live request at work. Write the capability it needs, the layer, and — if L3 — the one-sentence escalation you would send, naming what must be built rather than what you were unhappy about.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Capability layer | yetenek katmanı | Whether the model, the product's tools, or engineering must supply the ability |
| Code execution | kod çalıştırma | Claude runs code for real arithmetic on data — L2 |
| Escalation | üst kademeye taşıma | Handing L3 work to Developer/Architect; a scored behaviour |
| Guardrails | koruyucu sınırlar | Controls that bound what the AI may do |
| Auditability | denetlenebilirlik | Can a third party reconstruct what happened, and why |
` },

    { id: "l2-4", ref: "2.4", mm: "6:46", dom: "D3",
      tr: "Model Seviyesi Seçmek",
      en: "Choosing a Model Tier",
      objective: "Differentiate Haiku / Sonnet / Opus and align model selection with cost, speed and quality.",
      body: `
Model tier is the one topic in this section where a rule beats a preference, so it is cheap to mark and expensive to lose. The objective is phrased as *alignment*: match the tier to the task's cost, speed and quality requirements. The right answer is usually the **cheapest tier that clears the quality bar**; the wrong answer is almost always "use the strongest model for everything".

### [fact] The tiers
| Tier | Strength | Right for | Wrong for |
|---|---|---|---|
| **Haiku** | Fast, low cost, strong on well-specified tasks | High-volume short replies; extraction into a fixed schema; classification and routing; summarising one known document; first-pass triage | Ambiguous multi-constraint reasoning; long documents where nuance is the deliverable; anything where a wrong answer costs more than the saving |
| **Sonnet** | The balanced default | Day-to-day business analysis; drafting under constraints; mid-length documents; multi-step but bounded work | The hardest synthesis across many conflicting sources |
| **Opus** | Deepest reasoning, long complex synthesis | Ambiguity with real stakes; reconciling conflicting sources; partner-level analysis; where rework costs more than the tokens | High-volume routine work — you pay in latency and cost for reasoning you are not using |

::tip the guide's own sample | High volume of short customer-reply drafts, speed and cost matter more than deep reasoning → **"use a faster, lower-cost model suited to straightforward, high-volume tasks."** The distractors are "use the most capable, highest-cost model for every reply", "disable all product features to reduce cost", and "switch to a different AI platform".

### [how] Choose in this order
1. **Name the quality bar first, in writing.** Not "good" — "the client must not need to change a number, and the tone must match the approved copy". The bar decides the tier; the tier never decides the bar.
2. **Ask what a wrong answer costs.** Cheap to catch, quick to redo, internal only → go down a tier. Client-facing, irreversible, or hard to spot → go up.
3. **Ask what the volume is.** Two hundred a day at Haiku quality beats two hundred a day at Opus quality you cannot afford and will not wait for.
4. **Then step up only on evidence.** Start low, escalate on a *named* failure — dropped a constraint, could not reconcile two sources, arithmetic wrong — not because the draft "felt mediocre".
5. **Extended thinking is a separate dial from tier.** More reasoning budget helps multi-step analysis; it adds no grounding and will not rescue a prompt with no sources in it.

| If the failure is... | Does a tier change help? | Better first move |
|---|---|---|
| Wrong facts, invented citations | No | Source restriction + verification (4.4) |
| Ignored an instruction | No | Move the instruction; shorten the prompt (3.3) |
| Lost the thread in a long document | Sometimes | Split / map-reduce (3.2); restart (2.1) |
| Could not reconcile conflicting sources | Yes | Step up |
| Shallow, generic analysis | Yes | Step up — or add context and an exemplar first |
| Too slow for a chat-like workflow | Step *down* | Haiku, or split the step |

### [case] Meridian
Elif's newsletter workflow settles itself once written down: forty short client-facing subject lines a week, an internal reviewer catches everything, and the tone bar is met by an exemplar → **Haiku, in a Project, with an exemplar**. Selin's Ardan board memo is the opposite: conflicting source figures, one wrong number already caused a partner freeze, and no reviewer in the room who can check arithmetic → **Opus (or Sonnet with extended thinking) plus a mandatory human check on every number**, tier and review gate decided together. Same firm, same tool, different tiers — because the quality bar and the cost of error differ. That contrast is exactly what an item rewards.

### [trap] The three tier traps
- **Quality-as-reflex** — strongest model for everything. Fails on cost and latency, and it is simply not what "align with task requirements" means
- **Cost-as-reflex** — cheapest model for everything, partner-level analysis included
- **Tier-as-substitute-for-verification** — a bigger model does not license you to skip checking the citation. Tier changes *capability*; Discernment changes *trust*

### [do] Pick three recurring tasks at work. For each: the quality bar, what a wrong answer costs, weekly volume, the tier you'd start on, and the tier you'd escalate to. If all three land on the same tier, check that you actually varied the bar.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Model tier | model seviyesi | Haiku / Sonnet / Opus |
| Trade-off | ödünleşim | Cost ↔ speed ↔ quality; the exam's word for alignment |
| Latency | gecikme | Time to first output — matters in reply-style workflows |
| Volume / throughput | hacim | How many items a day; pushes the tier down |
| Extended thinking | genişletilmiş düşünme | More reasoning budget on the same tier — not new sources |
| Quality bar | kalite eşiği | The written standard a good answer must clear |
` }
  ],
  assignment: {
    ref: "Ödev 1",
    tr: "Altı görev için giriş noktası, yetenek katmanı ve model seviyesi",
    en: "For six tasks, name the entry point, the capability layer and the model tier",
    brief: `Six tasks from the Meridian backlog. For each, name **(a)** the entry point, **(b)** the capability layer (L1/L2/L3), **(c)** the model tier, plus one line of justification that mentions either the quality bar or the cost of a wrong answer. The answers below are what a marking key rewards — argue with them if you can defend it.

| # | Task | Entry point | Layer | Tier | Why |
|---|---|---|---|---|---|
| 1 | Reword 200 support replies a day from an approved template set | Chat — or a Haiku-only Project once it recurs | L1 | **Haiku** | High volume, cheap error, bar already encoded in the template |
| 2 | Answer contract questions from one 40-page client document | **Chat with the file attached** | L1–L2 | Sonnet | The answer is *in the room*; searching adds noise. Restrict to the file and cite the clause |
| 3 | Weekly standing analysis for one client, reused by three associates, per-client NDA | **Project — one per client** | L2 | Sonnet, Opus if sources conflict | Reuse, shared instructions, isolation of client material |
| 4 | Reconcile two datasets whose totals disagree, for a board memo | Chat + **code execution**, output as a table artifact | L2 | **Opus** | Highest cost of a wrong number; arithmetic must be computed, not asserted |
| 5 | Read the client mailbox and auto-send replies to customers | — | **L3 → escalate** | — | Acts on a system, unattended, customer-visible. Needs a Developer plus governance review |
| 6 | Turn a 90-minute transcript into a decisions/actions table for the team | **Artifact** (editable table) | L2 | Sonnet | The deliverable is revised and handed over; a table exposes the missing rows prose would hide |

**Mark yourself honestly.** 2 points per task for a defensible (a)(b)(c); 1 point if the labels are right but the justification never mentions the bar or the cost of error. Under 9 out of 12 → re-read 2.2 and 2.4 before moving on.`
  }
});
