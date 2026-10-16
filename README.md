# claude-certified-associate-foundations-ccao-f-hazrlg

Study material for **Claude Certified Associate Foundations: CCAO-F Hazırlığı** (Dr Amar Massoud, Türkçe) —
built as an interactive, offline-friendly study site rather than a pile of PDFs.

Prose is in **English**; every lesson keeps its **original Turkish title**, so the pack maps one-to-one onto
the video course. All content is organised around the course's recurring case firm, **Meridian Partners**.

---

## Run it

```bash
cd study-site && ./serve.sh          # → http://localhost:5173/
# or: python3 -m http.server 5173 --directory study-site
# or: just open study-site/index.html in a browser — there is no build step
```

No dependencies, no bundler, no network calls. Everything is a plain `<script>`-loaded global; progress is
written to `localStorage` in your browser and never leaves the machine.

## What's in the pack

| | |
|---|---|
| **Notes** | 35 lessons across 8 sections, each with the framework it teaches, the Meridian decision it was applied to, the exam trap attached to it, and a five-minute action |
| **Assignments** | Ödev 1–7 with marking keys (the reasons wrong answers lose marks) |
| **Section quizzes** | 8 quizzes, 48 items, per-option rationale for every choice |
| **Mock exam** | 60 items, 120-minute countdown, flag + palette navigation, percent-correct-by-domain report, full review |
| **Flashcards** | 80 cards (EN term · TR term on the front, exam-style answer on the back), self-rating |
| **Cheat sheets** | 10 printable one-pagers |
| **Blueprint checklist** | all 30 exam objectives, rated 0–2, feeding a priority table weighted by domain |
| **Progress** | read state, quiz results, mock history — and "your weakness × the marks attached to it" |

Mock item budget follows the reported blueprint weights: D2 13 · D4 10 · D6 9 · D1 8 · D3 7 · D5 7 · D7 6 = 60.

Keyboard: `1–4` + `Enter` in quizzes; `1–4`, `←`/`→`, `f` (flag) in the mock; `space`, `←`/`→` on flashcards.

## Layout

```
study-site/
├── index.html              shell + script load order
├── serve.sh
└── assets/
    ├── css/app.css         design system, responsive nav, print styles
    ├── js/md.js            the tiny markdown renderer the prose is stored in
    ├── js/app.js           router, progress store, quiz + mock runners
    └── data/
        ├── meta.js         exam facts, domain weights/objectives, 4D, Meridian case, outcomes
        ├── curriculum-1..5.js   sections 1–8: lessons + assignment briefs
        ├── quizzes-a.js / -b.js q1–q8
        ├── mock-a.js / -b.js    items 1–30 / 31–60
        ├── cheatsheets.js ten one-page references
        └── flashcards.js   80 self-rating cards
```

To edit content, touch only `assets/data/*.js`. Shapes:

- lesson `{id, ref, mm, dom, tr, en, objective?, body}` — `body` is markdown (see `md.js` for the syntax:
  `### [trap]` headings, `::tip label | text` callouts, `~~~` fences, `|` tables, `**bold**`, `==mark==`)
- item `{dom, stem, opts:[{t, w}], ans:[i]}` — `w` is the rationale for that option; add `type:"multi", need:2`
  for multiple-response (or just give it two answers — the runner derives the count from the key)
- card `{dom, f, b, w}` · cheat sheet `{id, title, tag, md}`

Load order in `index.html` matters: data first, then `md.js`, then `app.js`.

## Provenance and limits

Built from three public sources: the **official CCAO-F Exam Guide v1.0 (July 2026)**, this course's **published
syllabus and ten learning outcomes**, and Anthropic's published **AI Fluency / Claude product documentation**.
It is a study companion *to* the video course, not a transcript of it; where the course coins a label for a
framework, the notes reconstruct the idea and say so — cross-check exact wording against the video.

Independent and **unofficial**: not affiliated with or endorsed by Anthropic or Pearson VUE. Domain weights
are third-party figures (Anthropic does not publish them), and the 75% rehearsal bar used here is a proxy, not
a prediction — the real exam is scaled 100–1,000, criterion-referenced, and passed at 720. Product behaviour
changes; verify current behaviour in Anthropic's documentation before relying on it in an item or at work.
