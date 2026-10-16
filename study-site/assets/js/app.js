/* CCAO-F study site — app shell, router, progress store, quiz + mock runners. */
(function () {
  var C = window.CCAO;
  var MET = C.meta, CUR = C.curriculum.sections, QUIZ = C.quizzes, MOCK = C.mock, CARDS = C.cards, CHEAT = C.cheats;
  var rm = window.renderMD;
  var DOM = {};
  MET.domains.forEach(function (d) { DOM[d.code] = d; });
  var ALLDOM = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  var NOBJ = MET.domains.reduce(function (a, d) { return a + d.objs.length; }, 0);
  var NASSIGN = CUR.filter(function (s) { return s.assignment; }).length;
  CUR.forEach(function (s) { if (s.assignment) s.assignment.__anchor = s.lessons[s.lessons.length - 1].id; });
  /* Items whose stem says "Which TWO" carry two keys in `ans` but no explicit count — derive it,
     otherwise the runner would treat them as single-choice and they could never be answered. */
  function fixNeed(list) { list.forEach(function (it) { if (!it.need && it.ans && it.ans.length > 1) { it.need = it.ans.length; it.type = "multi"; } }); }
  fixNeed(MOCK.questions); QUIZ.forEach(function (q) { fixNeed(q.questions); });

  /* ------------------------------ store ------------------------------ */
  var KEY = "ccaof.study.v1";
  var def = { read: {}, quiz: {}, mock: [], cards: {}, obj: {}, done: {} };
  var st = JSON.parse(JSON.stringify(def));
  try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  /* ------------------------------ helpers ------------------------------ */
  function h(s) { return s == null ? "" : String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pill(dom) {
    var d = DOM[dom];
    if (!d) return "<span class=\"pill meta\">orientation</span>";
    return '<span class="pill ' + dom.toLowerCase() + '">' + dom + " · " + h(d.name) + " " + d.weight + "%</span>";
  }
  function shortPill(dom) {
    var d = DOM[dom];
    return '<span class="pill ' + (d ? dom.toLowerCase() : "meta") + '">' + (d ? dom : "intro") + "</span>";
  }
  function sectionByNum(n) { return CUR.filter(function (s) { return String(s.num) === String(n); })[0]; }
  function flatLessons() { var o = []; CUR.forEach(function (s) { s.lessons.forEach(function (l) { o.push({ s: s, l: l }); }); }); return o; }
  var FLAT = flatLessons(), LESSON_TOTAL = FLAT.length;
  function totalRead() { return Object.keys(st.read).filter(function (k) { return st.read[k]; }).length; }
  function domainStats(list) {
    var o = {}; ALLDOM.forEach(function (d) { o[d] = { c: 0, t: 0 }; });
    list.forEach(function (x) { if (o[x.dom]) { o[x.dom].t++; if (x.hit) o[x.dom].c++; } });
    return o;
  }
  function firstLine(md) {
    var all = md.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    var hit = all.filter(function (l) { return !/^[#|>:~\-]/.test(l); });
    var s = (hit[0] || all[0] || "").replace(/^[#|>:~\-]+\s*/, "").replace(/^::\s*\w+\s*[^|]*\|\s*/, "").replace(/\*\*/g, "");
    return h(s.length > 165 ? s.slice(0, 165) + "…" : s);
  }
  var FOOT = '<div class="foot"><b>About this material.</b> Built from the official <i>Claude Certified Associate – Foundations Exam Guide v1.0</i> (July 2026), the published syllabus and learning outcomes of <i>' +
    h(MET.courseTitleEn) + "</i> (" + h(MET.instructor) + "), and Anthropic&rsquo;s published AI Fluency and product documentation. Independent and unofficial; not affiliated with or endorsed by Anthropic or Pearson VUE. Domain weights are third-party figures — Anthropic does not publish them. Framework labels the course coins are reconstructed where needed and flagged in the notes. This is a study companion, not a transcript of the paid videos: use it alongside them, and verify current product behaviour in Anthropic&rsquo;s documentation.</div>";

  /* ------------------------------ router ------------------------------ */
  var routes = {};
  function render() {
    var raw = (location.hash || "#/home").replace(/^#\/?/, "");
    var seg = raw.split("/");
    var name = seg[0] || "home";
    var fn = routes[name] || routes.home;
    document.getElementById("view").innerHTML = fn(seg.slice(1));
    document.body.classList.toggle("exammode", name === "mock" && running);
    navActive(name); paintProgress(); buildNav();
    if (window.innerWidth <= 960) document.body.classList.remove("mopen");
    var f = document.getElementById("nsearch"); if (f && f.value) applyFilter(f.value);
  }
  window.addEventListener("hashchange", render);

  var NAV = [["home", "⌂", "Dashboard"], ["notes", "▤", "Study notes"], ["assign", "✎", "Assignments"],
  ["quiz", "◎", "Section quizzes"], ["mock", "⏱", "Mock exam"], ["cheats", "▣", "Cheat sheets"],
  ["cards", "▢", "Flashcards"], ["blueprint", "☑", "Blueprint checklist"], ["progress", "↗", "Progress"]];
  function buildNav() {
    var qs = Object.keys(st.quiz).map(function (k) { return st.quiz[k]; });
    var qq = qs.reduce(function (a, b) { return a + b.score; }, 0), qt = qs.reduce(function (a, b) { return a + b.total; }, 0);
    var cc = {
      notes: totalRead() + "/" + LESSON_TOTAL, assign: Object.keys(st.done).length + "/" + NASSIGN,
      quiz: (qs.length ? qq + "/" + qt : "0/48"), mock: st.mock.length ? st.mock[st.mock.length - 1].pct + "%" : "—",
      cards: Object.keys(st.cards).length + "/" + CARDS.length, blueprint: Object.keys(st.obj).length + "/" + NOBJ,
      progress: "", home: ""
    };
    document.getElementById("nav").innerHTML = NAV.map(function (n) {
      return '<a href="#/' + n[0] + '" data-k="' + n[0] + '"><span class="ic">' + n[1] + "</span>" + n[2] +
        (cc[n[0]] ? '<span class="n">' + cc[n[0]] + "</span>" : "") + "</a>";
    }).join("");
  }
  function navActive(name) {
    Array.prototype.forEach.call(document.querySelectorAll("#nav a"), function (a) { a.classList.toggle("on", a.dataset.k === name); });
  }
  function paintProgress() {
    var el = document.getElementById("sideprog"); if (!el) return;
    var p = Math.round(100 * totalRead() / LESSON_TOTAL);
    var qs = Object.keys(st.quiz).map(function (k) { return st.quiz[k]; });
    var qc = qs.reduce(function (a, b) { return a + b.score; }, 0), qt = qs.reduce(function (a, b) { return a + b.total; }, 0);
    var last = st.mock.length ? st.mock[st.mock.length - 1] : null;
    el.innerHTML = "<h4>Your progress</h4>" +
      row("Lessons read", totalRead() + "/" + LESSON_TOTAL, p) +
      row("Quiz items right", qs.length ? qc + "/" + qt : "—", qt ? Math.round(100 * qc / qt) : 0) +
      row("Latest mock", last ? last.pct + "%" : "not taken", last ? last.pct : 0);
    function row(a, b, w) { return '<div class="row"><span>' + a + "</span><span>" + b + '</span></div><div class="bar"><i style="width:' + w + '%"></i></div>'; }
  }

  /* ------------------------------ home ------------------------------ */
  routes.home = function () {
    return '<div class="wrap"><div class="eyebrow">' + h(MET.courseTitleTr) + "</div>" +
      '<h1 class="page">CCAO-F study pack<span class="tr">Ders notları, bölüm testleri, ödevler ve 60 soruluk deneme sınavı — İngilizce içerik, orijinal Türkçe ders başlıkları</span></h1>' +
      "<p class=\"lede\">Everything here is organised around the one question the exam keeps asking: <b>is this output safe to let go, and is this use permitted?</b> " +
      LESSON_TOTAL + " annotated lessons, 8 section quizzes (48 items), " + NASSIGN + " worked assignments, " + CARDS.length +
      " flashcards, " + CHEAT.length + " cheat sheets and a 60-question timed mock built to the reported blueprint weights.</p>" +
      '<div class="note info" style="margin-top:18px">' + rm(MET.buildNote) + "</div>" +

      "<h2 class=\"sec\">The exam in one screen</h2>" +
      '<div class="grid c2"><div class="card"><h3>Facts to know cold</h3><div class="tablewrap" style="margin:0"><table class="mdt"><tbody>' +
      MET.examFacts.map(function (r) { return '<tr><td style="color:var(--fg3);width:34%">' + h(r[0]) + "</td><td>" + h(r[1]) + "</td></tr>"; }).join("") +
      "</tbody></table></div></div>" +
      '<div class="card"><h3>What it actually validates</h3><p style="font-family:var(--serif);font-size:16px;color:var(--fg2);margin-top:0">' + h(MET.validate) + "</p>" +
      "<p>There is no recall section. Every item is a scenario that ends by asking what you would <i>do</i>. The three heaviest domains — <b>52%</b> between them — concern what happens <i>after</i> the text exists, or <i>around</i> the decision to use it at all.</p>" +
      '<div class="flexrow" style="margin-top:14px"><button class="btn pri" data-act="go" data-t="mock">Sit the mock exam</button>' +
      '<button class="btn" data-act="go" data-t="notes">Start the notes</button><button class="btn ghost" data-act="go" data-t="blueprint">Self-assess</button></div></div></div>' +

      "<h2 class=\"sec\">Blueprint &amp; weights</h2>" +
      '<div class="tablewrap"><table class="mdt"><thead><tr><th>#</th><th>Domain</th><th>Türkçe</th><th>Weight</th><th>≈ Items</th><th>Section</th><th>Objectives</th></tr></thead><tbody>' +
      MET.domains.slice().sort(function (a, b) { return b.weight - a.weight; }).map(function (d) {
        var sec = d.lessons[0] | 0;
        return "<tr><td>" + sec + "</td><td><b>" + h(d.name) + "</b></td><td style=\"color:var(--fg3);font-size:12.5px\">" + h(d.tr) +
          "</td><td><b>" + d.weight + "%</b></td><td>" + d.items + '</td><td><a href="#/notes/s' + sec + '">§' + sec + "</a></td><td>" + d.objs.length + "</td></tr>";
      }).join("") + "</tbody></table></div>" +

      "<h2 class=\"sec\">The four competencies the course is built on</h2>" +
      '<div class="grid c2">' + MET.fourD.map(function (f) {
        return '<div class="card"><h3>' + h(f.d) + ' <span class="tag">' + h(f.tr) + "</span></h3>" +
          '<p style="margin:.2em 0 .7em;font-family:var(--serif);font-size:16px;color:var(--acc2)">' + h(f.q) + "</p>" +
          '<p style="font-size:13.4px;color:var(--fg2);margin:0 0 .5em"><span class="tag">when it runs</span><br>' + h(f.mode) + "</p>" +
          '<p style="font-size:13px;margin:.5em 0 0;color:var(--fg2)">Carries domains: ' + h(f.domains) + " · lessons <code>" + h(f.lessons) + "</code></p></div>";
      }).join("") + "</div>" +

      "<h2 class=\"sec\">The case you will work inside</h2>" +
      '<div class="card">' + rm(MET.meridian.blurb) +
      '<div class="tablewrap" style="margin-bottom:0"><table class="mdt"><thead><tr><th>Who</th><th>Role</th><th>Their problem</th></tr></thead><tbody>' +
      MET.meridian.cast.map(function (c) { return "<tr><td><b>" + h(c[0]) + "</b></td><td>" + h(c[1]) + '</td><td style="color:var(--fg2)">' + h(c[2]) + "</td></tr>"; }).join("") +
      "</tbody></table></div><p style=\"font-size:12.5px;color:var(--fg3);margin:10px 0 0\">" + h(MET.meridian.castNote) + "</p></div>" +

      "<h2 class=\"sec\">The ten outcomes you are graded on</h2>" +
      '<div class="tablewrap"><table class="mdt"><thead><tr><th>#</th><th>Course outcome (Türkçe)</th><th>What you should be able to do</th><th>Covered in</th></tr></thead><tbody>' +
      MET.outcomes.map(function (o) {
        return "<tr><td>" + o.n + '</td><td style="color:var(--fg2);font-size:12.6px">' + h(o.tr) + "</td><td>" + h(o.en) +
          '</td><td><code style="font-size:11.5px">' + h(o.where) + "</code></td></tr>";
      }).join("") + "</tbody></table></div>" + FOOT + "</div>";
  };

  /* ------------------------------ notes ------------------------------ */
  routes.notes = function (a) {
    if (a[0] && /^s\d+$/.test(a[0])) {
      var s = sectionByNum(a[0].slice(1));
      if (s) return '<div class="wrap"><div class="crumbs"><a href="#/notes">All notes</a> › <span>Section ' + s.num + "</span>" +
        '<span class="right">' + (s.num > 1 ? '<a class="btn sm ghost" href="#/notes/s' + (s.num - 1) + '">← §' + (s.num - 1) + "</a> " : "") +
        (s.num < CUR.length ? '<a class="btn sm ghost" href="#/notes/s' + (s.num + 1) + '">§' + (s.num + 1) + " →</a>" : "") + "</span></div>" +
        '<div class="eyebrow">Section ' + s.num + " · " + s.lessons.length + " lessons · " + s.minutes + " min of video</div>" +
        '<h1 class="page">' + h(s.en) + '<span class="tr">' + h(s.tr) + "</span></h1>" +
        '<p class="lede">' + h(s.blurb) + "</p>" +
        '<div class="toolbar">' + (s.domain !== "meta" ? pill(s.domain) : shortPill("meta")) + '<a class="btn sm" href="#/quiz/' + s.quiz + '">Section test</a>' +
        (s.assignment ? '<a class="btn sm" href="#/assign/' + s.num + '">' + h(s.assignment.ref) + "</a>" : "") + "</div>" +
        '<div class="sectcard" style="margin-top:6px"><div class="lessons">' + lessonsHTML(s) + "</div></div>" +
        (s.assignment ? assignPreview(s) : "") + FOOT + "</div>";
    }
    if (a[0]) return routes.lesson(a);
    return '<div class="wrap"><div class="eyebrow">' + LESSON_TOTAL + " lessons · " + CUR.length + " sections · 3h 40m of video</div>" +
      '<h1 class="page">Study notes<span class="tr">Ders notları — her ders, orijinal Türkçe başlığıyla</span></h1>' +
      '<p class="lede">Each lesson gives you the framework it teaches, the Meridian decision it was applied to, the exam trap attached to it, and a five-minute action. Turkish titles are kept so these notes map one-to-one onto the videos.</p>' +
      '<div class="toolbar"><input id="nsearch" class="searchbox" placeholder="Filter 35 lessons — try &quot;review&quot;, &quot;prompt&quot;, &quot;connector&quot;…" data-act="notesearch" oninput="window.__filt(this.value)"></div>' +
      '<div class="stack" id="sects">' + CUR.map(sectionHTML).join("") + "</div>" + FOOT + "</div>";
  };
  window.__filt = function (v) { applyFilter(v); };
  function applyFilter(v) {
    v = (v || "").toLowerCase().trim();
    Array.prototype.forEach.call(document.querySelectorAll("#sects .sectcard"), function (card) {
      var any = 0;
      Array.prototype.forEach.call(card.querySelectorAll("[data-lesson]"), function (r) {
        var show = !v || r.dataset.lesson.indexOf(v) > -1;
        r.style.display = show ? "" : "none"; if (show) any++;
      });
      var hd = card.querySelector(".hd"), asg = card.querySelector(".assign");
      if (asg) asg.style.display = (!v || asg.dataset.lesson.indexOf(v) > -1) ? "" : "none";
      card.style.display = (any || !v) ? "" : "none";
      if (hd) hd.style.display = any || !v ? "" : "";
    });
  }
  function lessonsHTML(s) {
    return s.lessons.map(function (l) {
      return '<div class="lessonrow" data-lesson="' + h((l.en + " " + l.tr).toLowerCase()) + '" data-go="lesson/' + l.id + '">' +
        '<span class="tick' + (st.read[l.id] ? " on" : "") + '"></span><span class="tag" style="min-width:24px">' + l.ref + "</span>" +
        '<span style="min-width:0"><span class="en">' + h(l.en) + '</span><span class="tr">' + h(l.tr) + "</span></span>" +
        '<span class="rr">' + (l.dom !== "meta" ? shortPill(l.dom) : "") + '<span class="dur">' + l.mm + "</span></span></div>";
    }).join("");
  }
  function sectionHTML(s) {
    var n = s.lessons.length, r = s.lessons.filter(function (l) { return st.read[l.id]; }).length;
    return '<div class="sectcard"><div class="hd" data-go="notes/s' + s.num + '"><div class="num">' + s.num + "</div><div>" +
      "<h3>" + h(s.en) + '<span class="tr">' + h(s.tr) + "</span></h3><p>" + h(s.blurb) + "</p></div>" +
      '<div class="meta">' + (s.domain !== "meta" ? shortPill(s.domain) : "") +
      "<div style=\"margin-top:7px\">" + n + " lessons · " + s.minutes + " min<br>" + r + "/" + n + " read · open →</div></div></div>" +
      '<div class="lessons">' + lessonsHTML(s) +
      (s.assignment ? '<div class="assign" data-lesson="' + h(s.assignment.en.toLowerCase()) + '" data-go="assign/' + s.num + '"><span class="tag">' + h(s.assignment.ref) + "</span>" +
        "<span><b>" + h(s.assignment.en) + '</b> <span style="color:var(--fg3)">· ' + h(s.assignment.tr) + "</span></span>" +
        (st.done[s.num] ? '<span class="pill ok right">✓ done</span>' : "") + "</div>" : "") +
      "</div></div>";
  }
  function assignPreview(s) {
    var as = s.assignment;
    return '<h2 class="sec" style="margin-top:2em">' + h(as.ref) + " · " + h(as.tr) + "</h2>" +
      '<div class="card"><h3>' + h(as.en) + '</h3><div class="md">' + rm(as.brief) + "</div>" +
      '<div class="flexrow" style="margin-top:14px"><button class="btn sm ' + (st.done[s.num] ? "on" : "") + '" data-act="done" data-n="' + s.num + '">' +
      (st.done[s.num] ? "✓ marked complete" : "mark complete") + "</button></div></div>";
  }

  routes.lesson = function (a) {
    var id = a[0], idx = -1;
    for (var i = 0; i < FLAT.length; i++) if (FLAT[i].l.id === id) { idx = i; break; }
    if (idx < 0) return '<div class="wrap"><p class="empty">No such lesson.</p></div>';
    var s = FLAT[idx].s, l = FLAT[idx].l, prev = FLAT[idx - 1], next = FLAT[idx + 1];
    var was = st.read[l.id]; if (!was) { st.read[l.id] = true; save(); }
    var as = s.assignment && s.assignment.__anchor === l.id ? s.assignment : null;
    return '<div class="wrap"><div class="crumbs"><a href="#/notes">Notes</a> › <a href="#/notes/s' + s.num + '">§' + s.num + " " + h(s.en) + "</a> › <span>" + l.ref + "</span>" +
      '<span class="right flexrow">' + (l.dom !== "meta" ? pill(l.dom) : "") + '<span class="pill meta">' + l.mm + "</span>" +
      '<button class="btn sm ' + (was ? "on" : "") + '" data-act="unread" data-id="' + l.id + '">' + (was ? "✓ read" : "◦ mark unread") + "</button>" +
      '<button class="btn sm ghost" data-act="print">Print</button></span></div>' +
      '<div class="eyebrow">Lesson ' + l.ref + " of " + LESSON_TOTAL + "</div>" +
      '<h1 class="page">' + h(l.en) + '<span class="tr">' + h(l.tr) + "</span></h1>" +
      (l.objective ? '<p class="lede"><b>Objective.</b> ' + h(l.objective) + "</p>" : "") +
      '<div class="md" style="margin-top:24px">' + rm(l.body) + "</div>" +
      (as ? '<div class="card" style="margin-top:26px"><h3>' + h(as.ref) + " · " + h(as.tr) + "</h3><div class=\"md\">" + rm(as.brief) + "</div>" +
        '<div class="flexrow" style="margin-top:14px"><button class="btn sm ' + (st.done[s.num] ? "on" : "") + '" data-act="done" data-n="' + s.num + '">' + (st.done[s.num] ? "✓ complete" : "mark complete") + "</button></div></div>" : "") +
      '<div class="lessonnav">' +
      (prev ? '<a href="#/lesson/' + prev.l.id + '"><small>← §' + prev.s.num + " · " + prev.l.ref + "</small><b>" + h(prev.l.en) + "</b></a>" : '<a href="#/notes"><small>← back</small><b>All notes</b></a>') +
      (next ? '<a class="nx" href="#/lesson/' + next.l.id + '"><small>§' + next.s.num + " · " + next.l.ref + " →</small><b>" + h(next.l.en) + "</b></a>" : '<a class="nx" href="#/quiz/' + s.quiz + '"><small>section done →</small><b>Take the section test</b></a>') +
      "</div>" + FOOT + "</div>";
  };

  routes.assign = function (a) {
    if (a[0]) {
      var s = sectionByNum(a[0]);
      if (!s || !s.assignment) return '<div class="wrap"><p class="empty">No assignment in that section.</p></div>';
      var as = s.assignment;
      return '<div class="wrap narrow"><div class="crumbs"><a href="#/assign">Assignments</a> › <span>' + h(as.ref) + "</span>" +
        '<span class="right"><button class="btn sm ' + (st.done[s.num] ? "on" : "") + '" data-act="done" data-n="' + s.num + '">' + (st.done[s.num] ? "✓ complete" : "mark complete") + "</button></span></div>" +
        '<div class="eyebrow">' + h(as.ref) + " · Section " + s.num + " · " + h(s.en) + "</div>" +
        '<h1 class="page">' + h(as.en) + '<span class="tr">' + h(as.tr) + "</span></h1>" +
        '<div class="md" style="margin-top:20px">' + rm(as.brief) + "</div>" +
        '<div class="note" style="margin-top:26px"><b>How to use these.</b> Write your answer down before you read the key — the marking lives in the writing, not the reading. Then redo it on a real task at work: a framework you have only read about will not survive a scenario item.</div>' + FOOT + "</div>";
    }
    return '<div class="wrap"><div class="eyebrow">Ödevler · ' + NASSIGN + " assignments</div><h1 class=\"page\">Assignments</h1>" +
      '<p class="lede">One assignment per content section (§2–§8; §1 is orientation and §8 closes with the mock exam itself), each worked inside the Meridian Partners case. Marking keys included — with the reasons wrong answers lose marks, which is the part worth reading twice.</p>' +
      '<div class="grid c2">' + CUR.filter(function (s) { return s.assignment; }).map(function (s) {
        var as = s.assignment;
        return '<div class="card" data-go="assign/' + s.num + '" style="cursor:pointer"><div class="flexrow"><span class="tag">' + h(as.ref) + "</span>" +
          (s.domain !== "meta" ? shortPill(s.domain) + '<span class="tag">' + h(DOM[s.domain].name) + "</span>" : "") +
          (st.done[s.num] ? '<span class="pill ok right">✓</span>' : "") + "</div>" +
          '<h3 style="margin:9px 0 2px">' + h(as.en) + '</h3><p style="margin:0;color:var(--fg3);font-size:12.8px">' + h(as.tr) + "</p></div>";
      }).join("") + "</div>" + FOOT + "</div>";
  };

  /* ------------------------------ quizzes ------------------------------ */
  routes.quiz = function (a) {
    if (a[0]) return runQuiz(a[0]);
    return '<div class="wrap"><div class="eyebrow">8 bölüm testi · 48 items</div><h1 class="page">Section quizzes</h1>' +
      '<p class="lede">One quiz per section, in the exam&rsquo;s item style. Every option carries a rationale — including the wrong ones, because that is where this exam&rsquo;s marks are actually won. Immediate feedback, unlimited attempts, keyboard: <span class="kbd">1–4</span> then <span class="kbd">Enter</span>.</p>' +
      '<div class="stack">' + QUIZ.map(function (q) {
        var r = st.quiz[q.id], sec = q.section.replace("s", "");
        return '<div class="card" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">' +
          '<div style="flex:1;min-width:240px"><h3 style="margin:0 0 3px">' + h(q.title) + "</h3>" +
          '<p style="margin:0;font-size:12.8px;color:var(--fg3)">' + q.questions.length + " items · " + h(q.titleTr) + ' · <a href="#/notes/s' + sec + '">the lessons</a></p></div>' +
          (r ? '<span class="pill ' + (r.score / r.total >= .75 ? "ok" : "bad") + '">' + r.score + "/" + r.total + " · " + Math.round(100 * r.score / r.total) + "%</span>" : '<span class="pill meta">not taken</span>') +
          '<button class="btn ' + (r ? "" : "pri") + '" data-act="goq" data-t="' + q.id + '">' + (r ? "Retake" : "Start") + "</button></div>";
      }).join("") + "</div>" + FOOT + "</div>";
  };

  var qState = null;
  function runQuiz(id) {
    var quiz = QUIZ.filter(function (q) { return q.id === id; })[0];
    if (!quiz) return '<div class="wrap"><p class="empty">No such quiz.</p></div>';
    if (!qState || qState.id !== id) qState = { id: id, quiz: quiz, i: 0, picks: {}, answers: {} };
    var qs = qState.quiz;
    if (qState.i >= qs.questions.length) return quizResults(qState);
    var qi = qState.i, item = qs.questions[qi], sel = qState.picks[qi] || [], shown = qState.answers[qi] != null;
    return '<div class="wrap narrow"><div class="crumbs"><a href="#/quiz">Quizzes</a> › <span>' + h(qs.title) + "</span>" +
      '<span class="right qmeta">item ' + (qi + 1) + " / " + qs.questions.length + "</span></div>" +
      '<div class="qhdr">' + pill(item.dom) + (item.need ? '<span class="pill warn">select exactly ' + item.need + "</span>" : "") +
      '<span class="right">' + (shown ? verdictHTML(item, sel) : '<button class="btn sm ghost" data-act="qskip">Skip →</button>') + "</span></div>" +
      '<div class="stem">' + h(item.stem) + "</div>" +
      '<div class="opts">' + item.opts.map(function (o, i) {
        var cls = "opt"; if (sel.indexOf(i) > -1) cls += " sel";
        if (shown) { if (item.ans.indexOf(i) > -1) cls += " right"; else if (sel.indexOf(i) > -1) cls += " wrong"; }
        return '<button class="' + cls + '" ' + (shown ? "disabled" : "") + ' data-act="qpick" data-i="' + i + '">' +
          '<span class="mk">' + "ABCD"[i] + '</span><span><b>' + h(o.t) + "</b>" +
          (shown ? '<span style="display:block;margin-top:8px;font-size:13.2px;color:' + (item.ans.indexOf(i) > -1 ? "#9fe6bd" : "var(--fg2)") + '">' + h(o.w) + "</span>" : "") +
          "</span></button>";
      }).join("") + "</div>" +
      (shown
        ? '<div class="qfoot"><button class="btn pri" data-act="qnext">' + (qi + 1 === qs.questions.length ? "See results →" : "Next item →") + "</button>" +
          '<span class="qmeta">answered ' + Object.keys(qState.answers).length + "/" + qs.questions.length + "</span></div>"
        : '<div class="qfoot"><button class="btn pri" data-act="qcheck" ' + (sel.length === (item.need || 1) ? "" : "disabled") + ">" + (item.need ? "Check selection" : "Check answer") + "</button>" +
          '<span class="qmeta">' + (item.need ? sel.length + " of " + item.need + " selected — the count must be exact, and a partial selection scores zero." : "Pick the single most appropriate option.") + "</span></div>") + FOOT + "</div>";
  }
  function isHit(it, sel) { return it.ans.length === sel.length && it.ans.every(function (x) { return sel.indexOf(x) > -1; }); }
  function verdictHTML(item, sel) {
    var hit = isHit(item, sel), part = !hit && sel.some(function (x) { return item.ans.indexOf(x) > -1; });
    return '<span class="verdict ' + (hit ? "ok" : part ? "part" : "bad") + '">' + (hit ? "✓ correct" : part ? "◐ partially there" : "✗ not this one") + "</span>";
  }
  function quizResults(q) {
    var items = q.quiz.questions, score = 0, per = [];
    items.forEach(function (it, i) { var hit = isHit(it, q.picks[i] || []); if (hit) score++; per.push({ dom: it.dom, hit: hit }); });
    var stats = domainStats(per), tot = items.length, pct = Math.round(100 * score / tot);
    if (!st.quiz[q.id] || st.quiz[q.id].score < score) { st.quiz[q.id] = { score: score, total: tot, pct: pct, ts: Date.now() }; save(); }
    return '<div class="wrap"><div class="crumbs"><a href="#/quiz">Quizzes</a> › <span>' + h(q.quiz.title) + "</span></div>" +
      '<h1 class="page">' + score + " / " + tot + '<span class="tr">' + pct + "% — the working bar for a section quiz is 75%</span></h1>" +
      '<div class="results" style="margin-top:22px"><div class="card"><h3>By domain, in this quiz</h3>' +
      (function () {
        var rows = ALLDOM.filter(function (d) { return stats[d].t; });
        if (!rows.length) return '<p style="font-size:13.2px;color:var(--fg2);margin:.4em 0 0">This section sits outside the seven scored domains — it covers orientation and the case, so there is nothing to break down here.</p>';
        return rows.map(function (d) {
          var s = stats[d]; return '<div class="dombar"><span class="tag">' + d + '</span><div class="bar"><i style="width:' + Math.round(100 * s.c / s.t) + '%"></i></div><b>' + s.c + "/" + s.t + "</b></div>";
        }).join("");
      })() +
      '<p style="font-size:13px;color:var(--fg2);margin:14px 0 0">' + (pct >= 75
        ? "Solid. Move on — but read the rationales on anything you missed, since the reasoning is what repeats in the mock."
        : "Below the bar. Re-read the lessons named on your missed items below, then retake: the same frameworks return, reworded.") + "</p>" +
      '<div class="flexrow" style="margin-top:16px"><button class="btn pri" data-act="qretake">Retake</button>' +
      '<a class="btn" href="#/notes/s' + q.quiz.section.replace("s", "") + '">Back to the lessons</a><a class="btn ghost" href="#/quiz">Next quiz</a></div></div>' +
      '<div class="card"><h3>Every item, with its reasoning</h3>' +
      items.map(function (it, i) {
        var sel = q.picks[i] || [], hit = isHit(it, sel);
        return '<div class="review-item ' + (hit ? "hit" : "miss") + '" style="margin-bottom:10px;padding:12px 14px">' +
          '<div class="flexrow" style="font-size:11px"><span class="tag">' + (i + 1) + "</span>" + pill(it.dom) + '<span class="right verdict ' + (hit ? "ok" : "bad") + '">' + (hit ? "✓" : "✗") + "</span></div>" +
          '<div class="stem" style="font-size:14.4px;margin:.4em 0 .5em">' + h(it.stem) + "</div>" +
          '<div style="font-size:13px;color:var(--fg2);line-height:1.6">' + it.ans.map(function (k) {
            return '<b style="color:#9fe6bd">' + "ABCD"[k] + ".</b> " + h(it.opts[k].t) + ' <span style="color:var(--fg3)">— ' + h(it.opts[k].w) + "</span>";
          }).join("<br>") + "</div>" +
          (hit ? "" : '<div style="font-size:12.6px;color:var(--fg3);margin-top:8px">You chose ' + (sel.length ? sel.map(function (k) { return "ABCD"[k]; }).join(", ") : "nothing") + ". Read the other options&rsquo; rationales before continuing.</div>") +
          "</div>";
      }).join("") + "</div></div>" + FOOT + "</div>";
  }

  /* ------------------------------ mock ------------------------------ */
  var running = false, tick = null, remain = 0, mState = null;
  routes.mock = function (a) {
    if (a[0] === "run") return running ? mockRun() : (location.replace("#/mock"), "");
    if (a[0] === "done") return mockDone();
    var prev = st.mock[st.mock.length - 1];
    return '<div class="wrap"><div class="eyebrow">CCAO-F Deneme Sınavı · 60 items · 120 minutes</div><h1 class="page">The mock exam</h1>' +
      '<p class="lede">' + h(MOCK.meta.blurb) + "</p>" +
      '<div class="grid c2" style="margin-top:22px"><div class="card"><h3>Rules of the sitting</h3><ul class="md-ul" style="margin:.4em 0 0;font-size:13.6px;color:var(--fg2)">' +
      "<li>Run the clock at <b>120 minutes</b> without pausing. ~2 minutes an item is deliberately generous: the constraint is deliberation, not speed.</li>" +
      "<li>No notes, no re-reading a lesson mid-exam. Simulate the room.</li><li>Flag anything doubtful and keep moving; return with the minutes you saved.</li>" +
      "<li>Multi-select items state a required count. Match it — an unfilled selection scores zero.</li>" +
      "<li>Treat <b>75%</b> as the rehearsal bar for the 720 cut. The real scale is criterion-referenced and equated, so this is a proxy, not a promise.</li></ul></div>" +
      '<div class="card"><h3>Item budget you will see</h3>' +
      MET.domains.slice().sort(function (x, y) { return y.items - x.items; }).map(function (d) {
        return '<div class="dombar"><span class="tag">' + d.code + " " + d.weight + '%</span><div class="bar"><i style="width:' + (100 * d.items / 13) + '%"></i></div><b>' + d.items + "</b></div>";
      }).join("") +
      (prev ? '<p style="font-size:13px;color:var(--fg2);margin:14px 0 0">Last sitting: <b>' + prev.correct + "/" + prev.total + " (" + prev.pct + '%)</b> · ' + new Date(prev.ts).toLocaleString() + "</p>" : "") +
      (st.mock.length ? '<div style="margin-top:12px"><button class="btn ghost sm" data-act="clearmock">Clear attempt history</button></div>' : "") + "</div></div>" +
      '<div class="flexrow" style="margin-top:24px"><button class="btn pri" data-act="startmock">Start 120-minute sitting</button><button class="btn" data-act="mockopen">Open untimed (review mode)</button></div>' +
      '<div class="note" style="margin-top:20px"><b>On submission</b> you get a total, a percent-correct report by domain in the same shape as the real score report, and a full review of all 60 items with the reasoning for every option — right and wrong. Your two weakest <i>weighted</i> domains become your next two study hours.</div>' + FOOT + "</div>";
  };
  function startMock(timed) {
    var byD = {}; ALLDOM.forEach(function (d) { byD[d] = []; });
    MOCK.questions.forEach(function (it, i) { (byD[it.dom] || (byD[it.dom] = [])).push(i); });
    var order = [];
    ALLDOM.forEach(function (d) { order = order.concat(shuffle(byD[d] || [])); });
    order = shuffle(order);
    mState = { i: 0, picks: {}, flags: {}, order: order, timed: timed, per: null, finished: false };
    running = true; remain = 120 * 60;
    if (tick) clearInterval(tick);
    if (timed) tick = setInterval(function () {
      remain--;
      var c = document.getElementById("clk");
      if (!c) { if (remain <= 0) { clearInterval(tick); tick = null; finishMock(); } return; }
      c.textContent = fmt(remain); c.className = "clock" + (remain < 300 ? " bad" : remain < 900 ? " warn" : "");
      if (remain <= 0) { clearInterval(tick); tick = null; finishMock(); }
    }, 1000);
    if (location.hash === "#/mock/run") render(); else location.hash = "#/mock/run";
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmt(s) { s = Math.max(0, s | 0); var m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); }

  function mockRun() {
    var it = MOCK.questions[mState.order[mState.i]], i = mState.i, sel = mState.picks[i] || [];
    var done = Object.keys(mState.picks).filter(function (k) { return mState.picks[k].length; }).length;
    return '<div class="exambar"><b style="font-size:13px">Mock exam · "Deneme Sınavı"</b>' +
      '<span class="exammid">' + (mState.timed ? '<span id="clk" class="clock">' + fmt(remain) + "</span>" : '<span class="clock">untimed</span>') +
      "<span>item " + (i + 1) + "/" + mState.order.length + "</span><span>answered " + done + "</span><span>flagged " +
      Object.keys(mState.flags).filter(function (k) { return mState.flags[k]; }).length + "</span></span>" +
      '<span class="right flexrow"><button class="btn sm ' + (mState.flags[i] ? "on" : "") + '" data-act="mflag">⚑ flag</button>' +
      '<button class="btn sm pri" data-act="msubmit">Submit &amp; score</button></span></div>' +
      '<div class="exammain"><div class="qhdr">' + pill(it.dom) + (it.need ? '<span class="pill warn">select exactly ' + it.need + "</span>" : "") +
      '<span class="right qmeta">' + (i + 1) + " / " + mState.order.length + "</span></div>" +
      '<div class="stem">' + h(it.stem) + "</div>" +
      '<div class="opts">' + it.opts.map(function (o, k) {
        return '<button class="opt ' + (sel.indexOf(k) > -1 ? "sel" : "") + '" data-act="mpick" data-i="' + k + '"><span class="mk">' + "ABCD"[k] + "</span><span>" + h(o.t) + "</span></button>";
      }).join("") + "</div>" +
      '<div class="qfoot"><button class="btn" data-act="mprev" ' + (i ? "" : "disabled") + ">← Back</button>" +
      '<button class="btn pri" data-act="mnext">' + (i + 1 === mState.order.length ? "Finish →" : "Next →") + "</button>" +
      '<span class="sp"></span><span class="qmeta">keys <span class="kbd">1–4</span> <span class="kbd">←</span> <span class="kbd">→</span> <span class="kbd">f</span></span></div>' +
      '<div style="margin-top:30px"><div class="tag" style="margin-bottom:8px">Palette · orange = flagged, green = answered</div><div class="palette">' +
      mState.order.map(function (qi, k) {
        var c = k === i ? " cur" : "";
        if (mState.picks[qi] && mState.picks[qi].length) c += " ans";
        if (mState.flags[qi]) c += " flag";
        return '<button data-act="mjump" data-i="' + k + '"' + c + ">" + (k + 1) + "</button>";
      }).join("") + "</div></div></div>";
  }
  function finishMock() {
    if (mState.finished) return; mState.finished = true;
    running = false; if (tick) { clearInterval(tick); tick = null; }
    var per = [], score = 0;
    mState.order.forEach(function (qi, k) {
      var it = MOCK.questions[qi], sel = mState.picks[k] || [], hit = isHit(it, sel);
      if (hit) score++;
      per.push({ dom: it.dom, hit: hit, k: k, qi: qi, sel: sel });
    });
    var tot = mState.order.length, pct = Math.round(100 * score / tot);
    var agg = {}; ALLDOM.forEach(function (d) { agg[d] = { c: 0, t: 0 }; });
    per.forEach(function (p) { agg[p.dom].t++; if (p.hit) agg[p.dom].c++; });
    mState.per = per; mState.score = score; mState.pct = pct; mState.agg = agg;
    st.mock.push({ ts: Date.now(), correct: score, total: tot, pct: pct, per: ALLDOM.map(function (d) { return { dom: d, c: agg[d].c, t: agg[d].t }; }) });
    save();
    if (location.hash === "#/mock/done") render(); else location.hash = "#/mock/done";
  }
  function mockDone() {
    if (!mState || !mState.per) { location.replace("#/mock"); return ""; }
    var sc = mState.pct, scaled = Math.round(100 + (sc / 100) * 900);
    var weak = ALLDOM.map(function (d) {
      var o = mState.agg[d]; return { d: d, pct: o.t ? Math.round(100 * o.c / o.t) : 100, c: o.c, t: o.t, w: DOM[d].weight, items: DOM[d].items };
    }).sort(function (a, b) { return (a.pct - b.pct) || (b.w - a.w); });
    var misses = mState.per.filter(function (p) { return !p.hit; }).length;
    return '<div class="wrap"><div class="eyebrow">Skor raporu · score report</div>' +
      '<h1 class="page">' + mState.score + " / " + mState.order.length + " · " + sc + '%<span class="tr">' +
      (sc >= 75 ? "Above the rehearsal bar. Treat it as ready-with-caveats: work the two domains below, then re-sit cold." : "Below the 75% rehearsal bar — but the per-domain picture is the useful part, not the total.") + "</span></h1>" +
      '<div class="grid c2" style="margin-top:22px;align-items:start">' +
      '<div class="card"><h3>Scaled equivalent</h3><div class="score">' + scaled + "<small> / 1,000</small></div>" +
      '<p style="font-size:12.8px;color:var(--fg3);margin:.7em 0 0">The real exam is scaled and equated; this is a linear illustration only. Cut score: <b>720</b>. ' + misses + " of " + mState.order.length + " items missed.</p>" +
      '<div class="bar" style="margin-top:14px;height:7px"><i style="width:' + sc + '%"></i></div>' +
      "<h3 style=\"margin-top:20px\">Percent correct by domain</h3>" +
      weak.map(function (x) {
        return '<div class="dombar"><span class="tag">' + x.d + " " + x.w + '%</span><div class="bar"><i style="width:' + x.pct + "%;background:" + (x.pct < 60 ? "var(--bad)" : x.pct < 75 ? "var(--warn)" : "var(--ok)") + '"></i></div><b>' + x.c + "/" + x.t + "</b></div>";
      }).join("") + "</div>" +
      '<div class="card"><h3>Your study order, from this report</h3>' +
      (function () {
        var list = weak.filter(function (x) { return x.pct < 100; }).slice(0, 3);
        if (!list.length) return '<p style="color:var(--ok);font-size:13.5px">Everything at 100%. Sit again after 24 hours — a repeatable score is a learned one.</p>';
        return list.map(function (x) {
          var d = DOM[x.d], sec = d.lessons[0] | 0;
          return '<div style="border:1px solid var(--line);border-radius:9px;padding:13px 15px;margin-bottom:11px;background:var(--bg2)">' +
            '<div class="flexrow"><b style="font-size:14.5px">' + d.code + " · " + h(d.name) + '</b><span class="right tag">' + d.weight + '% · ' + x.pct + "% correct</span></div>" +
            '<p style="margin:7px 0 9px;font-size:13.2px;color:var(--fg2)">You missed ' + (x.t - x.c) + " of " + x.t + " here. In the real exam this domain carries about " + x.items + " items — every one recoverable.</p>" +
            '<div class="flexrow"><a class="btn sm" href="#/notes/s' + sec + '">Re-read §' + sec + '</a><a class="btn sm ghost" href="#/cards">Cards for ' + d.code + "</a></div></div>";
        }).join("");
      })() +
      '<div class="note" style="margin-top:2px"><b>Then re-sit cold.</b> A second sitting that improves is evidence of learning; one that scores the same says the gap is habit rather than knowledge — and habits are fixed by doing the <a href="#/assign">assignments</a> on real work, not by reading again.</div>' +
      '<div class="flexrow" style="margin-top:15px"><button class="btn pri" data-act="startmock">Sit again</button><a class="btn" href="#/progress">Progress</a></div></div></div>' +
      '<h2 class="sec">Full review · all ' + mState.order.length + " items</h2>" +
      '<div class="toolbar"><span class="qmeta">Every option, right and wrong. Read the ones you did not pick — that is the point of this page.</span>' +
      (misses ? '<span class="right flexrow"><button class="btn sm" data-act="rfilter" data-f="all">All</button><button class="btn sm ghost" data-act="rfilter" data-f="miss">Missed only (' + misses + ")</button></span>" : "") + "</div>" +
      '<div id="review">' + mState.per.map(function (p, k) {
        var it = MOCK.questions[p.qi];
        return '<div class="review-item ' + (p.hit ? "hit" : "miss") + '" data-miss="' + (p.hit ? "0" : "1") + '">' +
          '<div class="flexrow" style="font-size:11px"><span class="tag">item ' + (k + 1) + "</span>" + pill(p.dom) +
          '<span class="right verdict ' + (p.hit ? "ok" : "bad") + '">' + (p.hit ? "✓ correct" : "✗ missed") + "</span></div>" +
          '<div class="stem">' + h(it.stem) + "</div>" +
          '<div class="opts">' + it.opts.map(function (o, j) {
            var good = it.ans.indexOf(j) > -1, chose = p.sel.indexOf(j) > -1;
            return '<div class="opt ' + (good ? "right" : chose ? "wrong" : "") + '" style="cursor:default"><span class="mk">' + "ABCD"[j] + (chose ? "◂" : "") + "</span>" +
              '<span><b>' + h(o.t) + '</b><span style="display:block;margin-top:6px;font-size:13.2px;font-weight:400;color:' + (good ? "#9fe6bd" : "var(--fg2)") + '">' + h(o.w) + "</span></span></div>";
          }).join("") + "</div></div>";
      }).join("") + "</div>" + FOOT + "</div>";
  }

  /* ------------------------------ cheats ------------------------------ */
  routes.cheats = function (a) {
    if (a[0]) {
      var c = CHEAT.filter(function (x) { return x.id === a[0]; })[0];
      if (!c) return '<div class="wrap"><p class="empty">No such sheet.</p></div>';
      var i = CHEAT.indexOf(c);
      return '<div class="wrap"><div class="crumbs"><a href="#/cheats">Cheat sheets</a> › <span>' + h(c.title) + "</span>" +
        '<span class="right flexrow"><button class="btn sm ghost" data-act="print">Print / PDF</button>' +
        (i > 0 ? '<a class="btn sm ghost" href="#/cheats/' + CHEAT[i - 1].id + '">← prev</a>' : "") +
        (CHEAT[i + 1] ? '<a class="btn sm" href="#/cheats/' + CHEAT[i + 1].id + '">next →</a>' : "") + "</span></div>" +
        '<div class="eyebrow">Quick reference · ' + h(c.tag) + "</div><h1 class=\"page\">" + h(c.title) + "</h1>" +
        '<div class="md" style="max-width:96ch;margin-top:20px">' + rm(c.md) + "</div>" + FOOT + "</div>";
    }
    return '<div class="wrap"><div class="eyebrow">' + CHEAT.length + ' one-pagers · printable</div><h1 class="page">Cheat sheets<span class="tr">Hızlı başvuru — yazdırmaya uygun tek sayfalar</span></h1>' +
      '<p class="lede">Condensed for recall, not for learning. Pin them, print them, or read them the morning of. Go to the notes for the reasoning.</p>' +
      '<div class="grid c2">' + CHEAT.map(function (x) {
        return '<div class="card" data-go="cheats/' + x.id + '" style="cursor:pointer"><span class="tag">' + h(x.tag) + '</span><h3 style="margin:8px 0 5px">' + h(x.title) + "</h3>" +
          '<p style="margin:0;font-size:13.2px;color:var(--fg2)">' + firstLine(x.md) + "</p></div>";
      }).join("") + "</div>" + FOOT + "</div>";
  };

  /* ------------------------------ cards ------------------------------ */
  var deck = { i: 0, filter: "all", on: false, order: null };
  function deckList() {
    var base = deck.filter === "all" ? CARDS : CARDS.filter(function (c) { return c.dom === deck.filter; });
    return deck.order ? deck.order.map(function (i) { return base[i]; }) : base;
  }
  routes.cards = function () {
    var list = deckList();
    if (!list.length) list = CARDS;
    if (deck.i >= list.length) deck.i = 0;
    var c = list[deck.i], rated = st.cards[c.f];
    return '<div class="wrap"><div class="eyebrow">' + CARDS.length + " cards · " + (rated ? "rated “" + rated + "”" : "unrated") + "</div>" +
      '<h1 class="page">Flashcards<span class="tr">Kartlar — terim EN · TR, cevap sınavda vereceğin cümleyle</span></h1>' +
      '<p class="lede">Term on the front, the answer you would actually give on the back. Rate yourself honestly: &ldquo;I knew it&rdquo; is worth nothing if you cannot also say why the distractor fails. Keys: <span class="kbd">space</span> flip · <span class="kbd">←</span> <span class="kbd">→</span> move.</p>' +
      '<div class="toolbar">' + ["all"].concat(ALLDOM).map(function (d) {
        var n = d === "all" ? CARDS.length : CARDS.filter(function (x) { return x.dom === d; }).length;
        return '<button class="btn sm ' + (deck.filter === d ? "" : "ghost") + '" data-act="deckfilter" data-f="' + d + '">' + (d === "all" ? "All" : d) + " · " + n + "</button>";
      }).join("") + '<button class="btn sm ghost" data-act="deckshuffle">' + (deck.order ? "Unshuffle" : "Shuffle") + "</button></div>" +
      '<div class="flip' + (deck.on ? " on" : "") + '" data-act="flip"><div class="flip-in">' +
      '<div class="flip-f"><div class="t">' + h(c.f) + '</div><div class="h">click · or press space</div></div>' +
      '<div class="flip-b"><div class="flexrow" style="margin-bottom:12px">' + pill(c.dom) + '<span class="tag">covered in ' + h(c.w) + "</span></div>" +
      '<div class="b">' + rm(c.b) + "</div></div></div></div>" +
      '<div class="decknav"><button class="btn" data-act="deckprev">←</button>' +
      '<button class="btn ' + (rated === "again" ? "on" : "") + '" data-act="rate" data-v="again">✗ not yet</button>' +
      '<button class="btn ' + (rated === "known" ? "on" : "") + '" data-act="rate" data-v="known">✓ known</button>' +
      '<button class="btn" data-act="decknext">→</button></div>' +
      '<div class="deckcount">card ' + (deck.i + 1) + " of " + list.length + " · " +
      Object.keys(st.cards).filter(function (k) { return st.cards[k] === "known"; }).length + "/" + CARDS.length + " marked known · saved in this browser</div>" + FOOT + "</div>";
  };

  /* ------------------------------ blueprint ------------------------------ */
  routes.blueprint = function () {
    var rated = Object.keys(st.obj).length;
    var rows = MET.domains.map(function (d) {
      return { d: d, objs: d.objs.map(function (o, i) { return { k: d.code + "_" + i, t: o }; }) };
    });
    return '<div class="wrap"><div class="eyebrow">Exam guide v1.0 · section 6 objectives</div><h1 class="page">Blueprint checklist</h1>' +
      '<p class="lede">The guide lists these objectives and gives them no separate weights — so the honest study unit is the objective, not the domain. Rate each: <b>0</b> never done it · <b>1</b> do it inconsistently · <b>2</b> do it and can explain why. Anything below 2 on a heavy domain is where your hours go. That is the course&rsquo;s tenth outcome: entering the exam knowing which domain is your weak one <i>and how heavily it counts</i>.</p>' +
      '<div class="toolbar"><span class="qmeta">' + rated + " / " + NOBJ + " objectives rated</span><span class=\"right\"><button class=\"btn sm ghost\" data-act=\"clearobj\">Reset ratings</button></span></div>" +
      '<div class="grid c2">' + rows.map(function (r) {
        var vals = r.objs.map(function (o) { return st.obj[o.k]; }).filter(function (v) { return v != null; });
        var zeros = vals.filter(function (v) { return v === 0; }).length;
        return '<div class="card"><div class="flexrow"><b style="font-size:15px">' + r.d.code + " · " + h(r.d.name) + '</b><span class="right tag">' + r.d.weight + '% · ' + r.d.items + " items</span></div>" +
          '<p style="margin:3px 0 12px;font-size:12.6px;color:var(--fg3)">' + h(r.d.tr) + ' · <a href="#/notes/s' + (r.d.lessons[0] | 0) + '">§' + (r.d.lessons[0] | 0) + "</a></p>" +
          r.objs.map(function (o) {
            var v = st.obj[o.k];
            return '<div class="objrow"><span>' + h(o.t) + '</span><span class="rate">' + [0, 1, 2].map(function (k) {
              return '<button class="' + (v === k ? "on" + k : "") + '" data-act="rateobj" data-k="' + o.k + '" data-v="' + k + '" title="' + ["never done it", "inconsistent", "do it, can explain why"][k] + '">' + k + "</button>";
            }).join("") + "</span></div>";
          }).join("") +
          '<p style="margin:11px 0 0;font-size:12.6px;color:' + (zeros ? "var(--bad)" : vals.length === r.objs.length ? "var(--ok)" : "var(--fg3)") + '">' +
          (vals.length < r.objs.length ? (r.objs.length - vals.length) + " still unrated" + (zeros ? " · " + zeros + " rated 0" : "")
            : zeros ? zeros + " rated 0 — start here, this domain is " + r.d.weight + "% of the exam" : "all rated; every one at 2? then go defend them under exam conditions") + "</p></div>";
      }).join("") + "</div>" + FOOT + "</div>";
  };

  /* ------------------------------ progress ------------------------------ */
  routes.progress = function () {
    var knownN = Object.keys(st.cards).filter(function (k) { return st.cards[k] === "known"; }).length;
    var rows = ALLDOM.map(function (d) {
      var dd = DOM[d];
      var vals = dd.objs.map(function (o, i) { return st.obj[d + "_" + i]; }).filter(function (v) { return v != null; });
      var per = 0, pert = 0;
      if (st.mock.length) { var m = st.mock[st.mock.length - 1]; m.per.forEach(function (p) { if (p.dom === d) { per = p.c; pert = p.t; } }); }
      return { d: d, w: dd.weight, items: dd.items, avg: vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : null,
        rated: vals.length, objs: dd.objs.length, mockPct: pert ? Math.round(100 * per / pert) : null, mockStr: pert ? per + "/" + pert : null,
        pri: vals.length ? (3 - (vals.reduce(function (a, b) { return a + b; }, 0) / vals.length)) * dd.weight : null };
    });
    var scored = rows.filter(function (x) { return x.pri != null; }).sort(function (a, b) { return b.pri - a.pri; });
    return '<div class="wrap"><div class="eyebrow">stored locally · this browser only</div><h1 class="page">Progress</h1>' +
      '<p class="lede">Nothing here is uploaded or tracked anywhere. It is a mirror of one thing: which frameworks you can still defend.</p>' +
      '<div class="grid c3" style="margin:22px 0 8px">' +
      stat(totalRead() + "/" + LESSON_TOTAL, "lessons read", Math.round(100 * totalRead() / LESSON_TOTAL)) +
      stat(Object.keys(st.done).length + "/" + NASSIGN, "assignments done", Math.round(100 * Object.keys(st.done).length / NASSIGN)) +
      stat(Object.keys(st.quiz).length + "/8", "quizzes taken", Math.round(100 * Object.keys(st.quiz).length / 8)) +
      stat(knownN + "/" + CARDS.length, "cards marked known", Math.round(100 * knownN / CARDS.length)) +
      stat(Object.keys(st.obj).length + "/" + NOBJ, "objectives rated", Math.round(100 * Object.keys(st.obj).length / NOBJ)) +
      stat(st.mock.length ? st.mock[st.mock.length - 1].pct + "%" : "—", "latest mock", st.mock.length ? st.mock[st.mock.length - 1].pct : 0) +
      "</div>" +
      "<h2 class=\"sec\">Read status, by section</h2>" +
      CUR.map(function (s) {
        var r = s.lessons.filter(function (l) { return st.read[l.id]; }).length;
        return '<div class="dombar" style="grid-template-columns:230px 1fr 56px"><span style="font-size:12.6px">' + s.num + " · " + h(s.en) + "</span>" +
          '<div class="bar"><i style="width:' + Math.round(100 * r / s.lessons.length) + '%"></i></div><b>' + r + "/" + s.lessons.length + "</b></div>";
      }).join("") +
      "<h2 class=\"sec\">Priority: your weakness × the marks attached to it</h2>" +
      (scored.length ? '<div class="tablewrap"><table class="mdt"><thead><tr><th>Domain</th><th>Weight</th><th>Items</th><th>Your average</th><th>Latest mock</th><th>Priority</th><th></th></tr></thead><tbody>' +
        scored.map(function (x) {
          return "<tr><td><b>" + x.d + "</b> " + h(DOM[x.d].name) + "</td><td>" + x.w + "%</td><td>" + x.items + "</td><td>" + x.avg.toFixed(2) + " / 2 <span style=\"color:var(--fg3)\">(" + x.rated + "/" + x.objs + ")</span></td><td>" +
            (x.mockStr ? x.mockPct + "% <span style=\"color:var(--fg3)\">" + x.mockStr + "</span>" : '<span style="color:var(--fg3)">no sitting yet</span>') +
            '</td><td><b style="color:' + (x.pri > 1.4 ? "var(--bad)" : x.pri > .8 ? "var(--warn)" : "var(--ok)") + '">' + (x.pri > 1.4 ? "HIGH" : x.pri > .8 ? "medium" : "hold") + "</b></td>" +
            '<td><a href="#/notes/s' + (DOM[x.d].lessons[0] | 0) + '">§' + (DOM[x.d].lessons[0] | 0) + "</a></td></tr>";
        }).join("") + "</tbody></table></div>" +
        '<p class="lede" style="font-size:13.4px">Priority = (3 − your average rating) × domain weight ÷ 100. Rate the <a href="#/blueprint">blueprint objectives</a> to fill it in. A domain you rated 0 on at 21% outranks a domain you rated 2 on at 10%, and that is the entire argument of this page.</p>'
        : '<div class="note">Nothing rated yet — <a href="#/blueprint">rate the blueprint objectives</a> and this table fills in.</div>') +
      "<h2 class=\"sec\">Mock attempts</h2>" +
      (st.mock.length ? '<div class="tablewrap"><table class="mdt"><thead><tr><th>When</th><th>Score</th><th>%</th>' +
        ALLDOM.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr></thead><tbody>" +
        st.mock.slice().reverse().map(function (m) {
          return "<tr><td>" + new Date(m.ts).toLocaleString() + "</td><td><b>" + m.correct + "/" + m.total + "</b></td><td>" + m.pct + "%</td>" +
            m.per.map(function (p) { return '<td style="color:' + (p.t && p.c / p.t < .6 ? "var(--bad)" : "var(--fg2)") + '">' + p.c + "/" + p.t + "</td>"; }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>"
        : '<div class="note">No sitting recorded yet. <a href="#/mock">Take the mock</a> under full timing before you trust any number above.</div>') +
      '<div class="flexrow" style="margin-top:26px"><button class="btn ghost" data-act="resetall">Reset all progress</button></div>' + FOOT + "</div>";
  };
  function stat(v, l, p) {
    return '<div class="card"><div class="score" style="font-size:26px">' + h(v) + '</div><div class="tag" style="margin-top:5px">' + h(l) + "</div>" +
      '<div class="bar" style="margin-top:9px"><i style="width:' + (p || 0) + '%"></i></div></div>';
  }

  /* ------------------------------ events ------------------------------ */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-act]") : null;
    if (b) {
      var act = b.dataset.act;
      if (act === "go") { location.hash = "#/" + b.dataset.t; return; }
      if (act === "goq") { qState = null; location.hash = "#/quiz/" + b.dataset.t; return; }
      if (act === "print") { window.print(); return; }
      if (act === "unread") { st.read[b.dataset.id] = !st.read[b.dataset.id]; save(); render(); return; }
      if (act === "done") { var n = b.dataset.n; st.done[n] = !st.done[n]; save(); render(); return; }
      if (act === "qpick") {
        var i = +b.dataset.i, item = qState.quiz.questions[qState.i], sel = qState.picks[qState.i] || [];
        if (item.need) { var k = sel.indexOf(i); if (k > -1) sel.splice(k, 1); else { if (sel.length >= item.need) sel.shift(); sel.push(i); } }
        else sel = [i];
        qState.picks[qState.i] = sel; render(); return;
      }
      if (act === "qcheck") { qState.answers[qState.i] = qState.picks[qState.i] || []; render(); return; }
      if (act === "qskip") { qState.answers[qState.i] = []; qState.i++; render(); return; }
      if (act === "qnext") { qState.i++; render(); return; }
      if (act === "qretake") { qState = null; render(); return; }
      if (act === "startmock") { startMock(true); return; }
      if (act === "mockopen") { startMock(false); return; }
      if (act === "mpick") {
        var ki = +b.dataset.i, it2 = MOCK.questions[mState.order[mState.i]], s2 = mState.picks[mState.i] || [];
        if (it2.need) { var kk = s2.indexOf(ki); if (kk > -1) s2.splice(kk, 1); else { if (s2.length >= it2.need) s2.shift(); s2.push(ki); } }
        else s2 = [ki];
        mState.picks[mState.i] = s2; render(); return;
      }
      if (act === "mnext") { if (mState.i + 1 < mState.order.length) { mState.i++; render(); } else finishMock(); return; }
      if (act === "mprev") { if (mState.i) { mState.i--; render(); } return; }
      if (act === "mjump") { mState.i = +b.dataset.i; render(); return; }
      if (act === "mflag") { mState.flags[mState.i] = !mState.flags[mState.i]; render(); return; }
      if (act === "msubmit") {
        var un = mState.order.filter(function (qi, k) { return !(mState.picks[k] && mState.picks[k].length); }).length;
        if (un && !confirm(un + " item" + (un > 1 ? "s have" : " has") + " no answer. Submit anyway?")) return;
        finishMock(); return;
      }
      if (act === "clearmock") { if (confirm("Clear all recorded mock attempts?")) { st.mock = []; save(); render(); } return; }
      if (act === "rfilter") {
        var f = b.dataset.f;
        Array.prototype.forEach.call(document.querySelectorAll("#review .review-item"), function (el) {
          el.style.display = (f === "all" || el.dataset.miss === "1") ? "" : "none";
        });
        Array.prototype.forEach.call(document.querySelectorAll("[data-act=rfilter]"), function (x) { x.className = "btn sm" + (x.dataset.f === f ? "" : " ghost"); });
        return;
      }
      if (act === "flip") { deck.on = !deck.on; var fl = document.querySelector(".flip"); if (fl) fl.classList.toggle("on", deck.on); return; }
      if (act === "decknext" || act === "deckprev") {
        var L = deckList(); deck.i += act === "decknext" ? 1 : -1; deck.on = false;
        if (deck.i >= L.length) deck.i = 0; if (deck.i < 0) deck.i = L.length - 1;
        render(); return;
      }
      if (act === "rate") {
        var cc = deckList()[deck.i]; st.cards[cc.f] = b.dataset.v; save();
        deck.i++; deck.on = false; var LL = deckList(); if (deck.i >= LL.length) deck.i = 0;
        render(); return;
      }
      if (act === "deckfilter") { deck = { i: 0, filter: b.dataset.f, on: false, order: null }; render(); return; }
      if (act === "deckshuffle") {
        if (deck.order) { deck.order = null; }
        else {
          var base = deck.filter === "all" ? CARDS : CARDS.filter(function (x) { return x.dom === deck.filter; });
          var idxs = base.map(function (x, z) { return z; }); idxs = shuffle(idxs); deck.order = idxs;
        }
        deck.i = 0; render(); return;
      }
      if (act === "rateobj") { st.obj[b.dataset.k] = +b.dataset.v; save(); render(); return; }
      if (act === "clearobj") { st.obj = {}; save(); render(); return; }
      if (act === "resetall") { if (confirm("Reset all saved progress in this browser? This cannot be undone.")) { st = JSON.parse(JSON.stringify(def)); save(); render(); } return; }
    }
    var g = e.target.closest ? e.target.closest("[data-go]") : null;
    if (g) { location.hash = "#/" + g.dataset.go; return; }
    if (e.target.closest && e.target.closest("#burger")) document.body.classList.toggle("mopen");
  });

  document.addEventListener("keydown", function (e) {
    if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
    var seg = (location.hash || "").replace(/^#\/?/, "").split("/");
    if (seg[0] === "cards") {
      if (e.code === "Space") { e.preventDefault(); deck.on = !deck.on; var f = document.querySelector(".flip"); if (f) f.classList.toggle("on", deck.on); }
      if (e.key === "ArrowRight") { var L = deckList(); deck.i = deck.i + 1 >= L.length ? 0 : deck.i + 1; deck.on = false; render(); }
      if (e.key === "ArrowLeft") { var L2 = deckList(); deck.i = deck.i - 1 < 0 ? L2.length - 1 : deck.i - 1; deck.on = false; render(); }
      return;
    }
    if (seg[0] === "mock" && seg[1] === "run" && mState) {
      if (e.key === "ArrowRight") { e.preventDefault(); if (mState.i + 1 < mState.order.length) { mState.i++; render(); } else finishMock(); }
      if (e.key === "ArrowLeft") { if (mState.i) { mState.i--; render(); } }
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) { var el = document.querySelector('[data-act="mpick"][data-i="' + (n - 1) + '"]'); if (el) el.click(); }
      if (e.key === "f") { mState.flags[mState.i] = !mState.flags[mState.i]; render(); }
      return;
    }
    if (seg[0] === "quiz" && seg[1] && qState) {
      var n2 = parseInt(e.key, 10);
      if (n2 >= 1 && n2 <= 4) { var e2 = document.querySelector('[data-act="qpick"][data-i="' + (n2 - 1) + '"]'); if (e2 && !e2.disabled) e2.click(); }
      if (e.key === "Enter") {
        var c = document.querySelector('[data-act="qcheck"]');
        if (c && !c.disabled) c.click(); else { var nx = document.querySelector('[data-act="qnext"]'); if (nx) nx.click(); }
      }
    }
  });

  buildNav(); render();
})();
