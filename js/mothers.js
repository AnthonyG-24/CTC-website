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

// ================== Video Source Update on Page Load and Resize ==================
document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("cloudVideo");

  // Video source update based on screen width
  function updateVideoSource() {
    const videoSources = videoElement.getElementsByTagName("source");
    let needsUpdate = false;

    // Loop through the available video sources to find the matching media query
    for (let i = 0; i < videoSources.length; i++) {
      const mediaCondition = videoSources[i].media;
      const matchesMedia = window.matchMedia(mediaCondition).matches;

      // If a match is found, update the video source if necessary
      if (matchesMedia) {
        if (videoElement.getAttribute("src") !== videoSources[i].src) {
          videoElement.setAttribute("src", videoSources[i].src);
          needsUpdate = true; // Mark that we need to reload the video
        }
        break; // Stop loop once the correct media query matches
      }
    }

    // Reload video if the source was updated
    if (needsUpdate) {
      videoElement.load();
    }
  }

  // Call the function to set the correct video source on page load
  updateVideoSource();

  // Update the video source whenever the window is resized
  window.addEventListener("resize", updateVideoSource);
});

// ================== Mother Image Slider Functionality ==================
document.addEventListener("DOMContentLoaded", function () {
  const motherImages = document.querySelectorAll(".slider-item img");
  const selectedImage = document.getElementById("selected-mother-image");
  const selectedDetails = document.getElementById("selected-mother-details");

  motherImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Update the image source and alt text
      selectedImage.src = this.src;
      selectedImage.alt = this.alt;

      // Update the mother details dynamically
      const motherId = this.getAttribute("data-mother");
      const motherInfo = document.getElementById(motherId).innerHTML;
      selectedDetails.innerHTML = motherInfo;

      // Display the selected mother info section
      document.getElementById("selected-mother-info").style.display = "block";
    });
  });
});
