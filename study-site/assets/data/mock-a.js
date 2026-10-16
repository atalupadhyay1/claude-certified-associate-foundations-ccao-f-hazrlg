/* CCAO-F Deneme Sınavı — questions 1-30. Built to the reported blueprint weights. */
window.CCAO = window.CCAO || {};
window.CCAO.mock = window.CCAO.mock || { questions: [] };
var M = window.CCAO.mock.questions;

function q(dom, stem, ans, o) {
  return { dom: dom, stem: stem, ans: ans,
    opts: o.map(function (x) { return { t: x[0], w: x[1] }; }) };
}

/* ---------------- D2 · Output Evaluation and Validation (13) ---------------- */
M.push(q("D2",
"A consultant uses Claude to summarise a supplier's sustainability memo for a public 'plastic-neutral' product claim. The summary quotes the memo accurately, paragraph 4. What is the most appropriate action before publication?",
[2],
[["Nothing further — the quote is verified against the source, which is the grounding check.","Grounding was satisfied; verification was not. A quote from an interested party is a real statement by that party, not substantiation of the claim."],
 ["Ask Claude how confident it is that the memo supports the claim, and publish if it reports high confidence.","Self-reported confidence is not a validation method (4.4); it is fluent text produced by the same process as the summary."],
 ["Treat the memo as one source, check what substantiation the claim actually requires, and let Legal decide whether the claim is publishable at all.","Correct. Citing a biased source accurately is still relying on a biased source (5.1, 7.5). Verification asks whether the claim is substantiable, not merely quoted."],
 ["Rewrite the summary in more cautious language, then publish.","Softening wording is presentation, not diligence — and it can make an unsupportable claim look responsibly hedged while remaining unsupportable."]
]));

M.push(q("D2",
"Claude produces a 6-page analysis of a contract. A paralegal checks all fourteen cited clauses; every one is accurate. The analysis is nonetheless unfit to send, most likely because:",
[1],
[["the language was not formal enough for a legal audience.","Register is an editing matter, not a fitness-to-send one, and it would not survive the phrase 'nonetheless unfit'."],
 ["nothing in the checking process covered what the contract said that the analysis *omitted* — completeness cannot be tested by reading what is present.","Correct. Fourteen accurate citations test grounding only. Pass 3 requires a list of what must be covered, built before asking (4.2)."],
 ["the model may have used a more capable tier than the task needed.","Tier is a cost and capability question (2.4), irrelevant to whether the deliverable is complete."],
 ["the analysis should have been produced as an artifact rather than inline.","Format affects how visible defects are (4.6), not whether the substance covers the scope."]
]));

M.push(q("D2",
"An associate asks Claude to pull six fields from forty interview transcripts into a table. Claude returns a tidy table with every cell filled. The most important check is:",
[3],
[["Whether the table should be an artifact so the team can edit it.","A legitimate downstream question, but not a check on the data's correctness."],
 ["Whether the wording in each cell reads professionally.","Cosmetic, and actively harmful here: polished cells make fabricated content harder to see (4.3)."],
 ["Whether the model hallucinated by asking it to re-derive the table a second time and comparing.","Regenerating produces a second plausible answer, not a correct one; two consistent fabrications look like agreement."],
 ["Whether all forty transcripts were actually processed and whether empty cells were marked 'not stated' rather than filled in by inference.","Correct. Volume extraction fails silently by skipping inputs and inferring gaps; row-count coverage plus a 'write not stated' rule are the two controls that make both failures visible (4.2, 4.4)."]
]));

M.push(q("D2",
"Claude summarises 200 support tickets as 'customers are consistently unhappy about the new packaging'. The associate knows the tickets came only from the two weeks after a price rise and only from one region. Which defect best describes what the summary does?",
[0],
[["Overgeneralisation from an unrepresentative sample, presented as a general finding.","Correct. 'Consistently' is the tell: the claim's scope exceeds the evidence's scope (4.3 #5, 7.5)."],
 ["Fabricated statistics, since no numbers appear in the summary.","Nothing is fabricated — the tickets exist and said that. The error is inductive reach, not invention."],
 ["Internal inconsistency between the summary and the ticket data.","There is no contradiction; the summary faithfully reflects the sample. Faithful and wrong is the interesting case."],
 ["Currency error, because the tickets are only two weeks old.","Staleness would mean the information is out of date. Here the data is fresh; the generalisation is unjustified."]
]));

M.push(q("D2",
"Which of the following outputs most clearly requires a mandatory, named human sign-off rather than a spot check?",
[2],
[["An internal digest of weekly KPI movements circulated to the analytics team.","Low stakes, internal, reversible, no regulation. A self-check plus occasional sampling is calibrated correctly (4.5)."],
 ["Draft subject lines for a newsletter sent to a client's opted-in list, reviewed by the account lead before sending.","Client-adjacent but cheap to correct before send and reviewed anyway — a designed sample, not a full gate."],
 ["A financial projection embedded in a document that will be signed by the client's board and relied on externally.","High stakes, irreversible once relied upon, external audience, contractual and regulatory exposure: all four criteria point one way."],
 ["A summary of a publicly available regulator's guidance circulated internally as background.","Public source and internal reach. Verification matters, but the accountability gate does not."]
]));

M.push(q("D2",
"A team needs Claude's output to be usable in two ways at once: a person must be able to check each figure quickly, and the result must be importable into a tracker. Which format best satisfies both?",
[1],
[["Prose with each figure written out in full sentences and the source named.","Readable, but un-scannable and un-parseable: exactly the container that hid the wrong total for three months (4.6)."],
 ["A structured table with one row per item, named columns, figures reproduced verbatim, a source column, and a totals row that must reconcile.","Correct. Structure makes a mismatch visible to a human and gives the tracker a machine-readable shape — one artefact serving both checks (3.1, 4.6)."],
 ["An artifact document with the figures in bold inside the narrative.","Bold inside prose draws the eye but cannot be summed or imported; it improves reading, not verification."],
 ["A numbered list of findings, each under 25 words.","Good for a memo, poor for the tracker, and it drops the reconciliation that carries the safety."]
]));

M.push(q("D2",
"Claude writes a summary stating 'total addressable market: €4.2M' while the three segments it lists are 1.8, 1.4 and 0.6. What is the correct response?",
[3],
[["Accept the total; the segments may include rounding.","Rounding does not produce a 0.4 gap on three figures at one decimal place. Accepting is the failure mode here."],
 ["Ask Claude to recompute the total and accept whichever figure appears twice.","Two runs of the same model are not an independent check (8.1); a consistent fabrication is still a fabrication."],
 ["Edit the total to 3.8 and move on.","The number becomes right and the process stays broken; you also silently changed a derived figure without knowing which side was wrong."],
 ["Stop: a derived figure that does not reconcile to its own parts means either the total or the extraction is wrong. Recompute from the source with code execution, then re-derive the narrative.","Correct. Pass 4 (consistency) has failed, and 5.2's rule applies — figures must be computed and reconciled, not edited (4.1, 5.2)."]
]));

M.push(q("D2",
"A partner asks for a 'simpler version for the shop floor'. Claude produces a version in which every figure has been rounded and one figure has become 'about 20%'. The right action is:",
[2],
[["Approve it: simplicity was the request, and approximations suit a non-specialist audience.","Meeting the stated request while destroying the verbatim requirement is the trap; a shop-floor audience still needs true numbers (4.6)."],
 ["Ask Claude to reverse the rounding by regenerating the original.","Regeneration does not recover verified content; it produces a new plausible draft (8.1)."],
 ["Diff the simplified version against the verified original field by field, restore every figure and its source, and re-issue with the simplification limited to wording and order.","Correct. Adaptation may change selection and order; it must not change facts — and the only way to be sure is to compare, not to read (4.6)."],
 ["Keep the simplified version and add a footnote saying figures are approximate.","A footnote on an invented approximation is disclosure of an error, not correction of one."]
]));

M.push(q("D2",
"Which single addition to a prompt most reliably converts an unverifiable answer into a checkable one?",
[0],
[["Requiring, for every claim, the file name, the location and the exact quoted sentence relied on.","Correct. It makes fabrication structurally harder and turns review into open-and-compare (4.4) — the one control that changes what the *output* contains."],
 ["Instructing Claude to be rigorous and to double-check anything uncertain.","No mechanism, and 'uncertain' is undefined; the model's own sense of uncertainty is not a signal (2.1)."],
 ["Asking it to state a confidence score for each paragraph.","Explicitly distractor-shaped: self-assessed confidence is not evidence and is itself generatable."],
 ["Requesting a longer answer so more reasoning is visible.","More text increases plausible filler and review cost; reasoning shown is not reasoning verified."]
]));

M.push(q("D2",
"Claude has produced three versions of a client apology. The associate must choose one. Which selection method is defensible?",
[1],
[["Pick the one that reads best, since fluency indicates quality.","Fluency is what fabrication feels like (2.1). Selecting on read-feast rewards the smoothest, not the safest."],
 ["Score all three against pre-written criteria — facts intact against the source, no claim unsupported, tone appropriate, nothing admitted that is not true — and then edit.","Correct. Comparing on fixed criteria is the method; and it ends in editing rather than accepting, which is the objective's verb (4.6)."],
 ["Ask Claude which of the three is best and use that one.","The model is being asked to judge its own reliability, and it will usually nominate something (4.4)."],
 ["Combine the best sentences from all three into a fourth version.","Fluent hybrid text with no provenance; a legal risk nobody has read as a whole. Merge only against criteria, with a review."]
]));

M.push(q("D2",
"An associate pushes back on Claude's analysis: 'surely the eastern region grew?' Claude immediately agrees and revises. Nothing new was provided. What should she do next?",
[2],
[["Accept the revision — the model had the data and simply needed the right question.","Sycophancy is a named behaviour pattern (4.3 #9); a shift with no new evidence is evidence about the shift, not the answer."],
 ["Ask Claude to explain its reasoning for the change and accept if the explanation is convincing.","A convincing explanation generated in the same breath as the concession is not a check; plausibility is the failure mode."],
 ["Return to the source data, recompute the regional figures independently, and then ask Claude to state the strongest objection to *her* conclusion.","Correct. External verification first; then use the model adversarially rather than submissively (4.1, 5.5)."],
 ["Switch to a stronger model to get a more stable answer.","Tier does not fix an epistemic problem, and it hides that the original figure was never checked (8.2)."]
]));

M.push(q("D2",
"In a shared Project holding two clients' briefs, an analysis of Client A's pricing cites a discount structure that belongs to Client B. The correct response is:",
[3],
[["Add an instruction: never use Client B's material when answering about Client A.","Instructions do not create boundaries; retrieval still surfaces the similar document (6.2). The prompt cannot enforce confidentiality."],
 ["Ask Claude which document it used and re-verify that citation.","Necessary but insufficient: it fixes this answer and leaves the contamination available to the next 200."],
 ["Rerun the analysis at a higher tier so it attends more carefully.","Wrong diagnosis entirely; more reasoning over a polluted corpus produces a more confident error."],
 ["Treat it as a configuration defect: isolate the clients into separate Projects so the candidate set cannot contain the other client's material, then re-run the affected outputs.","Correct. Source contamination (4.3 #7) is a scope problem, and scope is the only place it is durably fixed (6.2)."]
]));

M.push(q("D2",
"Which TWO of the following are legitimate verification techniques before a Claude-assisted deliverable leaves the team?",
[0,3],
[["Random spot-checking of three or four claims by opening the cited source locations.","Correct. Sampling at the source is the technique; random selection avoids the model front-loading its best-supported claims (4.1)."],
 ["Asking Claude to review its own summary for errors and confirm it is accurate.","Not verification. Generation, re-labelled (2.1, 4.4)."],
 ["Accepting the output if it contains no obviously implausible statements.","Reading-based trust is the exact mechanism that failed at Meridian; implausibility is not the failure signal (4.3)."],
 ["Checking that every requirement in the brief is either addressed or explicitly marked as not covered.","Correct. A completeness contract is a verification technique, and it catches the defect no other pass can (4.2)."]
]));

/* ---------------- D4 · Workflow Integration and Solution Design (10) ---------------- */
M.push(q("D4",
"A team is starting an engagement to redesign a client's invoice processing. Inputs are a call recording, an outdated SOP, a complaint log and two dashboards. What should Claude be asked to produce *first*?",
[1],
[["A complete process design for the new invoice workflow.","Jumping to the deliverable hides every unresolved conflict inside a plausible design — the most expensive place to discover it (5.1)."],
 ["An inventory of the sources, a tagged requirement list marking verbatim / inferred / conflict / gap, and a list of conflicts.","Correct. Synthesis before the material is inventoried and tagged is invention with better manners; the conflict list is the highest-value early artefact."],
 ["A polished project brief to send to the client for approval.","A polished brief is what an unverified synthesis becomes once someone formats it — and it invites the client to ratify your assumptions."],
 ["A set of success metrics for the redesign.","Metrics matter, but they come from requirements; deriving them first means letting the model invent the criteria everything is measured against (5.1, 5.3)."]
]));

M.push(q("D4",
"A plan written with Claude states: 'Onboarding will take 3 weeks, so annual saving is €96,000.' Only '3 weeks' and '€96,000' appear anywhere. What is the defect?",
[2],
[["The saving figure is too precise to be credible.","Precision is not the issue; a precise, well-formatted, invented number is precisely what makes this dangerous (4.3)."],
 ["Three weeks is an unrealistic estimate.","The estimate's plausibility is not the structural flaw, and no input was supplied to judge it against."],
 ["A derived figure with no measured input, no stated formula and no owner for the assumption — it is an assertion in the costume of a calculation.","Correct (5.2). Two figures are being presented as if related by arithmetic that nobody has written down."],
 ["The plan should have been produced as an artifact so it could be edited.","Format is downstream of a plan with no derivable basis; nothing in the container makes €96,000 defensible."]
]));

M.push(q("D4",
"Which request most clearly should be escalated to a Claude Developer or Architect rather than solved by an Associate?",
[0],
[["Extract six fields from 800 supplier PDFs each month, validate them against the ERP, and write corrections back to the ERP automatically when a mismatch is found.","Correct. Read volume plus validation plus *automated writes into a system of record* is L3: integration, permissions, rollback, audit (2.3, 5.3)."],
 ["Draft a summary of each supplier's terms from a folder of contracts for a person to review.","L2 — the standard Associate use case: one Project, restricted sources, human review."],
 ["Build a Project for the procurement team with house style and definitions and run it for a month to see how it goes.","L2 configuration work with a pilot; precisely the Associate's remit (5.3, 6.1)."],
 ["Produce a comparison table of terms across twelve agreements for a meeting.","L1/L2 with a fixed extraction format (2.3) — no system action, no unattended execution."]
]));

M.push(q("D4",
"In a delegation map for a client reporting workflow, which step should remain entirely human?",
[3],
[["Converting a 40-page survey export into a table of fixed fields.","Specifiable, repetitive, cheap to verify — the strongest candidate for automation on the five tests (5.4)."],
 ["Drafting the commentary from a table of verified figures, with all figures kept verbatim.","Augmentation: drafting delegated, verification retained. This is the useful middle, not the human-only row."],
 ["Formatting the final pack to house style as an artifact.","Mechanical and checkable by comparison; delegable with a light gate."],
 ["Deciding which of three recommended actions to put in front of the client's board.","Correct. This is the accountable judgement itself — the 'fails the accountability test' case, and never delegable however well-specified it seems."]
]));

M.push(q("D4",
"A team pilots Claude for weekly client status updates. After three weeks, what is the correct basis for the continue / change / stop decision?",
[1],
[["Whether the team enjoys using it, since adoption predicts durability.","Adoption matters as one metric, but sentiment is not the criterion and it is measured easiest by the people who already like it (8.4)."],
 ["The pre-defined metrics — time per item, rework rate, defect escapes and cost per accepted item — measured from the pilot's real output, against the values fixed before it started.","Correct (5.3). Criteria set before the pilot and measured after it; and defect escapes is what distinguishes no-visible-errors from no-errors."],
 ["Whether the outputs looked professional in the sample the team reviewed.","Looking professional is the fluency trap (2.1) applied to evaluation (5.3)."],
 ["Whether a stronger model would have produced better drafts, tested in week four.","Introduces a second variable mid-pilot, so nothing can be attributed (3.3, 8.2)."]
]));

M.push(q("D4",
"A risk lead objects: 'We cannot use AI on client deliverables, we've seen what happened.' Which response best communicates value and limits?",
[2],
[["Reassure her that this implementation is different because the model is far better than it was.","Over-promising (5.5), and it makes the earlier incident irrelevant rather than instructive — the opposite of reassurance to a risk function."],
 ["List the eleven known failure modes of generative models so that nothing is concealed.","Over-disclosure converts a decision into a risk dump (5.5) and offers no control, so no path to yes."],
 ["State the quantified value, name the specific risk of fabricated figures, and describe the two controls that address it — required citations and a named sign-off on every figure — then ask for a defined pilot.","Correct. A limit paired with the control that covers it is an operating procedure, which is what a committee can approve (5.5)."],
 ["Point out that the previous incident was human carelessness, not an AI problem.","Partly true and rhetorically fatal: it dismisses the risk function's evidence and implies controls are unnecessary."]
]));

M.push(q("D4",
"Meridian's team lead proposes automating a monthly 'reconciliation of client lists across offices' that exists because the three offices name the same client three different ways. The better recommendation is:",
[0],
[["Delete the step by fixing the cause: one client-naming convention, enforced in the Project and at intake — then automate nothing.","Correct (5.4, 8.4). Automating a step that exists only because an upstream defect does is the textbook way to make a bad workflow fast."],
 ["Automate it exactly as specified, then measure the time saved.","Technically successful, strategically wrong: the reconciliation still runs, the defect still recurs, and now it recurs faster and more consistently."],
 ["Automate it and add a human review of every output, so the risk is covered.","Pays twice: the automation cost and a 100% gate that will be skipped under deadline (4.5)."],
 ["Escalate it to an Architect as an L3 integration task.","Over-escalation of a data-hygiene decision; there is nothing to engineer before the naming problem is fixed (2.3)."]
]));

M.push(q("D4",
"Which TWO statements correctly distinguish augmenting an existing workflow from redesigning it?",
[0,2],
[["Augmentation accelerates the process you have; redesign changes the steps, their order or their existence — and Claude often makes a previously impossible sequencing rational.","Correct. Naming which one you are doing is the first design decision, because they have different success criteria and different risks."],
 ["Redesign should be attempted only after augmentation has demonstrably failed.","Invented sequencing. When measurement shows a step should not exist (5.4, 8.4), accelerating it first is not prudence."],
 ["Augmentation makes the review gates optional where redesign makes them structural.","Backwards and false: neither removes a load-bearing control, and a redesign that removes one has merely moved the cost to the client (8.4)."],
 ["A well-chosen augmentation can change who does a step while a redesign changes whether the step happens at all — and both must be measured against pre-agreed criteria.","Correct. The distinction is about the step's existence versus its ownership, and measurement is common to both (5.3)."]
]));

M.push(q("D4",
"Two months after standardising an AI-assisted process, the client reports an error that the internal review had passed. Which metric most directly captures what failed?",
[3],
[["Cycle time, since a faster process necessarily cuts review corners.","A plausible-sounding causal story with no measurement in it; cycle time says nothing about defects."],
 ["Adoption rate, because staff must have been skipping the process.","Speculation about the cause dressed as a metric — and it lets the review design off the hook."],
 ["Cost per accepted item, since under-budgeting review always shows up there first.","A real signal over a longer window, but it is not what a client-found defect measures."],
 ["Defect escape rate — errors reaching the client per hundred items — because it is the only metric that measures the review rather than the generation.","Correct (8.4). Every other metric can look excellent while the control is decorative; escape rate is what the review is for."]
]));

M.push(q("D4",
"A stakeholder asks Claude to 'just make the whole reporting process automatic by Friday'. The Associate's best response is:",
[1],
[["Agree, and use a very detailed prompt in a Project so nothing is missed.","A prompt cannot supply scheduling, permissions, error handling or an audit trail (2.3, 7.2) — and agreeing to it buys two days before the failure."],
 ["Separate the request into what is L2 and shippable this week — a Project, defined steps, a human gate — from what is L3 and needs an engineering decision, and hand over the latter as a written escalation.","Correct (2.3, 5.3). This is the response that both delivers value now and names the boundary precisely instead of disputing the deadline."],
 ["Refuse, because full automation is never appropriate for client reporting.","Over-correction; some steps are automatable, and refusal forfeits the value while teaching the stakeholder that governance means no."],
 ["Escalate the entire request, declining to touch any part of it until the Architect responds.","Correct escalation, wrong scope: it forgoes the improvable parts and adds a queue to work that needs no engineering (5.3)."]
]));

/* ---------------- D6 · Governance, Risk and Responsible Use (9) ---------------- */
M.push(q("D6",
"A team lead wants Claude to draft summary judgements about three employees' performance for the calibration meeting, from their written self-reviews and manager notes. The most appropriate response is:",
[2],
[["Approve it; drafting summaries is ordinary productivity work with no decision attached.","Partly true and dangerously framed. The output is not a summary of text, it is a characterisation feeding an evaluation of people — impact and reversibility both bite (7.1)."],
 ["Refuse, because HR material may never be processed with AI.","An invented absolute. The objection is to the use and the data class, not a blanket prohibition the policy actually contains (7.1, 7.2)."],
 ["Permit narrow, clearly-bounded support — structuring each person's own stated evidence against the published criteria — while holding that any comparative judgement about a person is made by named humans, with the material handled at restricted classification.","Correct. Decision support versus decision making, plus the classification that governs the data: the two controls that make the request safe without granting the verdict to a model (7.1, 7.2)."],
 ["Approve it provided Claude appends a confidence rating to each judgement.","A confidence score on a judgement about a person is not a safeguard; it makes an unauditable claim look measured (4.4)."]
]));

M.push(q("D6",
"An analyst needs trend analysis on a customer file that includes names, addresses and payment references. Policy classifies it restricted. The most appropriate action is:",
[0],
[["Derive a reduced dataset — identifiers replaced with stable pseudonyms, no free-text fields — confirm the governing clause permits that, then analyse and log the decision.","Correct (7.2, 7.4). Reducibility preserves exactly what the task needs, and stable keys keep per-customer trend analysis valid."],
 ["Proceed, because the analysis happens inside the firm's own tenant and nothing leaves it.","Location is not the test; the policy governs the data class and the engagement terms, not the perimeter (7.4)."],
 ["Upload the file and instruct Claude to ignore the personal columns.","An instruction is not a control: the data is in the window, retrievable, and now inside a Project (7.2). This is the guide's own wrong-answer shape."],
 ["Do the analysis manually and skip AI entirely.","Over-correction where a compliant path exists; abandoning the task is the standard distractor (7.1)."]
]));

M.push(q("D6",
"A consultant wants to enable a Skill downloaded from a public repository because it produces better legal summaries. Under Skill governance, the deciding consideration is:",
[3],
[["Whether it improves summary quality measurably, since quality is the point of a Skill.","Quality is the *reason* for the request, not the safety test. An unreviewed capability with reach is not enabled on the strength of its output."],
 ["Whether other firms are using it, as a proxy for trustworthiness.","Reputation is not review, and 'widely used' is exactly how supply-chain problems spread (7.3)."],
 ["Whether its instructions are politely worded, since tone indicates care in construction.","Cosmetic and manipulable; nothing here speaks to what it can read, write, or exfiltrate."],
 ["That a Skill is software with standing authority: it needs a named owner, a review of what it can read and write, an injection and exfiltration assessment, a version, and enablement limited to specific Projects — regardless of its provenance.","Correct (7.3). Enablement is a supply-chain decision, and an unreviewed third-party capability is the least reviewable kind."]
]));

M.push(q("D6",
"Data in a client engagement is classified confidential; the engagement letter permits firm-approved tools but prohibits any third-party marketing AI service. Which configuration complies?",
[1],
[["Any tool the individual associate holds an account for, since use is internal to the firm.","Personal accounts are precisely the third-party services the clause excludes; 'internal to the firm' is not the same as 'approved for this data' (7.4)."],
 ["The firm-approved environment only, with the client's material isolated in that client's own Project, and any tool outside the approval list removed from the workflow.","Correct. Classification determines the permitted surface, and the engagement letter narrows it further; isolation is what makes it enforceable rather than aspirational (6.2, 7.2)."],
 ["Any tool, provided the material is deleted from the conversation afterwards.","Deleting a chat does not undo a disclosure, and does not reach what was copied or retained elsewhere (7.4)."],
 ["Approved tools, plus an instruction in the Project telling Claude never to reference other clients.","Right surface, wrong mechanism: the instruction adds reassurance while the isolation defect remains (6.2)."]
]));

M.push(q("D6",
"Meridian's engagement letters require that clients be told when generative AI materially assisted a deliverable. A junior associate, under time pressure, removes the disclosure line from the template footer. How should this be handled?",
[2],
[["Correct it and remind the team that the footer is mandatory; individual lapses are the remaining risk.","The individual fix is right and the diagnosis is wrong: a control that depends on remembering under deadline is the design that failed (7.5)."],
 ["Escalate to Legal, since the contractual term may have been breached.","Reasonable and probably necessary for the instance, but not the *first* framing: it treats a systemic design gap as an incident to be litigated internally."],
 ["Treat it as an enforcement failure: put the field in the artefact so it cannot be submitted empty, make the presence of the disclosure checkable, and review whether a six-item footer is being skipped because it is too long to maintain.","Correct. Policy has to live in the workflow, mechanically where possible (7.5) — 'one screen, not a handbook', with the design friction that caused the workaround examined."],
 ["Remove the disclosure requirement, since universal disclosure is theatre.","Over-correction in the opposite direction, and it discards a contractual obligation to solve a formatting problem (5.5)."]
]));

M.push(q("D6",
"A deck built with Claude presents '87% of users reported improved productivity'. The underlying survey had 31 respondents, 27 of whom were from the two departments that volunteered for the pilot. Which statement best describes the ethical problem?",
[0],
[["Unfair representation of evidence: a precise-sounding statistic generalised from a self-selected sample, presented without its base.","Correct (7.5). The failure is not the number but the population it is claimed to describe — and the precision manufactures the authority."],
 ["Hallucination, since 87% is an implausibly high figure.","Nothing is fabricated; the percentage was computed from real replies. Mislabelling this as hallucination hides the actual, harder problem."],
 ["Bias of the offensive kind, in the wording of the survey question.","No loaded wording is in evidence, and 'bias' on this exam is usually about sample and metric rather than language."],
 ["No ethical problem, provided the arithmetic is right — the analyst can note the sample size verbally if asked.","Arithmetic correctness is not representativeness. 'If asked' converts disclosure into a trap for the reader (4.2)."]
]));

M.push(q("D6",
"Which TWO uses should be classified as requiring review by a specialist owner before any Claude use, rather than approved or refused at the team's own level?",
[0,3],
[["Processing a file containing suspected employee misconduct allegations for an internal investigation summary.","Correct. Restricted personal data, employment consequences, discoverable material: Legal/HR owns the decision regardless of what the tool can do (7.1, 7.2)."],
 ["Summarising the firm's own published blog posts to build an internal index.","Public data, internal use, no third-party rights, no personal data. Ordinary L2 work with normal verification."],
 ["Producing a draft contractual clause to be sent to a counterparty without lawyer review.","Correct in the opposite direction: it has legal effect and a counterparty. The accountable act cannot be delegated (4.5, 7.1)."],
 ["Drafting twenty candidate interview questions from an approved role profile.","Generation from supplied material, low stakes, edited by a human before use. Nothing here needs a specialist gate."]
]));

M.push(q("D6",
"An associate is asked whether Claude may process a client's employee survey results. The engagement letter is silent, firm policy classifies employee personal data as restricted, and no one is sure who owns the decision. The most appropriate action is:",
[1],
[["Proceed, since a silent engagement letter means no restriction was agreed.","Silence is not permission where the firm's own classification independently restricts the data (7.2). Absence of a clause is not absence of a control."],
 ["Treat the firm's own classification as controlling, name the owner of the decision, and get a written yes or no before anything is uploaded — proposing a reduced or aggregated dataset that may clear it faster.","Correct. 'Nobody is sure who owns it' is itself the finding; the classification already answers the safety question while the authority question gets resolved (7.2, 7.4)."],
 ["Refuse, because a silent contract plus restricted data means the use is prohibited.","Wrong conclusion from correct premises: silence plus policy means *undetermined by the client*, which an owner can determine — and reduction may satisfy the policy outright."],
 ["Upload it, then check whether the client objects after seeing the analysis.","Reverses the sequence in a way that makes the disclosure a fait accompli — the exact structure that produced the freeze (4.5)."]
]));

M.push(q("D6",
"Which statement about a written AI policy is correct?",
[3],
[["A long, comprehensive policy maximises compliance, since coverage reduces ambiguity.","Coverage without enforcement at the point of use produces a document nobody reads in the moment that matters (7.5)."],
 ["Policies should describe prohibited *tools*, because tool-level rules are easiest to audit.","Tool-level rules rot immediately as features change, and they miss the data and use-case dimensions that actually carry risk."],
 ["If the policy conflicts with a model's own guidance, the model's guidance governs, since it knows its current behaviour.","Inverted (7.1). A model is not the governance authority; asking it whether it is permitted is the distractor pattern."],
 ["A policy earns compliance by being short, embedded in the artefacts and controls people actually meet, owned by named people, and periodically checked for whether the control works — not merely whether it exists.","Correct. Enforceability comes from placement and ownership; reviewability includes whether it is *working* (7.5, 4.5)."]
]));

window.CCAO.mock.meta = {
  title: "CCAO-F Deneme Sınavı — Full mock exam",
  titleTr: "CCAO-F Deneme Sınavı",
  minutes: 120,
  blurb: "60 scenario items in the real format, built to the reported blueprint weights: D2 13 · D4 10 · D6 9 · D1 8 · D3 7 · D5 7 · D7 6. Every option carries a rationale, right and wrong — the explanations name why each distractor fails."
};
