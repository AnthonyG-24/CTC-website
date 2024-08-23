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
