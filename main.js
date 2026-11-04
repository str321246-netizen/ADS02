/* ===== YAO MOVEMENT STUDIO — 曜運動 ===== */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeNav() {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---- Header scrolled state ---- */
  var header = document.querySelector(".site-header");
  var topBtn = document.getElementById("topBtn");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (topBtn) topBtn.classList.toggle("show", y > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Stat counter ---- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = 0;
    var dur = 1600;
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  var stats = document.querySelectorAll(".stat-num");
  if (stats.length && "IntersectionObserver" in window) {
    var statIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            statIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach(function (el) { statIO.observe(el); });
  }

  /* ---- Contact form (front-end demo) ---- */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      var ok = true;
      [name, phone].forEach(function (f) {
        if (!f.value.trim()) {
          f.style.borderColor = "#e0533d";
          ok = false;
        } else {
          f.style.borderColor = "";
        }
      });
      if (!ok) return;
      form.reset();
      if (success) {
        success.classList.add("show");
        setTimeout(function () { success.classList.remove("show"); }, 5000);
      }
    });
  }

  /* ---- Social quick-link placeholders (replace # with real URLs) ---- */
  var socials = {
    line: "https://line.me/",
    fb: "https://www.facebook.com/",
    ig: "https://www.instagram.com/"
  };
  document.querySelectorAll("[data-s]").forEach(function (a) {
    var key = a.getAttribute("data-s");
    if (socials[key]) a.setAttribute("href", socials[key]);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
})();
