// AOS
AOS.init({ once: true, offset: 50 });

// Mobile menu
const navHamburgerBtn = document.getElementById("nav-hamburger-btn");
const navCloseBtn = document.getElementById("nav-close-btn");
const navMobileMenu = document.getElementById("nav-mobile-menu");

function openMobileMenu() {
  navMobileMenu.classList.remove("invisible", "opacity-0");
  navMobileMenu.classList.add("visible", "opacity-100");
  document.body.style.overflow = "hidden";
  gsap.fromTo(
    "#nav-mobile-menu > div > div > *",
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.1,
    },
  );
}

function closeMobileMenu() {
  navMobileMenu.classList.remove("visible", "opacity-100");
  navMobileMenu.classList.add("invisible", "opacity-0");
  document.body.style.overflow = "auto";
}

navHamburgerBtn.addEventListener("click", openMobileMenu);
navCloseBtn.addEventListener("click", closeMobileMenu);

document.querySelectorAll("#nav-mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});
