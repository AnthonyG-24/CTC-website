const hamburger = document.querySelector(".hamburger");
const rightNav = document.querySelector(".right-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  rightNav.classList.toggle("active");
});

document.querySelectorAll("right-nav").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    rightNav.classList.remove("active");
  })
);

// JavaScript: js/script.js

document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  const slides = document.querySelectorAll(".slider img");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideId = dot.getAttribute("data-slide");
      const targetSlide = document.getElementById(slideId);

      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: "smooth" });

        // Update active dot
        dots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
      }
    });
  });
});
