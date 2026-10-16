/* Section quizzes 1-4. opts[i] = { t: text, w: why it wins or fails }; ans = correct indices. */
window.CCAO = window.CCAO || {};
window.CCAO.quizzes = window.CCAO.quizzes || [];
var Q = window.CCAO.quizzes;

Q.push({ id:"q1", section:"s1", dom:"meta",
  title:"Section 1 · Giriş — the exam, the framework, the case", titleTr:"Bölüm 1 testi",
  questions:[
  { dom:"meta",
    stem:"An associate is deciding how much study time to give each domain. Output Evaluation and Validation is 21% of the exam and Troubleshooting is 10%. What is the correct inference?",
    ans:[3],
    opts:[
      {t:"Study all seven domains evenly, because a scaled score needs broad competence.", w:"Even distribution is what the blueprint argues against. Weights are the allocation signal — and 'broad' is not the same as 'passing'."},
      {t:"Skip Troubleshooting entirely; six items cannot decide the outcome.", w:"Over-correction. Six items at 10% is real, the frameworks there are short, and skipping it converts free marks into a retake."},
      {t:"Weight study by domain size only, so D2 gets twice the hours of D7.", w:"Half right. Weight alone ignores your measured weakness, which is the other half of the calculation."},
      {t:"Weight study by domain size *and* your measured weakness in it, objective by objective.", w:"Correct. 8.5's grid is exactly weight × weakness, scored per objective rather than per domain."}]},

  { dom:"meta",
    stem:"A colleague says: 'Just memorise the feature list — Projects, artifacts, research mode, Skills — the exam asks you to name them.' What is wrong with that plan?",
    ans:[1],
    opts:[
      {t:"Nothing is wrong; naming features is Domain 3's main objective and it is worth 12%.", w:"Domain 3's objective is to *select* the appropriate feature for a scenario, not to name it. The colleague has turned a judgement objective into a recall one."},
      {t:"The exam is scenario-based: it asks what you would do. Feature vocabulary only earns marks as a step inside a decision.", w:"Correct. Every item places you in a situation and asks for the most appropriate action; naming things is instrumentally useful, never the thing scored."},
      {t:"Feature naming matters, but only in the Governance domain.", w:"Invented linkage. Governance items concern permitted use, data sensitivity, policy and ethics — not naming product features."},
      {t:"You should memorise the pricing of features instead, since cost drives selection.", w:"Cost is one axis of tier alignment, but no item asks for a price, and pricing recall scores nothing on a scenario."}]},

  { dom:"meta",
    stem:"Deniz froze AI use after a fabricated statistic reached a client. Using the 4D framework, which competency was *structurally* missing — the one the freeze is really about?",
    ans:[3],
    opts:[
      {t:"Description — the prompts did not restrict sources tightly enough.", w:"True at the level of one prompt, but the firm's problem was not loose prompts. It was that nobody was required to check. Wrong door, right building."},
      {t:"Delegation — the analyst should not have delegated that task to AI at all.", w:"Plausible and wrong. Drafting a summary from supplied data is delegable; the missing element was a verification gate before an irreversible external send."},
      {t:"Diligence — the firm had no written AI policy.", w:"Diligence is implicated, but 'no written policy' is a document-level diagnosis. Meridian had obligations; they were not enforced at the point of use."},
      {t:"Discernment — nobody opened the cited source, because output was approved by reading rather than by checking.", w:"Correct. The one pass that would have caught it — grounding — was not required of anyone. Trust in fluency replaced verification."}]},

  { dom:"meta",
    stem:"Which statement about automation / augmentation / agency is correct?",
    ans:[0],
    opts:[
      {t:"Agency means shaping what Claude knows and how it behaves, rather than directing each specific action — and the decision stays yours.", w:"Correct. Agency is configuration-level engagement: Projects, instructions, standing rules. You guide independence; you never delegate accountability."},
      {t:"Automation is appropriate whenever the task requires professional judgement.", w:"The reverse: judgement under ambiguity is the classic failure of the specification test and stays human (5.4)."},
      {t:"Augmentation means the model produces the final output and a human signs it.", w:"A signature without inspection is rubber-stamping — a failed control, not augmentation (4.5)."},
      {t:"The three modes differ mainly in how many tokens the task consumes.", w:"Invented. They differ in who decides and who reviews."}]},

  { dom:"meta", type:"multi", need:2,
    stem:"A candidate is planning a retake after failing. Which TWO statements about the exam's rules are correct?",
    ans:[1,3],
    opts:[
      {t:"The domain percentages on the score report determine whether you passed.", w:"The report says otherwise: pass/fail rests on the total scaled score, and per-domain percentages are provided only to help you understand performance."},
      {t:"The waiting period grows with each failed attempt: 14, then 30, then 90 days.", w:"Correct, per the guide's retake policy."},
      {t:"Fail three times and you are barred from the exam for twelve months.", w:"Distorted. The rule is a maximum of four attempts in a rolling twelve-month period, per exam — failing one does not block registering a different one."},
      {t:"The fee applies to each attempt.", w:"Correct — worth knowing before you build a plan around 'just sit it again'."}]},

  { dom:"meta",
    stem:"Why does the course give six lessons to Output Evaluation and Validation and five to Workflow Integration?",
    ans:[2],
    opts:[
      {t:"Because Domain 2 has more objectives, and lesson count tracks objective count.", w:"Seductive and false: D2 has six objectives, but the guide gives no per-objective weights, and the course states its allocation as weight-driven."},
      {t:"Because evaluation is easier, so more lessons are needed to reach the same level.", w:"Inverts the reasoning. More lessons are allocated because the domain is both heaviest and the crux of the role."},
      {t:"Because section time follows each domain's reported weight, so study effort mirrors the exam's shape.", w:"Correct. 21% is the heaviest single area, so the section is the largest. The course is built the way the exam is built."},
      {t:"Because workflow questions are governance questions in disguise, covered in Section 7.", w:"The D4/D6 overlap is real, but it is not why the lesson counts differ."}]}
]});

Q.push({ id:"q2", section:"s2", dom:"D3",
  title:"Section 2 · Ürün ve Model Seçimi — Product and Model Selection", titleTr:"Bölüm 2 testi",
  questions:[
  { dom:"D3",
    stem:"An associate produces a weekly analysis for the same client, reused by four teammates under identical constraints. She re-types her instructions into a fresh chat every Monday. Using the Q1–Q3 order, which entry point is correct?",
    ans:[2],
    opts:[
      {t:"Research mode — the analysis needs current external context weekly.", w:"Q2 is not the binding question. Nothing says the answer lies outside material she controls; search would import unverifiable material."},
      {t:"Artifacts — the output is a document teammates will edit.", w:"Q3 is real but third in the order. An artifact fixes the container; it does not fix the re-typed instructions, which is the actual defect."},
      {t:"A Project — Q1 (reuse) is answered 'yes' first, and it carries the shared instructions and the isolation.", w:"Correct. Reuse is decided before source and object, and it is the only option that removes the weekly re-briefing that causes the drift."},
      {t:"Stay in chat, keeping a shared document of instructions to paste.", w:"That is the workaround that created the problem: a paste-based process has no version and no owner, so it drifts (6.4)."}]},

  { dom:"D3",
    stem:"A team needs 200 short routine customer-reply drafts a day, where speed and cost matter more than deep reasoning. Best choice?",
    ans:[1],
    opts:[
      {t:"Use the most capable, highest-cost model for every reply to maximise quality.", w:"The guide's own distractor: it wastes cost and latency on reasoning the task does not use."},
      {t:"Use a faster, lower-cost model suited to straightforward, high-volume tasks.", w:"Correct — model-tier alignment as the objective defines it: match the tier to cost, speed and quality requirements."},
      {t:"Disable all product features to reduce cost per reply.", w:"Also the guide's distractor. Removing capability is not trade-off management."},
      {t:"Escalate to a Developer to build a routing layer before going live.", w:"Over-escalation: an L2 volume task with an obvious configuration answer. Escalating instead of choosing is how small decisions become projects."}]},

  { dom:"D3",
    stem:"Claude returns a fluent summary of a client contract, with a clause number and a quoted sentence. Nothing was attached to the conversation. Which always-true behaviour best explains the risk?",
    ans:[0],
    opts:[
      {t:"It only sees what is in the window and the tools enabled — and it still answers, filling the gap plausibly.", w:"Correct. Behaviours #3 and #5 combine: no source present, so the specific-looking detail was generated rather than retrieved."},
      {t:"It runs out of room, so earlier context degraded and it reconstructed the clause.", w:"A real behaviour, irrelevant here: there was no earlier context to degrade. Wrong mechanism for the symptom (8.1)."},
      {t:"It optimises for plausible rather than true — which means the answer is probably wrong.", w:"Right behaviour, overreaching conclusion. The defect is that it is *unverifiable from the conversation*, which is why you attach the source."},
      {t:"It starts from nothing, so it does not remember the contract from previous engagements.", w:"Misapplied — and cross-engagement memory is the one thing nobody should want here (6.2)."}]},

  { dom:"D3", type:"multi", need:2,
    stem:"An operations lead wants Claude to read the shared mailbox continuously and send replies to customers with no review. Which TWO responses correctly treat this as a capability-layer problem?",
    ans:[0,2],
    opts:[
      {t:"Identify it as L3 — acting on a system, unattended, needing permissions and rollback — and escalate to a Developer.", w:"Correct. 'Needs to act on a system' and 'needs to run without a human' are both named escalation signals (2.3, 5.3)."},
      {t:"Refuse the requirement entirely; continuous processing is out of scope for the firm.", w:"Over-correction. The underlying need is legitimate; what is not, is the unreviewed *send*."},
      {t:"Ship the L2 version now: a per-client Project with approved replies as exemplars, used by a person who reviews and sends.", w:"Correct — separating the shippable capability from the one requiring engineering keeps value flowing while the request is properly scoped."},
      {t:"Re-write the prompt with stricter instructions about when not to send.", w:"Instructions create neither capability boundaries nor access rights (6.2, 7.4). A prompt cannot grant or withhold permission to act."}]},

  { dom:"D3",
    stem:"After three long chats, an associate switches to the strongest model because 'the summaries keep losing the caveats'. Why is that the wrong first move?",
    ans:[3],
    opts:[
      {t:"Because the strongest model is slower and the task was volume work.", w:"A genuine cost, but not why the reasoning is flawed — latency was never the reported defect."},
      {t:"Because model tier cannot be changed inside a Project.", w:"A false product claim, and exactly the kind of trap here: tier choices for recurring work are made in configuration."},
      {t:"Because a bigger model will over-explain and add caveats of its own.", w:"Invented mechanism; nothing in the framework predicts it."},
      {t:"Because losing caveats as a thread lengthens is context dilution — restart with a summary and move the completeness rule into instructions. It is a completeness failure, not a capability failure.", w:"Correct. Timing diagnosis (8.1) plus the cheapest-fix ladder (8.2) places a tier change far below a restart and a configuration change."}]},

  { dom:"D3",
    stem:"Domain 3 requires deciding when to restart, summarise, or persist. Which pairing of situation and action is correct?",
    ans:[1],
    opts:[
      {t:"Persist — you hit the output length limit and the answer stopped mid-sentence.", w:"That is truncation: split the request and ask for the rest. Nothing needs persisting."},
      {t:"Summarise, then restart — a 40-turn thread holds decisions worth carrying, but early constraints are influencing answers less.", w:"Correct. The textbook moment: carry the state forward compactly and get a clean window (2.1, 6.4)."},
      {t:"Restart from scratch — a client redefined a metric, so the model's context is out of date.", w:"The context is not the problem; the *source material* is. Update the Project's knowledge and retire the superseded file, or you restart into the same stale definition."},
      {t:"Persist into memory — a one-off figure from this week's draft you may want next month.", w:"Memory is not a filing cabinet for transient facts; it becomes a confident standing fact nobody owns (6.1)."}]}
]});

Q.push({ id:"q3", section:"s3", dom:"D1",
  title:"Section 3 · İstem Yazımı ve Görev Yürütme — Prompting and Task Execution", titleTr:"Bölüm 3 testi",
  questions:[
  { dom:"D1",
    stem:"A prompt reads: 'Analyse the attached Q3 workbook and write the board memo. Be thorough and professional.' The memo invents one figure. Which component is at fault, and what is the smallest repair?",
    ans:[0],
    opts:[
      {t:"Input — restrict it explicitly: use only the workbook, cite file and cell for every figure, write 'not in sources' rather than infer.", w:"Correct. An invented figure is a grounding failure: the workbook was supplied, but the prompt never said *only* that, nor demanded provenance."},
      {t:"Task — it asked for two jobs at once; split analysis from drafting.", w:"Good practice (3.2) and it would improve structure — but a well-scoped ungrounded prompt still invents."},
      {t:"Format — the memo had no template, so the figure went unnoticed.", w:"Format governs the *visibility* of defects, not their creation. Right lesson, wrong component."},
      {t:"Context — it did not say who the board is.", w:"Audience explains tone problems, not fabricated numbers. Symptom-to-component mapping (3.3) rules it out."}]},

  { dom:"D1",
    stem:"A consultant rewrites the entire prompt after every disappointing output and cannot say which change helped. Which discipline has she dropped?",
    ans:[2],
    opts:[
      {t:"Decomposition — a prompt should never cover more than one task.", w:"A real technique, but 'never' overstates it, and it is not her problem: hers is attribution, not scope."},
      {t:"Verification — she should ask Claude to check its own output after each rewrite.", w:"Never a right answer here: self-assessment is not a validation method (4.4)."},
      {t:"One-variable iteration — name the defect, map it to one component, change only that, and re-run on identical input.", w:"Correct. Re-running on the *same* input is what makes a comparison mean anything, and it is the step people skip."},
      {t:"Escalation — repeated failure means the requirement is beyond Claude.", w:"Premature. The ladder places escalation last, after cheap repairs — and she has not been diagnosing at all."}]},

  { dom:"D1",
    stem:"Forty contracts must be reviewed for change-of-control provisions: extract a fixed set of fields from each, then produce a comparative summary. Which decomposition pattern fits, and what is its main risk?",
    ans:[1],
    opts:[
      {t:"Pipeline — extract, analyse, draft; the risk is steps drifting apart.", w:"A pipeline suits one document flowing through stages. Forty parallel documents need per-chunk processing, and the merge risk is the one named."},
      {t:"Map–reduce — the same extraction instruction per document, then merge; the risk is a merge with no rules, averaging everything into nothing.", w:"Correct. Volume exceeding one pass is the map-reduce trigger, and the merge contract — how to combine, what wins on conflict — is the classic failure point."},
      {t:"Fan-out/compare — generate 40 variants and select the best; the risk is choosing by which reads best.", w:"Fan-out generates alternatives of *one* thing for selection. Here all 40 extractions are needed, not culled."},
      {t:"Role split — drafter and critic; the risk is an agreeable critic.", w:"The agreeable critic is a real trap, but the scenario's structure is volume, not quality assurance of a single artefact."}]},

  { dom:"D1", type:"multi", need:2,
    stem:"A partner says: 'Give me options for how to respond to the pricing complaint — I don't want a recommendation yet, I want to see the field.' Which TWO prompt instructions match this task type?",
    ans:[0,3],
    opts:[
      {t:"'Produce 15–20 distinct approaches across at least five categories; do not rank or justify them in this pass.'", w:"Correct. She asked to diverge: quantity, category diversity, evaluation withheld to a separate pass (3.4)."},
      {t:"'Recommend the single best approach and explain your reasoning.'", w:"Converging on request. Selecting early collapses the option space to the safest three — the named failure mode for brainstorming."},
      {t:"'Cite every claim to the client's letter and the attached contract; if something is not covered, say so.'", w:"Good research/analysis language, but the ask is not 'what do the sources say' — it is 'what could we do'. Wrong task type."},
      {t:"'Then, in a separate second pass, group them and show which three are most different from the rest, and what each would cost us.'", w:"Correct. Separating generation from evaluation is the structural move; the second pass supplies criteria rather than a verdict."}]},

  { dom:"D1",
    stem:"Claude keeps answering the narrow literal question when the partner needed exceptions and edge cases as well. What is the best *first* change?",
    ans:[2],
    opts:[
      {t:"Switch to the strongest model — deeper reasoning will infer what was meant.", w:"Costly, and it misses the point: the request did not contain the requirement. Tier changes capability, not specification."},
      {t:"Add 'be thorough' to the end of the prompt.", w:"An adjective, not a specification. Nothing testable was added, so nothing reliably changes (3.1)."},
      {t:"Change the Task component to state a completeness contract: cover exceptions and edge cases, and list what is out of scope.", w:"Correct. The requirement existed only in the asker's head; making it an explicit, checkable clause is the minimal durable repair."},
      {t:"Decompose into ten micro-steps so each answer is smaller.", w:"Over-splitting (3.2): ten steps each needing context re-established add cost without creating the missing requirement."}]},

  { dom:"D1",
    stem:"A manager's prompt has grown to 1,400 words with eleven constraints, and Claude now ignores the ones that matter most. What is the diagnosis?",
    ans:[1],
    opts:[
      {t:"Claude is unreliable with long instructions; use short prompts and check everything manually.", w:"Half a diagnosis with a defeatist conclusion. The fix is to relocate durable constraints, not abandon structure."},
      {t:"The binding constraints are buried where their influence dilutes — promote two or three non-negotiables to short labelled lines and move the rest into Project instructions or a document.", w:"Correct. Long instruction blocks dilute against recency; sorting material by destination (rule / document / one-off) is the structural repair (6.1)."},
      {t:"Too many constraints trigger refusals; remove all eleven and start over.", w:"Misdiagnosed. Length dilutes; it does not cause refusal — and removing everything is over-correction."},
      {t:"The exemplar is competing with the instructions; remove it.", w:"Invented conflict. Exemplars set structure; they do not cancel rules."}]}
]});

Q.push({ id:"q4", section:"s4", dom:"D2",
  title:"Section 4 · Çıktıyı Değerlendirme ve Doğrulama — the heaviest domain", titleTr:"Bölüm 4 testi",
  questions:[
  { dom:"D2",
    stem:"An associate asks Claude to summarise a new regulation. It produces a confident summary citing a specific subsection. Before it goes to the compliance team, the most appropriate action is:",
    ans:[1],
    opts:[
      {t:"Send it as-is, since Claude expressed high confidence.", w:"The guide's own distractor: expressed confidence is fluent text, not evidence of correctness."},
      {t:"Verify the cited subsection against the official regulation text before sharing.", w:"Correct — the official sample answer. Models fabricate specific-looking details, so the citation must be opened at its location in the authoritative source."},
      {t:"Ask Claude to rate its own confidence and send it if the rating is high.", w:"Also the guide's distractor. Self-assessment is not a validation method; asking for it yields a number, not a check."},
      {t:"Reword the summary to sound more formal, then send.", w:"Presentation changes do not touch correctness — and reformatting makes a fabrication harder to spot."}]},

  { dom:"D2",
    stem:"Every figure in a variance memo was checked against the workbook and every sentence is true. The client later asks why the office merger — known to break comparability, in another tab — was never mentioned. The defect is best described as:",
    ans:[2],
    opts:[
      {t:"A grounding failure — an unsupported claim.", w:"There was no unsupported claim. Everything present was supported, which is exactly what makes this case instructive."},
      {t:"Internal inconsistency — the memo contradicted itself.", w:"Nothing contradicted anything; both consistency checks would have passed."},
      {t:"Silent omission — accurate but incomplete, and invisible to anyone checking only what is on the page.", w:"Correct. Incompleteness cannot be found by reading; it needs a completeness contract built against the source inventory before asking (4.2)."},
      {t:"Overgeneralisation from a thin sample.", w:"A different pattern entirely (4.3 #5). No claim exceeds its evidence here; a claim is simply absent."}]},

  { dom:"D2",
    stem:"Which sequence correctly applies the Discernment Protocol?",
    ans:[0],
    opts:[
      {t:"Requirement → Grounding → Completeness → Consistency → Decide, with the decision recorded.", w:"Correct. Requirement first, because verifying a hundred claims that answer the wrong question is the most expensive kind of wasted diligence."},
      {t:"Grounding → Consistency → Requirement → Decide → Completeness.", w:"Requirement in the middle risks failing late on something knowable in thirty seconds; Completeness after 'Decide' means nothing can act on the finding."},
      {t:"Consistency → Completeness → Grounding → Requirement → Decide.", w:"Reversed priority: arithmetic before purpose, with the most dangerous pass buried mid-list."},
      {t:"Grounding → Completeness → Decide, stopping if both pass.", w:"Three of five passes. Dropping requirement and consistency is how a memo with real citations still fails on totals that do not sum."}]},

  { dom:"D2", type:"multi", need:2,
    stem:"Which TWO prompt clauses genuinely build verification into generation rather than deferring it to review?",
    ans:[1,3],
    opts:[
      {t:"'Be accurate and double-check your work before answering.'", w:"No mechanism. Nothing constrains the source set and nothing makes an ungrounded claim visible; it requests an attitude."},
      {t:"'Use only the documents in this Project for facts. If something is not answered there, write \"not covered in sources\".'", w:"Correct — source restriction plus permitted uncertainty (4.4). It converts the task from 'answer' into 'report what the sources say', and licenses the honest gap."},
      {t:"'Report your confidence as a percentage for each paragraph.'", w:"Confidence reporting is a distractor in the official sample set; it produces a fluent number that can itself be fabricated."},
      {t:"'For each claim, name the file and section and quote the exact sentence relied on.'", w:"Correct — auditable citation. It makes fabrication structurally harder and turns the reviewer's spot-check into a mechanical open-and-compare."}]},

  { dom:"D2",
    stem:"A partner proposes removing the human review on a 40-item-a-day newsletter workflow to save 15 minutes per item, since Claude has had 'no errors for two months'. Applying the four criteria, the right answer is:",
    ans:[2],
    opts:[
      {t:"Remove it — two error-free months is evidence of a mature workflow.", w:"Two months of *no visible* errors is not two months of no errors. Without an escape-rate measure, absence of complaint is absence of measurement."},
      {t:"Keep it at 100% — anything client-facing must always be fully reviewed.", w:"Over-correction, and it fails the calibration test: not everything warrants the same gate, and an unaffordable gate gets skipped, which is worse than a designed sample."},
      {t:"Keep a gate but change its type — a designed spot check on a sample against the source, with a defined trigger that re-tightens it.", w:"Correct. Low individual stakes, reversible before send, cheap verification: sampling is the calibrated answer (4.5), with an escalation trigger attached."},
      {t:"Replace the reviewer with a second model call that checks the first.", w:"Model-checks-model is not human review; it manufactures a plausible second opinion, and the accountability problem reappears in a smarter costume."}]},

  { dom:"D2",
    stem:"A monthly report arrives as three pages of prose. One segment total is wrong and nobody notices for three months. Which change would most cheaply have exposed it?",
    ans:[1],
    opts:[
      {t:"A more capable model, asked to be careful with figures.", w:"Expensive, and it treats a visibility problem as a capability problem. 'Be careful' is not a specification (3.1)."},
      {t:"Reformat into a fixed table with named columns, a stated row count, and a totals row that must reconcile.", w:"Correct — format is a reliability decision (4.6). Structure makes a mismatched total obvious; prose hides the same defect perfectly."},
      {t:"A second reviewer reading the prose carefully.", w:"Doubles the cost and still depends on catching a wrong number by reading, which is precisely what failed three months running."},
      {t:"Instruct Claude to show its arithmetic in the text.", w:"Directionally right but weak: arithmetic inside prose cannot be scanned or summed. Make the check mechanical and compute it (5.2)."}]}
]});
