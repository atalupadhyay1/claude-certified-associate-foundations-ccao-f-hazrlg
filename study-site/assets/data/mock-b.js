/* CCAO-F Deneme Sınavı — questions 31-60: D1, D3, D5, D7. */
window.CCAO = window.CCAO || {};
window.CCAO.mock = window.CCAO.mock || { questions: [] };
var M = window.CCAO.mock.questions;

function q(dom, stem, ans, o) {
  return { dom: dom, stem: stem, ans: ans,
    opts: o.map(function (x) { return { t: x[0], w: x[1] }; }) };
}

/* ---------------- D1 · Prompting and Task Execution (8) ---------------- */
M.push(q("D1",
"A prompt reads: 'Summarise the attached feasibility study into the format we use, keep all figures exact, and remember our audience is the investment committee.' Which component is weakest?",
[2],
[["Task — 'summarise' is too vague a verb for a 60-page document.","The verb is bounded and the object is named; the success test is thin, but this is not the missing slot."],
 ["Input — the document is attached, but not delimited or labelled by section.","Real and worth improving, yet the prompt has a definite source. A labelling improvement is secondary to the absent slot."],
 ["Format — 'the format we use' names no container, no fields and no length, so nothing about the structure is specified.","Correct. The reference is to shared knowledge the model does not have (2.1); an unspecified format is unusable *and* uncheckable (3.1, 4.6)."],
 ["Context — 'investment committee' is not enough about the audience.","Thin, yes — but audience is only one of the four context facts, and the format gap blocks the deliverable outright."]
]));

M.push(q("D1",
"Sixty expense claims must each be checked against a policy and classified as compliant / borderline / non-compliant, then a summary written. Which decomposition is best?",
[1],
[["One prompt containing the policy, all sixty claims and both instructions — one pass, one output.","Exceeds what a single pass can hold faithfully, and produces a wall nobody can verify (3.2's test 1 and 3)."],
 ["Map–reduce: the same classification instruction per claim, with a fixed three-field output and a policy citation required; then a merge step that aggregates counts and lists only the borderline cases.","Correct. Volume across parallel items, an output contract that makes each step checkable, and a merge rule that decides what reaches the summary (3.2, 2.3)."],
 ["Role split: one model classifies, a second classifies the same sixty, and disagreements are escalated to a human.","Genuinely useful for ambiguous single artefacts, but two unverified passes over sixty items double cost without establishing ground truth against the policy."],
 ["Chain: extract claims, then extract the policy, then compare everything to everything, then draft.","Compare-everything-to-everything is the combinatorial version of the mega-prompt; the reduction step has no rules (3.2's merge trap)."]
]));

M.push(q("D1",
"After adding a stricter output template, an extra exemplar and a new context paragraph, Claude's draft improves. The associate cannot say what fixed it. What should she have done?",
[3],
[["Regenerated three times after all changes, so the consistent result would confirm the fix.","Repetition of the same prompt measures sampling variance, not causation — a habit that produces false confidence (8.1)."],
 ["Switched tiers to see whether capability was the real cause.","Adds a fourth variable and moves up the cost ladder while the diagnosis is still available for free (8.2)."],
 ["Accepted the improvement and archived the prompt, since a working prompt is the deliverable.","Archiving the winner without attribution means the next failure gets the same shotgun treatment (8.3)."],
 ["Changed one component at a time, re-running on the same input each time, and kept whichever change cleared the named defect.","Correct — the one-variable rule (3.3). Attribution is what makes the fix transferable to the next task."]
]));

M.push(q("D1",
"A partner wants to know what the four most recent audit reports actually say about one control. He has the reports. Which prompting strategy fits the task type?",
[0],
[["Research: restrict to those four files, require the exact sentence and its location for every answer, and permit 'not covered in the reports' as a valid response.","Correct. The answer is inside bounded sources and the deliverable is faithful reporting of them; source restriction plus permitted uncertainty plus citations is the research set (3.4, 4.4)."],
 ["Analysis: ask it to weigh the findings and conclude whether the control is adequate.","Converting a retrieval task into a judgement the sources may not support — and the partner asked what they *say* (3.4's closed-versus-open axis)."],
 ["Brainstorming: generate as many possible interpretations of the control language as it can.","Divergence is for open answer-spaces; here there is a document of record and a correct answer (3.4)."],
 ["Drafting: ask for a polished memo about the control, in the firm's tone.","Produces fluent prose whose content nobody has traced to a passage — the most expensive way to read four PDFs."]
]));

M.push(q("D1",
"A team lead asks Claude for 'the best three ways to reduce churn' and is disappointed by three variations of the same idea. The most useful change to the request is:",
[2],
[["Ask for the best five instead, so more effort goes into ranking.","Still a convergent ask; it just extends the same failure to five items (3.4)."],
 ["Switch to the most capable model, which will generate more creative options.","Tier does not fix an instruction that asks for premature selection — and it is a rung-8 move past several free ones (8.2)."],
 ["Separate the passes: first produce a wide set across named categories with no ranking or justification, then group and select against criteria written beforehand.","Correct. Mixing generation with evaluation collapses the space to the safest few; diverge, then converge (3.2, 3.4)."],
 ["Add 'be creative and think outside the box' to the instruction.","An adjective with no acceptance test; 'creative' cannot be checked, so it cannot be reliably produced (3.1)."]
]));

M.push(q("D1",
"Which TWO additions would most improve a prompt that keeps producing on-brand but generic first drafts for a client newsletter?",
[0,3],
[["An exemplar: one approved past issue, with an instruction to mirror its structure and length rather than its content.","Correct. Generic-but-on-brand is the classic missing-exemplar signature; one accepted output does more than three adjectives (3.1)."],
 ["An instruction to write in a more engaging and distinctive style.","The prompt already asked for brand; restating the desired impression is not supplying the missing standard (3.1)."],
 ["A longer context block describing the client's history, competitors and market position.","Context matters, but too much dilutes; and nothing in the scenario says the model lacked background — it lacked a *standard*."],
 ["A named, testable format contract: word limits, required sections, and which facts must appear verbatim with a source.","Correct. It gives 'good' a checkable shape, and the verbatim rule prevents the generic draft quietly inventing specifics (3.1, 4.6)."]
]));

M.push(q("D1",
"Claude keeps paraphrasing the client's own terminology, which breaks downstream matching against their systems. The most targeted repair is to:",
[1],
[["Ask for a more formal register, since paraphrase is a tone problem.","Register and lexical fidelity are different axes; more formality can paraphrase harder."],
 ["Require the client's field names and defined terms to be reproduced verbatim, list them explicitly, and mark them as non-negotiable in the format block.","Correct. This is a format and verbatim requirement (3.1) — and a verbatim rule expressed as a *list of terms* is testable, unlike 'use our words'."],
 ["Add the client glossary to context and ask Claude to consult it when writing.","Directionally right and weaker: 'consult it when writing' permits paraphrase. Binding it into the output contract is what makes it enforceable."],
 ["Switch to a model tier with a larger context window.","The glossary was presumably already there; capacity is not the defect (2.4)."]
]));

M.push(q("D1",
"A prompt pastes a spreadsheet dump, then a two-paragraph internal opinion about what the data means, and asks for a summary of 'the evidence'. Claude's summary repeats the opinion as a finding. The clearest fault is:",
[3],
[["Task — 'summary of the evidence' is not a specific enough instruction.","Genuinely vague, but the model would have promoted the opinion under almost any phrasing; the framing of the input is the proximate cause."],
 ["Format — no structure was specified, so everything was merged into prose.","Format affects usability and defect visibility (4.6), not which passages were treated as authoritative."],
 ["Context — the prompt did not state who would read the summary.","Audience governs register and selection, not evidentiary status."],
 ["Input — supplied material was not delimited or labelled, so background opinion was indistinguishable from evidence.","Correct. Labelling what is evidence versus background is the discipline 5.1 makes explicit; unlabelled input gets treated as all equally authoritative (3.1)."]
]));

/* ---------------- D3 · Product and Model Selection (7) ---------------- */
M.push(q("D3",
"An associate must answer a question whose definitive answer is a clause in a client contract she already has open, and she is working inside a Project holding that client's documents. Best entry point?",
[0],
[["Ask within the Project, restricting to the attached document and requiring a citation to the clause.","Correct. Reuse is already satisfied by the Project, the source is in the room, and the deliverable is a cited answer rather than an artefact (2.2, 4.4)."],
 ["Research mode, so it can search widely for comparable clauses.","Introduces external material into a question with a definitive internal source — adding noise and unverifiable content (2.2)."],
 ["Create an artifact, since a contractual answer deserves a document.","Q3 is third in the order; there is nothing to iterate or hand over here."],
 ["Start a fresh chat outside the Project to keep it simple.","Loses the loaded instructions and the client's knowledge for no benefit, and invites an answer from model memory (2.1)."]
]));

M.push(q("D3",
"A partner must reconcile three conflicting revenue figures from three sources before a board meeting, where being wrong is materially costly and rework time is short. Which selection reasoning fits?",
[1],
[["Haiku, because the task is essentially arithmetic on three numbers.","A cost-and-speed reflex, and it misnames the task: reconciling conflicting sources is reasoning under conflict, not arithmetic (2.4)."],
 ["The most capable tier, because the cost of an error exceeds the token cost and the task is ambiguous synthesis across conflicting sources.","Correct. Quality bar and cost of a wrong answer both point up — the alignment test the objective actually states (2.4)."],
 ["Any tier, provided extended thinking is enabled, since thinking replaces capability.","Extended thinking adds reasoning budget on a tier; it does not grant grounding or judgement, and treating it as a tier substitute is a named trap (2.4)."],
 ["Whatever the firm's standard model is, to keep configuration uniform.","Consistency has value, but 'uniform by default' is not alignment with task requirements, and here the bar is exceptional (2.4)."]
]));

M.push(q("D3",
"A team runs 5,000 short classification calls a day — label support tickets into six categories — with definitions and one example per category already written. Current setup uses the top model. The best change is:",
[2],
[["Keep the top model; accuracy matters more than cost at that volume.","At 5,000 a day, cost and latency *are* the constraint, and a well-specified classification task is the textbook case for a lighter tier (2.4)."],
 ["Reduce volume by sampling, since fewer items is cheaper.","Changes the business process to fit the tooling, and discards labels the downstream systems need (8.4)."],
 ["Move to a faster, lower-cost tier, keep the definitions and exemplars, and measure the error rate against a fixed sample before committing.","Correct. Cheapest-fit first, with a defined quality bar and a measured check rather than a guess (2.4, 5.3)."],
 ["Replace the exemplars with instructions to classify accurately, to reduce token usage.","Deletes the component that makes a classification task stable (2.3, 3.1) in the name of a saving that is mostly noise."]
]));

M.push(q("D3",
"An associate asks Claude to 'check the finance database for any invoice over 90 days old and email the customer a reminder'. Which response is correct at the level of capability?",
[3],
[["Do it in the best available prompt, since reminder emails are low-risk.","The prompt is not the layer; and the customer-visible irreversible send makes the risk assessment wrong as well as the scope (4.5)."],
 ["Refuse, since AI must never contact customers.","Over-correction; an engineered, reviewed process with a human gate is legitimate at L3 — the objection is to the layer, not to the idea (2.3)."],
 ["Use a connector if one exists; connectors make external actions safe.","A connector changes reach, not authorisation or review (6.3). Write actions require design and an owner (2.3)."],
 ["Name it as L3 — acting on a system, customer-visible, irreversible — and either escalate it as a properly-scoped build or ship the L2 version where a person reviews and sends.","Correct. The capability-layer diagnosis plus the pragmatic split is exactly what the domain expects (2.3, 5.3)."]
]));

M.push(q("D3",
"Forty turns into a working session, Claude begins contradicting constraints agreed at the start. The associate keeps adding reminders to each message. What is the better move?",
[0],
[["Summarise the agreed state and restart a fresh conversation with that summary, moving the durable constraints into the Project's instructions.","Correct. This is precisely the restart / summarise / persist decision (2.1, 6.4) — and per-turn reminders cannot outlast the context that is diluting."],
 ["Keep adding reminders, since the constraints are being respected when restated most recently.","Re-pasting is a maintenance treadmill that solves nothing for the next person or the next session (8.3)."],
 ["Switch tiers so a stronger model attends to the old constraints.","Pays for a capability it does not need; the failure is context, not reasoning (2.4)."],
 ["Ask Claude to list all constraints it remembers, and continue once it lists them correctly.","A recitation test measures nothing about future turns; correct recall now is not compliance later (4.4)."]
]));

M.push(q("D3",
"A deliverable will be revised across three rounds with the client and then converted into a tracker import. Which combination of entry point and format is right?",
[2],
[["Inline prose in the chat for all three rounds, to keep everything in one place.","Inline output is the container for short disposable answers; three revision rounds and an import both break it (2.2, 4.6)."],
 ["An artifact for every round plus a hand-typed CSV afterwards.","Half right — the artifact is correct — and the hand-typed CSV manufactures the transcription errors the format decision was meant to avoid (5.2)."],
 ["A Project for the standing instructions plus an artifact for each round, with the underlying data returned as a structured table from the first version so the import is a projection rather than a re-typing.","Correct. Each of the three questions answered in order (2.2), and the structured table does double duty as verification and as the import source (4.6)."],
 ["Research mode to gather the client's feedback, since input arrives from outside.","No external searching is described; the client's feedback arrives as text you already hold (2.2)."]
]));

M.push(q("D3",
"Which TWO are sound reasons to create a Project rather than continue with careful manual prompting?",
[0,1],
[["The same instructions and constraints must apply across many future conversations and more than one person, so drift is a cost rather than a preference.","Correct. Reuse and shared setup — Q1 of the entry-point decision (2.2) — plus the reason instructions beat reminders (6.4)."],
 ["The material must be scoped deliberately, so a client's knowledge sits apart from other clients'.","Correct. Projects are the isolation boundary that confidentiality actually needs (6.2) — a property manual prompting cannot supply."],
 ["Projects remove the need to verify outputs, since the sources are controlled.","False and dangerous: nothing about configuration removes a verification pass (4.1)."],
 ["Projects let you exceed the context window of an ordinary chat.","A capability claim used as a justification; scoping knowledge is not the same as unlimited context, and staleness becomes the new problem (6.4)."]
]));

/* ---------------- D5 · Configuration and Knowledge Management (7) ---------------- */
M.push(q("D5",
"Which item is placed in the correct Project area?",
[3],
[["A client's current fee schedule, pasted into the instructions so the numbers are always available.","Facts to be cited belong in Knowledge where they carry a source and a version; in instructions they become an unverifiable paraphrase (6.1)."],
 ["The rule 'if a figure is not in the sources, write not in sources' filed as a document in Knowledge.","Behaviour rules belong in instructions, where they load every conversation; as a document, it applies only when retrieved (6.1)."],
 ["A one-off request to summarise this month's incident log, added to Project memory.","Memory is for durable, non-transient facts; a monthly one-off pollutes it (6.1, 6.4)."],
 ["A five-step procedure for producing the weekly variance memo, enabled as a reviewed Skill with a named owner and a version.","Correct. A repeatable *method* is a Skill, and a Skill requires owner, review and version like any software (6.1, 7.3)."]
]));

M.push(q("D5",
"A manager proposes one firm-wide Project for all client work because 'maintenance is easier with one place to update'. The strongest counter-argument is:",
[1],
[["Separate Projects produce better writing quality, because each one is smaller.","A plausible-sounding claim that is not the reason; smaller instruction sets help, but quality is not the crux."],
 ["Isolation follows the confidentiality boundary: with one Project, cross-client retrieval is a matter of individual care, whereas per-client Projects make it a matter of access rights — which are auditable, and which the engagement letters require.","Correct (6.2). The cost argument is real but reversible; a confidentiality boundary enforced by attention is not enforced at all."],
 ["One Project cannot hold enough documents, so a technical limit forces the split.","Invented constraint; the objection to consolidation is governance, not capacity."],
 ["Maintenance is genuinely easier centrally, so accept the risk and review quarterly.","Puts a document review in place of an access control, and trades the client's contract for the manager's convenience."]
]));

M.push(q("D5",
"Claude, using a Drive connector, answers that a client never sent the document requested. The associate knows it arrived yesterday. What is the correct interpretation?",
[2],
[["The connector is broken; escalate to IT as a fault.","A fault is one of four causes, and naming it first forecloses the three that need no ticket (8.1)."],
 ["The document is unsearchable because it arrived by email rather than Drive.","Possible in some setups, but stated as fact from the scenario, and it misses the general limit that applies either way."],
 ["Retrieval is not exhaustive and may be delayed by indexing: 'not found' is evidence about the search, not about the world — so check the source folder directly, and put that limit into the Project's instructions.","Correct (6.3). The named trap is treating a false negative as proof of absence; the durable fix is the instruction that says search is not exhaustive."],
 ["The model's reasoning is unreliable here; switch tiers and re-ask.","A grounding and indexing problem, not a capability problem (2.4); a stronger model still searches the same incomplete set."]
]));

M.push(q("D5",
"A Project's instructions have grown to thirty lines as each new complaint added a rule. Output quality has fallen. The correct diagnosis is:",
[0],
[["The rules likely conflict and dilute; consolidate to testable non-negotiables at the top, move duplications into Knowledge, and record the changes with reasons in a change log.","Correct (6.4). Accumulated instructions are the classic decay path — and a change log is what prevents the deleted rule being re-added next quarter."],
 ["The instruction block is too long, so it should be deleted entirely and managed per chat.","Correct observation, fatal remedy: it returns everyone to drifting, re-typed constraints (2.2, 6.4)."],
 ["Rules in instructions are optional to the model; move them all into uploaded documents.","Backwards: instructions load every conversation, documents are retrieved — behaviour belongs in instructions (6.1)."],
 ["The tier is too weak to follow thirty rules; raise it.","A cost-shaped answer to a configuration problem, and it leaves the conflicts in place (8.2)."]
]));

M.push(q("D5",
"Two months ago an associate asked Claude to 'remember' a client's revised escalation threshold. Reports have since used the old threshold while the memory held the new one, and nobody can say which is authoritative. The lesson is:",
[3],
[["Memory should never be used, since it is inherently unreliable.","Over-correction; the failure is unowned and unversioned persistence, not persistence itself (6.1)."],
 ["Memory should hold only numbers, since facts age better than preferences.","Invented and backwards: quantitative thresholds are exactly what must live in a citable document."],
 ["The fix is to add an instruction saying to prefer memory over documents.","Which source wins is precisely what must not be left to a contest between instructions (6.4)."],
 ["Durable, citable thresholds belong in Knowledge with an owner, a version and a superseded-date; memory is recalled, not enforced, and cannot be audited — so it must never be the system of record (6.1, 6.4).","Correct. This is the decay case: an important fact persisted in an unauditable place, and the repair is architectural, not vigilance."]
]));

M.push(q("D5",
"A client issues a revised data-handling document. The associate uploads the new version into the Project's Knowledge and continues. What must also happen?",
[1],
[["Nothing else — the newest document is naturally the most similar and so will be retrieved.","Confidence in retrieval over a polluted set is the exact assumption 6.4 warns about; relevance is not authority."],
 ["Remove the superseded document the day it is superseded, and run the Project's golden test cases to confirm behaviour has not regressed.","Correct (6.4). Keeping it 'for reference' is how the wrong version wins; golden tests are what tell you the change took effect."],
 ["Add an instruction telling Claude to always prefer the latest version.","A rule competing with a retrieval outcome, and one that can be diluted by anything added later (6.4, 7.2)."],
 ["Rename the new file to match the old one, so references still resolve.","Destroys provenance and version clarity — and any citation to the old file now points at different content."]
]));

M.push(q("D5",
"An associate enables a Skill firm-wide because two teams asked for it. Three weeks later outputs on a regulated deliverable stop including a required verification step that the Skill had removed from its process. What failed?",
[2],
[["The Skill's documentation; better docs would have surfaced the change.","Reasonable, and it accepts the premise that the problem was communication. Nobody was positioned to notice at all."],
 ["The two requesting teams, for not testing it on their own cases.","Displaced accountability; the enablement decision was not theirs to make or to scope (7.3)."],
 ["The enablement decision: a shared capability that shapes everyone's output was enabled without scoped rollout, review against current requirements, owner, version or change control — so a defect became firm-wide policy silently.","Correct (7.3, 6.1). A Skill is software with standing authority, and 'enable firm-wide because two teams asked' is exactly the failure shape the lesson names."],
 ["The model, for not flagging that the verification step was missing.","Attributing governance to model behaviour (4.4); nothing obliges a model to notice an absent step its instructions removed."]
]));

/* ---------------- D7 · Troubleshooting and Optimization (6) ---------------- */
M.push(q("D7",
"A report generator produced clean output for two months, then output began losing the exception section *only* on long documents — never on short ones, and never in the first run of the day. What does the timing suggest?",
[0],
[["A context-volume problem: long documents crowd the window, and the pattern is load-dependent rather than random — so split the extraction per document, or summarise and restart, before touching anything else.","Correct. Timing plus conditionality identifies the mechanism: something only fails as material grows, which is the context signature (8.1) and points to a rung 3–4 fix (8.2)."],
 ["Model instability, best addressed by raising the tier for stability.","Instability would not correlate with document length or with the first run of the day (2.4)."],
 ["A broken connector, since the missing content is only sometimes retrievable.","Nothing in the pattern points to reach or indexing; a connector fault would not be length-dependent (6.3)."],
 ["Prompt degradation over the two months, so the prompt should be rewritten.","Prompts do not degrade; and rewriting would discard the only signal that explains the failure (8.1)."]
]));

M.push(q("D7",
"Claude's answers to a recurring internal question are correct but twice as long as anyone reads. Applying the fix ladder, the first two moves are:",
[1],
[["Escalate for a templating solution, then move to a lower tier for brevity.","Top of the cost ladder for a formatting problem; both rungs are late and the first is unnecessary (8.2)."],
 ["State the length limit and format explicitly in the request; if that fails, promote a 'answers in three sentences or fewer' rule into the Project's instructions so it applies thereafter.","Correct. Rung 2 (repair one component) then rung 6 (persist into configuration) — cheap, specific, and durable (3.3, 6.4, 8.3)."],
 ["Ask it to be more concise, then add an exemplar if that fails.","The first half is an adjective rather than a specification (3.1), so 'it failed' teaches nothing about why."],
 ["Switch tiers, since verbosity is a capability trait.","Verbosity is a format property here, not a capability limit — and the switch costs money to change a wording habit."]
]));

M.push(q("D7",
"A workflow was fixed three weeks ago by changing one instruction; nobody wrote it down. Today a colleague has re-added a similar instruction 'for clarity', and the old defect is back. What is the correct response?",
[3],
[["Delete the re-added line and tell the colleague not to change instructions.","Fixes this instance with zero learning, and leaves instructions with no owner, version or review — the condition that allowed it (6.4)."],
 ["Disable both instructions and manage the rule per chat again.","Abandons configuration because configuration was unmanaged; the defect was governance, not persistence (6.1)."],
 ["Re-derive the fix by testing both instructions against recent outputs.","Worth doing if the cause is genuinely unknown — but here it is known, and re-paying the diagnosis is the whole waste (8.3)."],
 ["Restore the state, then close the actual gap: record the rule with owner, version and the reason in a change log, and add the golden test case that would have caught this.","Correct (8.3, 6.4). The log prevents the silent re-addition and the test prevents the silent recurrence — which is what makes a fix durable instead of recoverable."]
]));

M.push(q("D7",
"An optimisation proposal for a document-review workflow: 'Claude now pre-checks every file, so drop the reviewer on 200 low-risk items a month; keep the reviewer on the 15 high-risk ones.' What is the correct assessment?",
[0],
[["A defensible calibration if the low-risk class is defined by criteria written beforehand and the sampling is checked — because it moves review effort to where the error cost is, rather than removing a control wholesale.","Correct (4.5, 8.4). Risk-tiered gates are optimisation; the load-bearing conditions are that the classification rule is pre-defined, auditable, and spot-checked."],
 ["Unacceptable: every item must receive identical human review, or the process is not controlled.","A rule that sounds rigorous and is unaffordable, so it gets skipped under load — an unaffordable gate is worse than a designed sample (4.5)."],
 ["Ideal — the AI pre-check is a review step of equivalent standing performed by a faster party.","False equivalence: the AI pre-check is generation, not verification, and the accountable act has not moved (4.5)."],
 ["Unacceptable because 200 versus 15 is too small a difference to justify any change in review intensity.","Wrong axis entirely: the justification is error cost and reversibility, not counts (4.5)."]
]));

M.push(q("D7",
"After a Claude product update, a workflow that had been stable for months begins to mis-format its output tables. Two associates each adjust their prompts differently, and by the following week output is fine — and nobody can say what was wrong. Which TWO statements describe what is missing?",
[0,2],
[["No change log, so the environment moved and no record exists of what was tried, by whom, or why any particular fix was kept.","Correct. With no log, 'it works again' is indistinguishable from 'it was never fixed' — and the next change is unmanaged (6.4, 8.3)."],
 ["Nothing is missing, since the outcome was correct and diagnosis has no business value.","Confuses outcome with control; a defect you cannot explain is a defect you will meet again (8.3)."],
 ["No golden test cases, so the regression surfaced through user complaints rather than a check the team ran on purpose.","Correct. A few fixed cases covering format and required fields is the cheapest detector for exactly this class of change (6.4)."],
 ["An insufficiently capable model, since a stable workflow should have been immune to a product update.","Immunity to product change is not a property any tier provides; the mitigation is testing and versioning, not capability (6.4)."]
]));

M.push(q("D7",
"A team reports that 'Claude is worse at our analysis than it used to be'. Investigation shows that in the same period the source spreadsheet gained two columns, the client changed a tab name, and the team stopped recording which figures had been verified. What is the correct diagnosis?",
[3],
[["Three concurrent changes: escalate to a Developer to stabilise the pipeline before resuming.","Escalation is premature and disproportionate: two are data-format changes fixable at L2 (2.3, 8.2)."],
 ["Model behaviour has drifted, which explains why all three changes mattered.","A causal story invented to explain the complaint; nothing in the evidence attributes anything to the model (8.1)."],
 ["The team's expectations rose, so perceived quality fell.","Possible, and it does not explain the concrete input changes — the trap is treating a diagnosable defect as a soft one."],
 ["Symptom-onset coincides with upstream input and process changes, so the cause is in the environment and the workflow — including an abandoned verification habit, which is what makes the damage invisible.","Correct. 'Worse than it used to be' with a coincident change is a change investigation (8.1); the lost verification record explains why nothing was caught."]
]));
