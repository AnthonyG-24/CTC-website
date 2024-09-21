// Update footer year
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  document.getElementById("footer-year").textContent = currentYear;
});
