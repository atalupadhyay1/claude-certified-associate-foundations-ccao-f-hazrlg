/* Minimal markdown renderer for the CCAO-F study site.
   Supports: # ## ### headings, - bullets (2-space nesting), 1. ordered,
   > blockquote, ~~~ fenced blocks, | tables |, --- hr, **bold**, *italic*,
   ==mark==, and [[callout:Type]] lines. No backticks required in content. */
(function () {
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function inline(s) {
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    s = s.replace(/==([^=]+)==/g, "<mark>$1</mark>");
    s = s.replace(/“([^”]+)”/g, "&ldquo;$1&rdquo;");
    return s;
  }

  window.renderMD = function (src) {
    if (!src) return "";
    var lines = String(src).replace(/\r/g, "").split("\n");
    var out = [], i = 0;

    function isTableStart(k) {
      return lines[k] && lines[k].indexOf("|") === 0 &&
        lines[k + 1] && /^[\s|:\-]+$/.test(lines[k + 1]) && lines[k + 1].indexOf("-") > -1;
    }
    function splitRow(r) {
      return r.replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (c) { return c.trim(); });
    }

    while (i < lines.length) {
      var line = lines[i];

      if (/^~~~/.test(line)) {
        var buf = []; i++;
        while (i < lines.length && !/^~~~/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push("<pre class=\"codeblock\"><code>" + esc(buf.join("\n")) + "</code></pre>");
        continue;
      }
      if (/^\s*$/.test(line)) { i++; continue; }
      if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        var lvl = h[1].length;
        var txt = h[2].trim();
        var cls = "";
        if (txt.toLowerCase().indexOf("[") === 0) {
          var m = txt.match(/^\[([a-z]+)\]\s*(.*)$/i);
          if (m) { cls = " h--" + m[1].toLowerCase(); txt = m[2]; }
        }
        out.push("<h" + lvl + " class=\"mdh" + cls + "\">" + inline(txt) + "</h" + lvl + ">");
        i++; continue;
      }

      /* callouts: "::type Label | text", "::type: text", "::type | text" */
      var co = line.match(/^::\s*([a-zA-Z][\w-]*)(?:\s+([^|\n]*?))?\s*(?:\||:)\s*(.*)$/);
      if (co) {
        var ctype = co[1].toLowerCase();
        var clabel = (co[2] || "").trim();
        var body = [co[3]]; i++;
        while (i < lines.length && lines[i].trim() !== "" && !/^::/.test(lines[i]) && !/^[#|>~-]/.test(lines[i])) {
          body.push(lines[i]); i++;
        }
        out.push("<div class=\"callout callout--" + ctype + "\"><span class=\"callout__tag\">" +
          inline(clabel || ctype) + "</span><div>" + inline(body.join(" ")) + "</div></div>");
        continue;
      }

      if (/^>\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
        out.push("<blockquote>" + inline(q.join(" ")) + "</blockquote>");
        continue;
      }

      if (isTableStart(i)) {
        var head = splitRow(lines[i]); i += 2;
        var rows = [];
        while (i < lines.length && lines[i].indexOf("|") === 0) { rows.push(splitRow(lines[i])); i++; }
        var t = "<div class=\"tablewrap\"><table class=\"mdt\"><thead><tr>";
        head.forEach(function (c) { t += "<th>" + inline(c) + "</th>"; });
        t += "</tr></thead><tbody>";
        rows.forEach(function (r) {
          t += "<tr>";
          for (var c = 0; c < head.length; c++) t += "<td>" + inline(r[c] === undefined ? "" : r[c]) + "</td>";
          t += "</tr>";
        });
        t += "</tbody></table></div>";
        out.push(t);
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        var items = [], cur = null, subItems = null;
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          var indent = lines[i].match(/^\s*/)[0].length;
          var txt2 = lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, "");
          if (indent >= 2) {
            if (!subItems) { subItems = []; }
            subItems.push(txt2);
          } else {
            if (subItems) { cur.sub = subItems; subItems = null; }
            cur = { t: txt2, sub: null };
            items.push(cur);
          }
          i++;
        }
        if (subItems && cur) cur.sub = subItems;
        var lis = items.map(function (it) {
          var inner = inline(it.t);
          if (it.sub && it.sub.length) {
            inner += "<ul class=\"md-ul--sub\">" + it.sub.map(function (s) { return "<li>" + inline(s) + "</li>"; }).join("") + "</ul>";
          }
          return "<li>" + inner + "</li>";
        }).join("");
        out.push("<ul class=\"md-ul\">" + lis + "</ul>");
        continue;
      }

      var para = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|~~~|>\s?|\s*[-*]\s+|\s*\d+\.\s+|---)/.test(lines[i]) && lines[i].indexOf("|") !== 0 && !/^::/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      if (para.length) out.push("<p>" + inline(para.join(" ")) + "</p>");
      else i++;
    }
    return out.join("\n");
  };
})();
