/* by Khalid Alblwi · WHIZZY */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var LANG_KEY = "whizzy-lang";
  var TITLES = {
    en: "WHIZZY — Khalid · Software & Game Engine Developer (UE5 / C++)",
    ar: "WHIZZY — خالد · مطوّر برمجيات · مطوّر محرّكات ألعاب (UE5 / C++)"
  };
  var TOGGLE_LABEL = { en: "العربية", ar: "English" };
  var TOGGLE_ARIA = { en: "التبديل إلى العربية", ar: "Switch to English" };

  var i18nNodes = Array.prototype.slice.call(document.querySelectorAll("[data-en]"));
  var toggleBtn = document.querySelector(".lang-toggle");

  function applyLang(lang) {
    if (lang !== "en") lang = "ar";
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    i18nNodes.forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val !== null) el.innerHTML = val;
    });

    document.title = TITLES[lang];
    if (toggleBtn) {
      toggleBtn.textContent = TOGGLE_LABEL[lang];
      toggleBtn.setAttribute("aria-label", TOGGLE_ARIA[lang]);
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
  applyLang(savedLang || "ar");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
      applyLang(current === "ar" ? "en" : "ar");
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function stagger(selector) {
    var items = document.querySelectorAll(selector);
    Array.prototype.forEach.call(items, function (el, i) {
      el.style.setProperty("--reveal-delay", (i * 90) + "ms");
    });
  }
  stagger(".work-item.reveal");
  stagger(".skill-group.reveal");

  function revealAll() {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { io.observe(el); });

    var revealInView = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
      });
    };
    revealInView();
    window.addEventListener("load", revealInView);

    window.setTimeout(revealAll, 2500);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      if (id === "#top") {
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      } else {
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start"
        });
      }

      var hadTabindex = target.hasAttribute("tabindex");
      if (!hadTabindex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabindex) {
        target.addEventListener("blur", function handler() {
          target.removeAttribute("tabindex");
          target.removeEventListener("blur", handler);
        });
      }

      if (history.replaceState) history.replaceState(null, "", id);
    });
  });
})();
