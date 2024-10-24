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

// ================== Update Video Source Based on Screen Size ==================
function updateVideoSource() {
  const videoElement = document.getElementById("baptism-video-background"); // Fixed ID

  // Determine the correct video source based on screen width
  let videoSource;
  if (window.innerWidth <= 480) {
    videoSource =
      "assets/videos/Baptism-Vid-Mobile-Optimized.mp4?v=" +
      new Date().getTime(); // Mobile optimized video
  } else {
    videoSource =
      "assets/videos/Baptism-Vid-Optimized.mp4?v=" + new Date().getTime(); // Desktop video
  }

  // Only update if the source has changed to avoid reloading unnecessarily
  if (videoElement.src !== videoSource) {
    videoElement.src = videoSource;
    videoElement.load(); // Reload the video with the new source
    videoElement
      .play()
      .then(() => {
        // Video successfully plays, keep it visible
        videoElement.style.display = "block";
      })
      .catch((error) => {
        console.log("Autoplay blocked or video failed to load:", error);

        // If autoplay or loading fails, hide the video
        videoElement.style.display = "none";
      });
  }
}

// Update video on page load and window resize
window.addEventListener("load", updateVideoSource);
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateVideoSource, 200);
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
