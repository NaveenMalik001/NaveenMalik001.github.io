(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("year");
  var links = nav ? nav.querySelectorAll("a[href^='#']") : [];
  var sections = [];

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) {
      sections.push({ id: id, el: section, link: link });
    }
  });

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
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    var current = sections[0] && sections[0].id;
    sections.forEach(function (item) {
      if (item.el.getBoundingClientRect().top - 120 <= 0) {
        current = item.id;
      }
    });

    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
