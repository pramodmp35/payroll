// Initialize AOS animations
AOS.init({
  once: true,
  offset: 50,
  duration: 800,
});

// Dynamic Scroll Percentage Indicator & Floating Button Logic
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  // Calculate exact percentage (0% at top, 100% at bottom)
  const scrollPercent =
    docHeight > 0
      ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
      : 100;

  const indicator = document.getElementById("scrollCircleIndicator");
  if (indicator) {
    indicator.innerText = scrollPercent + "%";
  }
});

// Trigger initial calculation on load
window.dispatchEvent(new Event("scroll"));

// Newsletter subscription handler with toast alert
function handleSubscribe(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  if (email) {
    showToast("Thank you for subscribing to Tolak Newsletter!");
    document.getElementById("newsletterForm").reset();
  }
}

// Custom Toast Notification (replacing alert)
function showToast(message) {
  const existingToast = document.getElementById("customToast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.id = "customToast";
  toast.className =
    "fixed bottom-24 right-6 z-50 bg-[#ecab23] text-[#16222d] font-semibold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-lg"></i><span class="text-sm">${message}</span>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  }, 50);

  setTimeout(() => {
    toast.classList.add("translate-y-10", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Smooth scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
