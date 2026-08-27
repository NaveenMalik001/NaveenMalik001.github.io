(function () {
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("year");
  var bar = document.querySelector(".scroll-progress span");
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']")) : [];
  var sections = links.map(function (link) {
    var id = link.getAttribute("href").slice(1);
    return { id: id, el: document.getElementById(id), link: link };
  }).filter(function (item) { return item.el; });

  if (year) year.textContent = String(new Date().getFullYear());

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    if (header && hero) {
      header.classList.toggle("on-light", window.scrollY > hero.offsetHeight - 64);
    }
    var current = sections[0] && sections[0].id;
    sections.forEach(function (item) {
      if (item.el.getBoundingClientRect().top - 120 <= 0) current = item.id;
    });
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
