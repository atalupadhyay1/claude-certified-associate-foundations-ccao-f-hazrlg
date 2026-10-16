/* Curriculum — Section 6 */
window.CCAO = window.CCAO || {};
window.CCAO.curriculum = window.CCAO.curriculum || { sections: [] };
var S = window.CCAO.curriculum.sections;

S.push({
  id: "s6", num: 6, minutes: 23, domain: "D5",
  tr: "Yapılandırma ve Bilgi Yönetimi",
  en: "Configuration and Knowledge Management",
  blurb: "Domain 5, 12%, about seven items. Where Description stops being something you type every day and becomes something you build once — and then maintain.",
  quiz: "q6",
  lessons: [
    { id: "l6-1", ref: "6.1", mm: "6:23", dom: "D5",
      tr: "Dört Alan, Tek Soru",
      en: "Four Areas, One Question",
      objective: "Configure Claude Projects with instructions and knowledge sources.",
      body: `
A Project has four places to put things, and almost every badly configured Project is one where everything went into a single one of them. The question that sorts them is: **what makes this repeatable without me saying it again?**

### [fact] The four areas
| Area | Türkçe | What belongs | What does not | How it goes wrong | How to test it |
|---|---|---|---|---|---|
| **1 · Instructions** | Talimatlar | Standing rules: role, scope, house style, the grounding rules, what to do when information is missing | Facts about this client; anything that changes weekly; one-off asks | Becomes a 900-word essay; constraints buried in prose get ignored | Ask something that violates exactly one rule and see whether it holds |
| **2 · Knowledge** | Bilgi | The documents Claude must be able to cite: contracts, briefs, metric definitions, approved exemplars | Anything confidential to *another* client; anything superseded | Stale versions; duplicates; superseded files never removed | Ask "what is the current X?" and see which file it names |
| **3 · Skills** | Beceriler | Reusable *procedures* — a report, a format, a check — with their own instructions and sometimes code | Anything untested, unowned, or from outside the firm without review (→ 7.3) | A Skill encodes its author's assumptions, inherited by everyone | Run it on a case the author never tested |
| **4 · Memory** | Bellek | Durable, correct, non-secret facts: preferences, conventions, terminology | Client-confidential material you must isolate; anything transient; anything you're unsure of | It persists a *wrong* fact with total confidence, permanently | Ask the question cold in a new conversation and see what comes back unbidden |

### [how] The sorting rule, one line each
~~~
It is a RULE about how to work          -> Instructions
It is a DOCUMENT that must be cited      -> Knowledge
It is a PROCEDURE that runs in steps     -> Skill
It is a FACT that should just be known   -> Memory
It is a ONE-OFF request                  -> the chat, not the Project
~~~

::tip the distinction that carries marks | Instructions versus knowledge is **behaviour versus evidence**. Put a client's definition of "gross margin" in *Knowledge*, so it can be cited and versioned; in Instructions it becomes an unverifiable paraphrase. Put "never round figures" in *Instructions*, so it applies everywhere; in a document nobody attaches, it applies nowhere.

### [how] Three things a Project is not
- **Not a substitute for context in the prompt.** A Project loads standing material; this month's numbers still have to arrive as files or as data in the message
- **Not shared across clients by default.** Isolation is its own lesson (6.2), and an exam favourite
- **Not self-maintaining.** All four areas decay. 6.4 is about the maintenance you must schedule, because Domain 5's final objective is literally "inform, maintain, and update"

### [case] Meridian
Before the freeze there was one Project, "Meridian – General", containing everyone's instructions, three versions of the same style guide, two clients' briefs, and a line reading "the Ardan numbers are in the shared drive". Afterwards, each client gets four deliberately *small* areas: instructions = the grounding rules from 4.4 plus house style plus escalation triggers; knowledge = this cycle's documents only, with superseded ones removed on the day they are replaced; skills = only the two reviewed procedures; memory = naming conventions and nothing confidential. The instruction text got shorter and the outputs got better — the counter-intuitive result every team rediscovers.

### [do] Open your most-used Project. Write what is in each of the four areas. Move anything that is in the wrong one, then delete one thing from Instructions — a rule duplicating something in Knowledge, or a fact pretending to be a rule.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Project | Proje | Standing instructions + knowledge, reused per context |
| Custom instructions | özel talimatlar | Behaviour rules loaded into every conversation in the Project |
| Knowledge sources | bilgi kaynakları | Uploaded documents available to be cited |
| Skill | Skill / beceri | A reusable procedure packaged with its own instructions |
| Project memory | proje belleği | Persisted facts — scoped, and able to persist errors too |
` },

    { id: "l6-2", ref: "6.2", mm: "5:20", dom: "D5",
      tr: "Her Müşteriye Bir Project",
      en: "One Project Per Client",
      objective: "Configure Projects so knowledge stays isolated and maintainable.",
      body: `
The title is the recommendation, and it is the answer to a surprising number of exam items. Isolation is not tidiness. It is the configuration that turns a confidentiality obligation from something people must *be careful about* into something the setup enforces.

### [why] Three reasons, in order of what they cost you
1. **Confidentiality.** Client A's material must not be reachable while working on Client B's engagement. A shared Project makes cross-contamination a matter of individual attention; separate Projects make it a matter of access rights — and access rights are auditable, attention is not
2. **Grounding integrity.** Retrieval inside a Project searches what is in it. Widen the set and you widen the chance that the *wrong* document is the most similar one. "Which file did that come from?" is only answerable when the candidate set was narrow
3. **Maintainability.** A per-client Project is updated when that client changes. A general Project can only be updated to the least common denominator of everyone's needs — which is how good instructions get diluted to death

### [how] The structure that holds
~~~
PROJECT   "Ardan Textiles - 2026 H1"      <- name states client + scope + period
  Instructions : grounding rules . house style . what stays verbatim .
                 escalation triggers . "if not in sources, say so"
  Knowledge    : current brief . metric definitions . approved exemplars .
                 THIS CYCLE's data files only
  Skills       : variance memo . KPI pack      (both reviewed, owned, versioned)
  Memory       : naming conventions only - no client-confidential facts
~~~

Deliberately boring, deliberately small. Two properties matter more than the layout: **superseded material leaves the day it is superseded**, and **the Project has a named owner** (6.4).

### [how] When per-client is the wrong answer
| Situation | Do instead |
|---|---|
| A reusable method across clients (the variance memo format) | A **template Project** you duplicate, or a reviewed **Skill** — never a shared working Project |
| A firm-wide house-style rule | Carry it into every client Project from one source of truth, or make it a Skill |
| Internal-only work, no client data | A single "Meridian internal" Project is fine — the isolation requirement follows the *confidentiality boundary*, not the org chart |
| A joint engagement across two clients | Two Projects, plus an explicit decision by whoever owns the NDAs. Do not solve it with a third, merged Project |

### [trap] How this becomes an item
- "An associate wants one Project for all engagements to save setup time" — the tempting wrong answer, and the *reason* it is wrong is confidentiality, not convenience
- "Two clients' files sit in one Project and the summary mixes them" → the right answer is **restructure the isolation**, not "add an instruction telling it to keep them separate". Instructions do not create access boundaries
- Confusing *sharing a Project with your team* (fine within the client boundary, and rather the point) with *sharing knowledge across clients* (the failure)

### [case] Meridian
Burak is asked to enable one shared "Consulting" Project covering all 90 engagements. He refuses in writing, with the Kuzey Logistics clause attached: that engagement letter bars personal data from reaching any third-party system, so a Project containing Kuzey material cannot double as the workspace for another client's work. What ships instead is a **template** — instructions and skill definitions duplicated per client, knowledge isolated per client, one owner per Project. The template is what makes isolation *cheap*, and cheap is the only way isolation survives contact with a deadline.

### [do] Count the Projects you actually have. For each, ask: does it cross a confidentiality boundary? Then answer in one line — what would stop a leak if two clients shared it? If the answer is "the person being careful", you have your first restructure.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Isolation | yalıtım | Keeping one client's material unreachable from another's work |
| Confidentiality boundary | gizlilik sınırı | Where information must not cross, set by contract or law |
| Least privilege | en az yetki | Access limited to what the role actually needs |
| Template Project | şablon proje | A duplicated starting point, not a shared workspace |
| Superseded | yürürlükten kalkmış | Replaced material that must leave, not stay "just in case" |
` },

    { id: "l6-3", ref: "6.3", mm: "5:18", dom: "D5",
      tr: "Connector'lar ve Sınırları",
      en: "Connectors and Their Limits",
      objective: "Manage uploaded knowledge and connectors (e.g. Google Drive, Gmail).",
      body: `
A connector turns "attach the file" into "search what you can reach". That is a capability jump *and* an assumption jump, because people begin treating a connected system as though it were truth. The exam's framing is management: who may connect, to what, with what limits, and how it is revoked.

### [fact] What a connector actually is
- A permissioned path from Claude to an external system — Drive, Gmail, Calendar, GitHub, a database — typically via a first-party integration or MCP
- Scoped to **the identity that authorised it**: the access Claude has is that person's access, not the team's, not the firm's
- Mostly read-oriented; where it can *write*, that is an **L3** design decision with an owner (2.3, 5.3)

### [fact] The six limits, and the mistake each one prevents
| Limit | The reality | The mistake it prevents |
|---|---|---|
| **Permission scope** | It sees one account's reach | Assuming a shared connector means team-wide visibility |
| **Index latency** | Newly created or edited material may not be findable for a while | Concluding "the file doesn't exist" an hour after it was saved |
| **Search is not exhaustive** | Retrieval returns *relevant-looking* items, not *all* items | Treating "nothing found" as "nothing there" — the single most examinable limit |
| **No authority** | A connected folder holds drafts, last year's deadlines and two versions of the same budget | Citing whatever is most similar instead of asking which version is authoritative |
| **Format blind spots** | Content inside images, some tables, and locked files may not come through | Believing a document is unreadable because a search missed the figure inside it |
| **Governance surface** | Connections outlive roles, projects and NDAs | Keeping a connector alive after the engagement ends |

::warn the sentence to memorise | **A connector changes where the answer comes from; it does not change whether you still have to verify it.** Retrieval without citation checking is hallucination with a nicer provenance story.

### [how] Four questions an admin must be able to answer
1. **Which data is allowed?** A list, not a vibe. Anything governed by an engagement clause needs an explicit yes or no
2. **Who authorised it, and does that still match their role?** The identity *is* the permission; review it on every role change
3. **What is logged, and who reads it?** An unlogged connector is an unmanaged one
4. **How is it revoked, and how fast?** Leaving a project must remove access the same day, not at the quarterly review

And two practices that make a connector safe inside a workflow rather than merely available:
- **Narrow the scope.** A Drive connector pointed at one client folder beats one pointed at the whole drive — better precision *and* a smaller blast radius
- **Keep the citation rule.** Connected results still need file + location + quoted passage, exactly like an attachment (4.4). "It came from the connector" is not a verification

### [case] Meridian
Mert wires Drive and Gmail into the Kuzey Logistics Project and reports a two-day saving. Then, in one week: he asks about a document created that morning and Claude says it isn't there — index latency, nothing broken; Elif reads "no relevant emails found" as "the client never raised this" and says so in a meeting — **the** limit, now a reputational one; and the Drive scope covers the whole İstanbul team folder, which includes Poyraz Gıda's M&A material, which Kuzey's clause would never have permitted. Three failures, one root cause: the connector was configured as an *access* decision rather than a *governance* one. Fixes: per-client folder scoping, an explicit line in the Project instructions that search is not exhaustive, and a monthly access review owned by Burak.

### [do] List every connector in use around you and who authorised it. For one of them, ask about something you know exists but was created today, and watch what it says. Then ask "how would I know this search was complete?" — the answer to that question is the control you are missing.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| Connector | bağlayıcı | A permissioned path from Claude to an external system |
| Scope | kapsam | Which data, and which identity, the connector can reach |
| Indexing | indeksleme | Material becoming searchable — with a delay |
| False negative | yanlış menfi | "Not found" when it exists. Never proof of absence |
| Access review | erişim incelemesi | Periodic check that permissions still match roles |
| Revocation | erişimin geri alınması | Removing access fast, on a role or engagement change |
` },

    { id: "l6-4", ref: "6.4", mm: "6:11", dom: "D5",
      tr: "Kalıcı Talimatlar, Eskiyen Yapılandırmalar",
      en: "Persistent Instructions and Aging Configurations",
      objective: "Create effective system-level instructions; inform, maintain and update configurations.",
      body: `
Domain 5's least glamorous objective has the highest decay rate of any topic on the exam. A prompt you forget is a one-off; an instruction you save is a **standing decision that applies to everything after it** — including the day after the client redefines "gross margin". Configuration is a liability as well as an asset, and this lesson is the liability half.

### [how] Writing instructions that survive
| Rule | Why | Weak | Strong |
|---|---|---|---|
| **One instruction, one behaviour** | Compound rules get half-followed | "Be concise, accurate and professional" | "Do not exceed 400 words" |
| **Testable** | You cannot maintain what you cannot check | "Cite sources" | "Every figure carries file name and section" |
| **Positive phrasing** | "Don't do X" with no replacement leaves a hole to fill | "Don't invent numbers" | "If a number is not in the sources, write 'not in sources'" |
| **Short and ordered** | Long lists dilute; a constraint at position 600 of a 900-word block loses influence | A wall of guidance | Twelve lines, non-negotiables first |
| **Owner and version** | Otherwise nobody can answer "is this still right?" | Untitled, undated | "v4 · 12 Mar · owner Selin" |
| **Says what to do when it can't** | The most-skipped clause, and the one that prevents most fabrication | — | "If the answer is not in the sources, say so" |

### [fact] The decay list — what goes stale, how fast, and how you notice
| What | Decays because | Cadence | First symptom |
|---|---|---|---|
| Knowledge files | The client issues a new version | Immediately, on each superseding document | Citing last quarter's figure, confidently |
| Definitions | A metric is re-based | Quarterly | Answers correct per an old definition |
| Org facts and contacts | People leave | Quarterly | Plausible but wrong owners |
| Instructions | Policy moved, or model behaviour moved | Quarterly, plus after any product change | It "ignores" a rule that a later rule now contradicts |
| Memory | A one-off experiment got persisted as fact | After anything surprising | A confidently wrong standing fact nobody wrote down |
| Skills | The process changed underneath | Per process change | Output following a procedure nobody follows any more |
| Connectors | Roles and engagements ended | Monthly access review | Reach into material the current scope should not include |

### [how] Maintenance as a practice, not a virtue
1. **Version and date every instruction block.** One line, and it converts an argument into a lookup
2. **Keep a change log with reasons.** "v4 — removed the rounding exception; cause: the Ardan memo" is what stops a future you re-adding it
3. **Keep 3–5 golden test cases per Project** — a question plus the answer it must produce — and run them after any change. The smallest possible regression test, and it catches most real decay
4. **Review memory deliberately.** It is the one area with no source document to correct: check what it currently believes, delete what it got wrong, and never let a confidential fact live there for convenience
5. **Retire, don't archive, inside the Project.** Superseded knowledge must *leave* the retrievable set; keeping it "for reference" is how the wrong version wins a relevance contest

::warn restart · summarise · persist | The same decay logic governs the *conversation*, and Domain 3 lists it as an objective in exactly these words. **Persist** what is durable — into instructions or a document, not into your memory of the chat. **Summarise** when a long thread has accumulated decisions worth carrying. **Restart** when the thread is long enough that early constraints are influencing less — and restart *early*, because drift is not visible from inside the thread that has drifted.

### [case] Meridian
The finding nobody put in the post-mortem: the rounding instruction. The Project's instructions read *"reproduce figures verbatim, except percentages, which may be rounded to the nearest whole number"* — added in a rush during a formatting complaint, and precisely the licence that let a 0.6% become a 1%. Six months of "verified" decks had a rule inside them authorising the drift. The fix was not more diligence; it was **(a)** deleting the exception, **(b)** writing "v4 — rounding exception removed; cause: Ardan memo" in the change log, and **(c)** a golden test case: *give me segment percentages; they must sum to 100.0 and carry two decimals*. Configuration without a change log is how a mistake becomes a policy.

### [do] Open your most-used instruction block. Count the lines that are not testable; rewrite or delete them. Add the owner, the date, and the clause you know is missing — what to do when the answer isn't in the sources. Then write three golden test cases and run them today.

### Terms · Anahtar terimler
| English | Türkçe | In one line |
|---|---|---|
| System-level instruction | sistem düzeyinde talimat | Applies to every conversation in scope, not one prompt |
| Change log | değişiklik kaydı | What changed, when, and why |
| Golden / regression test | altın test | A fixed case that catches silent breakage |
| Decay | bozulma / bayatlama | Configuration drifting away from reality |
| Retire | emekliye ayırmak | Remove, so it stops being retrievable — not archive |
` }
  ],
  assignment: {
    ref: "Ödev 5",
    tr: "Bir Project'i dört alana göre yapılandırın",
    en: "Configure a Project against the four areas",
    brief: `**Scenario.** You are setting up the **Poyraz Gıda** Project at Meridian. Confidential M&A pipeline; the engagement letter bars sharing non-public deal information outside the firm; three associates will use it; the recurring work is (1) summarising incoming due-diligence documents, (2) drafting status updates to the partner, (3) maintaining a running issues list.

Place each candidate into one area. Every item may be used once. **Six of them are decoys** — they belong in a different area, in the chat, or nowhere.

| Area | Candidates |
|---|---|
| **Instructions** | "Summarise in 5 bullets or fewer" · "Never mention any client other than Poyraz Gıda in an output for this engagement" · "Non-negotiables first: facts only from the knowledge sources; if absent write 'not covered in sources'; reproduce all figures, names and dates exactly" · "Poyraz Gıda's FY24 EBITDA is 4.1M" |
| **Knowledge** | The current NDA and engagement-letter extract · The 14 due-diligence documents for this cycle · Last year's superseded issues list, "for reference" · The firm-wide approved status-update template |
| **Skills** | The "status update" procedure (reviewed, owned, v2) · The "issues list extractor" (Mert's unreviewed Skill from the shared drive) |
| **Memory** | Office naming conventions · "Poyraz's CFO dislikes long emails" · Every client's confidential facts, for cross-referencing |
| **Chat, not Project** | "Find me a hotel near their Ankara office" · "What does clause 7 of their NDA say?" (a one-off question about a document already in Knowledge) |

**Key, with reasons.**
- **Instructions** — the format rule, the isolation rule, and the non-negotiable grounding block. The FY24 EBITDA figure is a **decoy**: it is a *fact to be cited*, so it belongs in Knowledge where it has a source and a version. A figure sitting in instructions is an unverifiable assertion that will outlive the document it came from
- **Knowledge** — NDA extract, the 14 current documents, the status-update template. Last year's superseded issues list is a **decoy and an error**: superseded material must leave the retrievable set, or it wins relevance contests
- **Skills** — only the reviewed, owned, versioned one. The shared-drive Skill is a **decoy** and a governance failure: a Skill is software, so it needs an owner and a review before anyone enables it (7.3)
- **Memory** — naming conventions only. "The CFO dislikes long emails" is a defensible borderline; but if it must be *enforced*, put it in instructions, because memory is recalled, not applied. Cross-client confidential facts are a **hard no**: that is the exact configuration that breaks the confidentiality boundary
- **Chat** — both of them. Neither is a standing instruction, and the clause-7 question is one-off retrieval over material the Project already holds

**Marking question 1.** Tone rule: instructions or memory? **Instructions.** Memory is recalled, not enforced — a control that may or may not surface is not a control.

**Marking question 2.** Which areas need a named owner and a version, non-optionally? **Instructions, Skills and Knowledge** all do. Memory is the one that most often has neither — which is exactly why it needs a review cadence (6.4).`
  }
});
