(function () {
  "use strict";

  // ================================================================
  // 1. INTERSECTION OBSERVER – triggers fade/zoom when elements enter view
  // ================================================================
  const animElements = document.querySelectorAll(
    ".anim-fade-down, .anim-zoom-in",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optionally unobserve after reveal to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately if IntersectionObserver not supported
    animElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ================================================================
  // 2. MOBILE MENU TOGGLE (no GSAP – pure CSS + JS stagger)
  // ================================================================
  const hamburgerBtn = document.getElementById("nav-hamburger-btn");
  const closeBtn = document.getElementById("nav-close-btn");
  const mobileMenu = document.getElementById("nav-mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-stagger-item");
  const mobileFooterItems = document.querySelectorAll(".mobile-footer-item");

  // Keep track of stagger timeouts so we can cancel them on close
  let staggerTimeouts = [];

  function clearStaggerTimeouts() {
    staggerTimeouts.forEach(function (t) {
      clearTimeout(t);
    });
    staggerTimeouts = [];
  }

  function openMobileMenu() {
    // Show the menu overlay
    mobileMenu.classList.remove("invisible", "opacity-0");
    mobileMenu.classList.add("visible", "opacity-100");
    document.body.style.overflow = "hidden";

    // Reset all stagger items to hidden first
    mobileLinks.forEach(function (el) {
      el.classList.remove("visible");
    });
    mobileFooterItems.forEach(function (el) {
      el.classList.remove("visible");
    });

    // Stagger in the nav links
    mobileLinks.forEach(function (el, index) {
      var delay = 80 + index * 60; // 80ms base + 60ms per item
      var timeout = setTimeout(function () {
        el.classList.add("visible");
      }, delay);
      staggerTimeouts.push(timeout);
    });

    // Stagger in the footer items after a small extra delay
    mobileFooterItems.forEach(function (el, index) {
      var delay = 300 + index * 80; // starts after nav links
      var timeout = setTimeout(function () {
        el.classList.add("visible");
      }, delay);
      staggerTimeouts.push(timeout);
    });
  }

  function closeMobileMenu() {
    // Hide the menu overlay
    mobileMenu.classList.remove("visible", "opacity-100");
    mobileMenu.classList.add("invisible", "opacity-0");
    document.body.style.overflow = "auto";

    // Cancel any pending stagger timeouts
    clearStaggerTimeouts();

    // Reset all stagger items (remove visible class) so they are fresh next open
    mobileLinks.forEach(function (el) {
      el.classList.remove("visible");
    });
    mobileFooterItems.forEach(function (el) {
      el.classList.remove("visible");
    });
  }

  // Event listeners
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", openMobileMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileMenu);
  }

  // Close on any link click inside the mobile menu
  var allMobileLinks = document.querySelectorAll("#nav-mobile-menu a");
  allMobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("visible")) {
      closeMobileMenu();
    }
  });

  // ================================================================
  // 3. (Optional) Ensure initial visible class for elements already in view
  //    – If an anim element is already visible on load, IntersectionObserver
  //      will catch it, but we also do a quick manual check as a safety net.
  // ================================================================
  function checkVisibleOnLoad() {
    var allAnim = document.querySelectorAll(".anim-fade-down, .anim-zoom-in");
    allAnim.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var winHeight =
        window.innerHeight || document.documentElement.clientHeight;
      var threshold = 0.15;
      var visibleHeight = rect.height * threshold;
      if (rect.top < winHeight - visibleHeight && rect.bottom > visibleHeight) {
        el.classList.add("visible");
      }
    });
  }
  // Run after a tiny delay to let layout settle
  setTimeout(checkVisibleOnLoad, 100);
})();
