/* Section quizzes 5-8. */
window.CCAO = window.CCAO || {};
window.CCAO.quizzes = window.CCAO.quizzes || [];
var Q = window.CCAO.quizzes;

Q.push({ id:"q5", section:"s5", dom:"D4",
  title:"Section 5 · İş Akışı Entegrasyonu — Workflow Integration and Solution Design", titleTr:"Bölüm 5 testi",
  questions:[
  { dom:"D4",
    stem:"From eleven messy sources, Claude produces a clean, complete-looking requirements specification. Which practice makes it safe to sign?",
    ans:[0],
    opts:[
      {t:"Tag every requirement as verbatim, inferred, conflicting or a gap — with its source named.", w:"Correct. Invention is invisible in synthesis; the four tags keep it visible and give a human something specific to approve (5.1)."},
      {t:"Ask Claude to rate its confidence in each requirement.", w:"Never the answer — and doubly useless here, since the risk is a requirement nobody stated, which no confidence rating can detect."},
      {t:"Let the client review the finished specification at the next steering meeting.", w:"Outsourcing discovery to the client at the most expensive moment. The conflicts and gaps are what you bring *to* that meeting."},
      {t:"Keep only requirements found in more than one source.", w:"An invented rule that discards legitimate single-source requirements and manufactures a false consensus standard."}]},

  { dom:"D4",
    stem:"A proposal claims 'this saves roughly 20% of coordination time'. Under the calculated-numbers rule, what is wrong and what is the fix?",
    ans:[2],
    opts:[
      {t:"Make it more precise — ask Claude for two decimal places.", w:"Precision theatre (7.5). Refining an unfounded number makes it look better, not truer."},
      {t:"Nothing is wrong; estimates are permitted in proposals.", w:"Estimates are permitted *as declared assumptions with an owner and a falsifier*. This is presented as a measured finding with no basis."},
      {t:"The figure has no tier: name the measured input and the assumption, show the formula, compute it, and give a sensitivity range.", w:"Correct (5.2). A figure in a plan must be computed, not written — and reconciliation is what surfaced the duplicated queue in the Meridian case."},
      {t:"Replace it with a range, e.g. '15–25%'.", w:"A range with no basis is still an assertion. Ranges express uncertainty; they do not justify it."}]},

  { dom:"D4",
    stem:"A workflow step must write to a client portal on a schedule and keep an audit trail the contract requires. The Associate's correct next action is:",
    ans:[3],
    opts:[
      {t:"Write a very detailed prompt instructing Claude to be careful with the portal.", w:"Instructions cannot grant access, guarantee logging, or provide rollback — the 'instruction as control' error again."},
      {t:"Try research mode and connectors to see whether the portal can be reached.", w:"Experimenting on a client system's write path, on an engagement with a contractual audit requirement, is how incidents happen."},
      {t:"Refuse: the requirement is out of scope for AI entirely.", w:"Over-correction. It is in scope for the organisation and out of scope for the Associate's layer — that distinction is the lesson."},
      {t:"Escalate with the shape of the request: the step, measured volume, what was tried, and the missing capability — write access, scheduling, retained logging.", w:"Correct (2.3, 5.3). Act-on-a-system, unattended execution and auditability-by-design are L3 triggers, and a well-formed escalation gets a design rather than a meeting."}]},

  { dom:"D4", type:"multi", need:2,
    stem:"Mapping a workflow for delegation: which TWO criteria support delegating a step to AI rather than keeping it human?",
    ans:[0,2],
    opts:[
      {t:"A human can check the output faster than they could produce it.", w:"Correct — verifiability is what makes delegation economical rather than merely convenient (5.4)."},
      {t:"The step is the accountable act itself: approving, signing, disciplining, deciding.", w:"The reverse. If the step *is* the accountable act it is the clearest case for staying human; accountability is never delegated."},
      {t:"Errors in the step are cheap to catch and quick to correct.", w:"Correct — low error cost is one of the five yes-tests, and it is what makes a spot check rather than a full review the right gate."},
      {t:"The step happens often.", w:"Necessary but not sufficient: recurring high-stakes irreversible steps are exactly the ones to gate. Volume alone decides nothing."}]},

  { dom:"D4",
    stem:"Selin is presenting an AI-assisted workflow to a sceptical risk committee. Which framing is most likely to be approved?",
    ans:[1],
    opts:[
      {t:"A live demo of impressive outputs, to build enthusiasm.", w:"Demos persuade engineers, not risk committees — and they showcase the best case, which is precisely the audience's concern."},
      {t:"Value quantified in the firm's own numbers, every stated limitation paired with the control that covers it, and the map showing what stays human.", w:"Correct (5.5). A limit stated with its control reads as an operating procedure, which is the only thing a committee can approve."},
      {t:"A complete list of every caveat, so nobody can say risks were hidden.", w:"Over-disclosure turns a decision into a risk dump; the committee hears only the caveats and refuses the whole thing."},
      {t:"Assurance that the tool does not retain data and is safe by design.", w:"Asserting a policy you have not read (7.2). An unverified reassurance is the fastest route to a permanent 'no'."}]},

  { dom:"D4",
    stem:"A pilot improved cycle time by 35% and the team liked it, so it is being standardised. What is the flaw?",
    ans:[2],
    opts:[
      {t:"Nothing — a 35% cycle-time improvement is a success criterion met.", w:"Only if cycle time was *the* pre-agreed criterion. The objective is efficiency *and* effectiveness; one metric chosen retroactively is not a measurement plan."},
      {t:"A pilot must run at least six months before standardising.", w:"An invented rule. Duration is not the criterion; representative sampling and pre-defined metrics are."},
      {t:"Success criteria must be defined before building and measured against, and the pilot must run on representative real work — not on the team's goodwill.", w:"Correct. Both halves are missing: criteria after the fact, and enthusiasm used as evidence in place of error rate and defect escapes (5.3)."},
      {t:"The pilot should have run on the hardest cases first.", w:"Hard-case-only is the mirror error to easy-case-only. What's required is representative work, sampled deliberately."}]}
]});

Q.push({ id:"q6", section:"s6", dom:"D5",
  title:"Section 6 · Yapılandırma ve Bilgi Yönetimi — Configuration and Knowledge Management", titleTr:"Bölüm 6 testi",
  questions:[
  { dom:"D5",
    stem:"A client redefined 'gross margin' in March. Which Project area should hold the current definition, and why?",
    ans:[1],
    opts:[
      {t:"Instructions — it is a rule about how Claude must work.", w:"Seductive, but a definition is a *fact to be cited*; inside instructions it becomes an unverifiable paraphrase that outlives its source (6.1)."},
      {t:"Knowledge — it is evidence with a source and a version, and the superseded file must be removed the day it is replaced.", w:"Correct. Behaviour goes in instructions, evidence goes in knowledge; removing the old file stops it winning a relevance contest (6.4)."},
      {t:"Memory — so it is always known without being attached.", w:"Memory is recalled, not enforced, and has no owner or version — the definition most likely to be silently wrong in July."},
      {t:"A Skill — definitions are reusable procedures.", w:"A Skill packages a *method*. A definition has no steps; it has provenance, which is knowledge's job."}]},

  { dom:"D5",
    stem:"Two associates propose one shared 'Consulting' Project for all engagements so everyone reuses a single setup. Against per-client confidentiality obligations, the correct decision is:",
    ans:[2],
    opts:[
      {t:"Allow it, adding an instruction: never reference another client's material.", w:"The central error in 6.2 — instructions do not create access boundaries, and one that can be overridden by relevance is not a confidentiality control."},
      {t:"Refuse AI assistance for consulting work altogether.", w:"Over-correction: it forfeits the value rather than containing the risk (7.1)."},
      {t:"Refuse the shared Project; ship a template Project duplicated per client, knowledge isolated, one named owner each.", w:"Correct. Isolation follows the confidentiality boundary, and the template makes it cheap — the only way isolation survives a deadline."},
      {t:"Allow it, since all access is internal and no client data leaves the firm.", w:"Inside-the-firm is not the test. Cross-client exposure is the harm; the engagement letter constrains which work may reach which material."}]},

  { dom:"D5", type:"multi", need:2,
    stem:"A Drive connector is scoped to the whole İstanbul team folder. Claude answers 'no relevant emails found' about a client query, and an associate tells the client the matter was never raised. Which TWO things went wrong?",
    ans:[0,3],
    opts:[
      {t:"Treating a non-exhaustive search result as proof of absence.", w:"Correct — the single most examinable connector limit (6.3). Retrieval returns relevant-looking items, not all items."},
      {t:"Using a connector at all rather than attaching files.", w:"Not a defect. Connectors are legitimate at L2; the errors are scoping and interpretation, not use."},
      {t:"Failing to ask Claude to rate its confidence in the search.", w:"Would have produced a fluent number and no information. Never a validation method (4.4)."},
      {t:"Scoping the connector to a team-wide folder rather than to the client's boundary.", w:"Correct — that scope is what created the confidentiality exposure, and it is the governance half of the same misconfiguration."}]},

  { dom:"D5",
    stem:"Which instruction line is written well enough to be maintained?",
    ans:[2],
    opts:[
      {t:"Be accurate, concise and professional at all times.", w:"Three adjectives, zero testability. What cannot be checked cannot be maintained (6.4)."},
      {t:"Do not invent numbers and do not be verbose.", w:"Negations with no replacement behaviour, and 'verbose' is unbounded — half-followed by construction."},
      {t:"If a figure is not in the attached sources, write 'not in sources' rather than estimating. Owner: Selin · v4 · 12 Mar.", w:"Correct — one behaviour, testable, positively phrased, states what to do when it can't, and carries an owner and a version."},
      {t:"Always cite your sources thoroughly and cite everything relevant where possible.", w:"'Where possible' makes the rule unenforceable and 'thoroughly' defines no shape."}]},

  { dom:"D5",
    stem:"For a month, the same correction had to be applied to Claude's output by hand. It keeps recurring now a colleague has taken over the task. The structural failure is:",
    ans:[1],
    opts:[
      {t:"Insufficient prompting by whoever is doing it that week.", w:"Individual diligence is the failing mechanism by definition — a month of recurrence is the evidence that it is not a person problem."},
      {t:"The fix was never persisted into configuration, so it lives in one person's habit rather than in the system.", w:"Correct — 8.3 applied to configuration. The correction belongs in instructions, an exemplar or a Skill, with an owner; otherwise it walks out with the person."},
      {t:"The model tier is too low for the task.", w:"Recurrence of a known fix is not a capability limit. Tier is the wrong lever and adds cost without touching the cause."},
      {t:"The knowledge base is too small.", w:"Possibly true, but irrelevant to the stated symptom, which is a known repeated correction — a save-the-fix failure whatever the corpus size."}]},

  { dom:"D5",
    stem:"A Skill built last year still runs inside three Projects. Its author has left, nobody can say what its thresholds are based on, and the underlying process changed in June. What should happen?",
    ans:[0],
    opts:[
      {t:"Disable it, then decide whether to rebuild it with a named owner, current thresholds, a version and a test case.", w:"Correct (7.3). An unowned, unreviewed, stale capability is a standing policy nobody can defend: retire first, re-author properly. A Skill is software."},
      {t:"Leave it on — it is working, and removing working automation is a regression.", w:"'It runs' is not evidence it is right; nobody can currently say what it checks. This is silent defect inheritance."},
      {t:"Edit its thresholds informally to match the June process.", w:"An unversioned, unreviewed edit to a shared capability is how a fix becomes a new incident."},
      {t:"Add an instruction to every affected Project telling Claude to ignore the Skill where it conflicts.", w:"Conflicting instructions get half-followed, not reconciled. You cannot outrun a capability with a sentence."}]}
]});

Q.push({ id:"q7", section:"s7", dom:"D6",
  title:"Section 7 · Yönetişim ve Sorumlu Kullanım — Governance, Risk and Responsible Use", titleTr:"Bölüm 7 testi",
  questions:[
  { dom:"D6",
    stem:"HR wants Claude to score 240 CVs against the role criteria and shortlist the top 20. Applying the screening gates, the most appropriate response is:",
    ans:[1],
    opts:[
      {t:"Allow it — the recruiter reviews the shortlist before anyone is contacted.", w:"Sounds responsible and misses the point: a ranking whose reasoning the reviewer cannot inspect is a signature, not a review. Accountability has not moved (7.1)."},
      {t:"Decline that design and offer the alternative: Claude summarises each CV against the published criteria; two recruiters rank jointly; the shortlist meeting is minuted.", w:"Correct. It keeps decision support, removes decision making, and still meets the requester's real need — the hours, not the verdict."},
      {t:"Refuse; CVs must never be processed with AI in any form.", w:"Over-correction and an invented absolute. Gate 1 blocks automated *determinations*, not all assistance with recruitment material."},
      {t:"Allow it, provided Claude flags any candidate it is unsure about.", w:"Self-reported uncertainty is not a control — and here it is worse: it launders an automated decision into a semi-automated one with a plausible fairness story."}]},

  { dom:"D6",
    stem:"A spreadsheet contains customer names and account numbers; organisational policy restricts sharing regulated personal data. Most appropriate action?",
    ans:[0],
    opts:[
      {t:"Remove or anonymise the personal identifiers before uploading, consistent with policy.", w:"Correct — the guide's official answer. The analysis proceeds without exposing protected data, so policy and productivity both hold."},
      {t:"Upload as-is, since the analysis is internal.", w:"The guide's distractor: internal use does not cure a policy restriction (7.4)."},
      {t:"Upload it but instruct Claude not to retain the file.", w:"Also the guide's distractor. An instruction is not a retention control; controls are what enters the window and what access you granted (7.2)."},
      {t:"Skip the analysis entirely.", w:"The guide's third distractor — over-correction. When anonymisation enables the work, abandoning it is a lost outcome, not caution."}]},

  { dom:"D6",
    stem:"Someone asks to enable a shared Skill that reads client folders and posts summaries to a channel. Under Skill governance, which concern is most decisive?",
    ans:[2],
    opts:[
      {t:"It has no user documentation.", w:"A nuisance, not a risk. Documentation aids maintainability; it does not bound blast radius."},
      {t:"It duplicates a step some associates do manually.", w:"A workflow-design point (8.4) — and generally one in its favour."},
      {t:"Nobody can say who owns it, what it may read, where it may write, or whether it has been reviewed for injection and exfiltration.", w:"Correct (7.3). Read reach plus write reach with no owner is an unbounded access grant attached to a black box; that blocks enablement however useful it looks."},
      {t:"It may increase token usage.", w:"A cost consideration, entirely secondary to uncontrolled reach."}]},

  { dom:"D6", type:"multi", need:2,
    stem:"Before attaching a file to a client Project, which TWO steps belong in the pre-flight?",
    ans:[1,3],
    opts:[
      {t:"Ask Claude which classification the file has.", w:"The model has no standing to classify your data and cannot see the governing clause. Classification is a human, policy-side decision."},
      {t:"Name the highest classification of content actually present — column by column where needed.", w:"Correct. 'It's the KPI sheet' is not an answer if one column holds personal data; one restricted field restricts the file (7.4)."},
      {t:"Add an instruction telling Claude to treat the file as confidential.", w:"An instruction is not a control. Confidentiality comes from which Project the file enters and who can reach it."},
      {t:"Test whether the task needs the whole file, and reduce it: redact, pseudonymise, aggregate, or ask a narrower question.", w:"Correct — reducibility keeps the analytical value and drops the exposure, and it often improves the answer as a side effect."}]},

  { dom:"D6",
    stem:"Which is the *most* common way ethics fails in ordinary business deliverables?",
    ans:[0],
    opts:[
      {t:"Fair-representation failures: a summary built from the loudest slice of the sample, cherry-picked evidence, absent stakeholders, no counter-case in the deck.", w:"Correct (7.5). This is what 'bias' means in a business item — not blatant stereotyping, but the unrepresentative sample and the flattering metric."},
      {t:"Offensive or stereotyped language in generated text.", w:"A real risk worth checking, but loud, easily caught, and rarely the failure an item points at."},
      {t:"Failing to disclose AI use in every output regardless of relevance.", w:"Inverts the obligation. Disclosure matters where authorship or provenance is material to the audience, not theatrically everywhere."},
      {t:"Using AI for any client-facing work without written consent.", w:"An invented blanket rule; the engagement terms and firm policy decide (7.1)."}]},

  { dom:"D6",
    stem:"A firm publishes a 40-page AI policy. Six months later an associate still uploads restricted data to a personal account. The diagnosis is:",
    ans:[3],
    opts:[
      {t:"Insufficient training; more sessions would have embedded it.", w:"Training is a real gap, but more of the same is rarely the answer when the artefact carrying the rule is what failed."},
      {t:"The associate acted in bad faith.", w:"Possible, unprovable, and a diagnosis that leaves the system unchanged. The exam wants the mechanism, not the moral."},
      {t:"The policy did not cover personal accounts.", w:"A specific gap — but policies that long usually do cover it. Coverage is not the failure mode described."},
      {t:"Policy lived in a document rather than in the workflow: no enforced scoping, no redaction step, no owner, no log — nothing at the point of use that could stop the action.", w:"Correct. A rule that must be remembered at the moment of least time is a slogan; enforcement lives in artefacts, template fields and access design."}]}
]});

Q.push({ id:"q8", section:"s8", dom:"D7",
  title:"Section 8 · Sorun Giderme ve Optimizasyon — Troubleshooting and Optimization", titleTr:"Bölüm 8 testi",
  questions:[
  { dom:"D7",
    stem:"A report ran perfectly for three months. This month the totals are wrong for every client. What does the timing tell you, and what is the first move?",
    ans:[1],
    opts:[
      {t:"The prompt has degraded through use; rewrite it from scratch.", w:"Prompts do not degrade. Rewriting destroys your only diagnostic — what changed — and reintroduces every fix you had."},
      {t:"Something in the environment changed. Walk the change list: knowledge files, instructions, memory, connector permissions, tier, product update, input format.", w:"Correct. 'Worked then stopped' rules out the prompt's design and points at a change (8.1); the usual culprit is a changed client file or a superseded document."},
      {t:"The model has become less reliable; raise the tier next month.", w:"The most expensive wrong inference available: it converts a diagnosis into a cost increase and guarantees you never find the cause."},
      {t:"Random variation — run it again and take the better result.", w:"Systematic failure across every client is the opposite of random, and cherry-picking runs is a governance failure, not troubleshooting."}]},

  { dom:"D7",
    stem:"Output is correct but its structure varies run to run, so the reviewer relearns the layout each time. On the cheapest-fix ladder, the best next move is:",
    ans:[2],
    opts:[
      {t:"Escalate to a Developer to build a templating pipeline.", w:"Two rungs too far. Rung 10 comes after the whole ladder has failed, and no capability is missing here."},
      {t:"Switch tiers for more consistent output.", w:"Consistency of *shape* is not a capability limit; a tier change buys only latency and cost."},
      {t:"Change the format contract: fixed fields, a stated row count, and 'none' required rather than omission.", w:"Correct (8.2, rung 5). It costs minutes, ends the relearning and — the bonus — makes missing content visible (4.6)."},
      {t:"Add an exemplar of a good output.", w:"Reasonable and adjacent, but weaker alone: an exemplar shows structure, a contract requires it. Pick the one that makes variance impossible to hide."}]},

  { dom:"D7",
    stem:"After a long debugging session, one buried instruction is found to have caused the month's error. What makes the fix durable?",
    ans:[0],
    opts:[
      {t:"Record the rule in Project instructions with owner and version, keep the accepted output as an exemplar, add a golden test case, and log the cause with a date.", w:"Correct — all four outputs of a good repair (8.3). The test is the part people skip and the part that turns a fix into a defence."},
      {t:"Post the lesson in a team message and ask everyone to read it.", w:"A message is tribal knowledge with an expiry date: not attached to the artefact, so nobody meets it at the point of use."},
      {t:"Keep the corrected prompt in personal notes for next time.", w:"Personal notes do not survive a handover, and they leave the team to rediscover the defect."},
      {t:"Change the model tier so it cannot recur.", w:"An expensive lever used to hide a diagnosis. The rule is still buried and still able to contradict whatever is added later."}]},

  { dom:"D7", type:"multi", need:2,
    stem:"A workflow audit finds: 26 minutes of rework caused by inconsistent file naming, 22 minutes of review, and a 4-day wait on a client's legal team. Which TWO are correct optimisation routes?",
    ans:[0,2],
    opts:[
      {t:"Delete the 26 minutes at source — one naming convention in the Project, making the rework unnecessary.", w:"Correct. Rework traced to a preventable upstream defect is deleted by fixing the process, not by automating the downstream repair (5.4's trap)."},
      {t:"Automate the 4-day external wait so it no longer blocks the workflow.", w:"You cannot optimise a third party's review by adding automation to your own side; you shorten it with a cleaner draft. Recording it as 'leave alone' is a legitimate finding."},
      {t:"Keep the 22 minutes of review and make it cheaper — citations presented against sources, so verification becomes a 90-second scan.", w:"Correct. Optimisation that does not transfer risk: reduce the cost of a control, never the existence of a load-bearing one (8.4)."},
      {t:"Remove the 22-minute review, since automation has already reduced errors.", w:"The seductive wrong answer. Absence of visible errors without an escape measure is not evidence, and a review removed for speed is a cost moved to the client."}]},

  { dom:"D7",
    stem:"Which statement best captures what 'know your limit' means on this exam?",
    ans:[3],
    opts:[
      {t:"Admit when you do not know a feature's name.", w:"Naming features is not tested, and humility about vocabulary is not the competency."},
      {t:"Only use AI for tasks you feel confident about.", w:"Wrong twice: it would rule out legitimate delegation, and confidence is not the boundary the credential tests."},
      {t:"Escalate whenever a task takes more than an hour.", w:"An invented threshold. Triggers are about shape — acting on a system, unattended execution, auditability by design — not duration."},
      {t:"Recognise when a request has left your layer or your authority — an L3 build to escalate, or a decision you may not make — and say so precisely, naming the missing capability.", w:"Correct. The guide lists recognising limitations and escalating as a competency, and the exam punishes over-claiming far more reliably than it punishes asking."}]},

  { dom:"D7",
    stem:"Three days before the exam: solid prompting experience, no hands-on configuration experience. The highest-value use of the time is:",
    ans:[1],
    opts:[
      {t:"Re-read the domain descriptions and memorise the weights.", w:"Weights are orientation, not marks — and they are unofficial. Memorising allocation instead of practising judgement is comfortable and unproductive."},
      {t:"Build one real thing end to end — a Project with instructions, knowledge and a Skill; a redaction exercise; a broken-prompt repair — then sit a full timed mock and study the per-domain report.", w:"Correct (8.5). Scenario exams reward people who have hit the wall, and the mock's per-domain percentages are the only reliable pre-exam read on where 720 is at risk."},
      {t:"Work through as many practice questions as possible, skipping the explanations.", w:"Volume without rationale trains recognition, not judgement — and the per-option reasoning is where this exam's marks are won and lost."},
      {t:"Focus exclusively on D2, since 21% is the biggest single block.", w:"D2 deserves the first hours, but 'exclusively' leaves 79% unattended on a criterion-referenced exam that needs broad clearance, not one strong domain."}]}
]});
