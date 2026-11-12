/* =========================================================
   Puffolio case study — Puff's expression strip and the type
   tester in "Mascot and typeface". Dependency-free, like main.js.
   ========================================================= */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function press(button, on) { button.setAttribute("aria-pressed", on ? "true" : "false"); }

  /* ---- Puff's expressions ----
     The strip is the team's own rig, running in assets/puffolio/puff-rig.html.
     It reports how tall its row of tiles is, so the frame fits it exactly. */
  var strip = document.querySelector(".puff-strip");
  if (strip) {
    window.addEventListener("message", function (event) {
      if (event.source !== strip.contentWindow || !event.data) return;
      var height = event.data.puffStripHeight;
      if (height > 0) strip.style.height = height + "px";
    });
  }

  /* ---- Type tester ---- */
  var tester = document.getElementById("type-tester");
  if (tester) {
    var input = document.getElementById("tester-input");
    var text = document.getElementById("tester-text");
    var output = tester.querySelector(".tester-output");
    var styleChips = tester.querySelectorAll("[data-style]");
    var UNSUPPORTED = /[^a-zA-Z0-9 .,!?':\-&]/g;   // everything Puff Hand has no glyph for

    var count = document.getElementById("tester-count");

    // The sample stays on one line. If the words are wider than the panel at the
    // normal size, the type shrinks just enough for them to fit.
    var fit = function () {
      text.style.fontSize = "";
      var box = getComputedStyle(output);
      var room = output.clientWidth - parseFloat(box.paddingLeft) - parseFloat(box.paddingRight);
      var wide = text.scrollWidth;
      if (wide > room && room > 0) {
        text.style.fontSize = Math.floor(parseFloat(getComputedStyle(text).fontSize) * room / wide) + "px";
      }
    };
    window.addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

    var render = function () {
      // curly apostrophes from phone keyboards become the straight one the font has
      var clean = input.value.replace(/[‘’]/g, "'").replace(UNSUPPORTED, "");
      if (clean !== input.value) input.value = clean;
      text.textContent = clean.trim() ? clean : "a sketch a day";
      count.textContent = clean.length + "/" + input.maxLength;
      fit();
    };
    input.addEventListener("input", render);
    // Left empty, the box takes the default words back, so it always matches the sample.
    input.addEventListener("blur", function () {
      if (!input.value.trim()) { input.value = "a sketch a day"; render(); }
    });

    each(styleChips, function (chip) {
      chip.addEventListener("click", function () {
        each(styleChips, function (other) { press(other, other === chip); });
        output.dataset.style = chip.dataset.style;
        fit();
      });
    });
    render();
  }
})();
