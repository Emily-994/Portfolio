/* =========================================================
   Emily Zhang — Portfolio
   Small, dependency-free interactions. Every effect is
   disabled automatically when the visitor prefers reduced motion.
   ========================================================= */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Hero: stagger each word of the title on load ---- */
  var heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !reduced) {
    var words = heroTitle.querySelectorAll(".word");
    Array.prototype.forEach.call(words, function (word, i) {
      word.style.animationDelay = 0.09 * i + 0.15 + "s";
    });
  }

  /* ---- 2. Scroll reveal ---- */
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(revealables, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            // small stagger between siblings revealed in the same frame
            var delay = parseFloat(entry.target.dataset.revealDelay || 0);
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, delay * 1000);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      Array.prototype.forEach.call(revealables, function (el) {
        observer.observe(el);
      });
    }
  }

  /* ---- 3. Header: always visible, compacts once the page has scrolled ----
     It used to retract on scroll down, which meant the only way back to Home
     from the foot of a long case study was to scroll the whole page up. It now
     stays put and simply tightens into a thin bar. */
  var header = document.querySelector(".site-header");
  if (header) {
    // a single class toggle: cheap enough to run on every scroll event
    var onHeaderScroll = function () {
      header.classList.toggle("at-top", window.pageYOffset < 12);
    };
    onHeaderScroll();
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
  }

  /* ---- 4. Reading progress bar (case-study pages) ---- */
  var progress = document.querySelector(".progress");
  if (progress) {
    var updateProgress = function () {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.pageYOffset / scrollable : 0;
      progress.style.transform = "scaleX(" + Math.min(Math.max(ratio, 0), 1) + ")";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---- 5. WORK: underline the nav link while the project grid is on screen ---- */
  var workLink = document.querySelector('[data-nav="work"]');
  var workSection = document.getElementById("work");
  if (workLink && workSection && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            workLink.setAttribute("aria-current", "true");
          } else {
            workLink.removeAttribute("aria-current");
          }
        });
      },
      // fires once the grid reaches the middle band of the viewport
      { rootMargin: "-45% 0px -45% 0px" }
    ).observe(workSection);
  }

  /* ---- 6. Footer year ---- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
