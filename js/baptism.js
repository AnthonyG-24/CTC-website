// ================== Toggle Menu Functionality ==================
document.getElementById("bTn").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("active");
});

// Close the menu when clicking outside of it
document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("bTn");

  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.classList.remove("active");
  }
});

// Close the menu when the close button is clicked
document.getElementById("closeMenu").addEventListener("click", function () {
  document.getElementById("menu").classList.remove("active");
});

// ================== Show Next Step Functionality ==================
function showNextStep(step) {
  // Hide all steps
  const steps = document.querySelectorAll(".question-step");
  steps.forEach(function (stepDiv) {
    stepDiv.style.display = "none";
  });

  // Show the next step
  const nextStep = document.getElementById("step" + step);
  if (nextStep) {
    nextStep.style.display = "block";
  }

  // Show the signup section if it's the final step
  if (step === 4) {
    document.querySelector(".question-section").style.display = "none";
    document.getElementById("signupSection").style.display = "block";
  }
}
