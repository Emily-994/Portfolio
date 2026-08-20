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

  /* ---- 3. Header: hide on scroll down, show on scroll up ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var lastY = window.pageYOffset;
    var ticking = false;

    var onScroll = function () {
      var y = window.pageYOffset;

      header.classList.toggle("at-top", y < 12);

      if (y > lastY && y > 220) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    };

    onScroll();
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(onScroll);
      },
      { passive: true }
    );
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

  /* ---- 5. Footer year ---- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
