// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const rightNav = document.querySelector(".right-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  rightNav.classList.toggle("active");
});

// Close menu when a navigation link is clicked
document.querySelectorAll(".right-nav a").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    rightNav.classList.remove("active");
  })
);

// Update footer year
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  document.getElementById("footer-year").textContent = currentYear;
});
