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
  const videoElement = document.getElementById("video-background");
  const fallbackImage = document.getElementById("videoFallback");

  // Determine the correct video source based on screen width
  let videoSource;
  if (window.innerWidth <= 768) {
    videoSource =
      "assets/videos/CTC-remake-Mobile-Optimized.mp4?v=" + new Date().getTime(); // Mobile optimized video
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    videoSource =
      "assets/videos/CTC-Tablet-Optimized.mp4?v=" + new Date().getTime(); // Tablet optimized video
  } else {
    videoSource =
      "assets/videos/CTC-remake-Largescreens-Optimized.mp4?v=" +
      new Date().getTime(); // Desktop video
  }

  // Set the video source and handle fallback for non-video support
  if (videoElement) {
    videoElement.src = videoSource;
    videoElement.load();
  } else if (fallbackImage) {
    fallbackImage.src = "assets/images/video-fallback.jpg";
  }

  // Only update if the source has changed to avoid reloading unnecessarily
  if (videoElement.src !== videoSource) {
    videoElement.src = videoSource;
    videoElement.load(); // Reload the video with the new source
    videoElement
      .play()
      .then(() => {
        // Video successfully plays, hide the fallback
        videoElement.style.display = "block";
        fallbackImage.style.display = "none";
      })
      .catch((error) => {
        console.log("Autoplay blocked, showing fallback image:", error);

        // If autoplay fails, hide the video and show the fallback image
        videoElement.style.display = "none";
        fallbackImage.style.display = "block";
      });
  }
}

// Update the video on page load and window resize
window.addEventListener("load", updateVideoSource);
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateVideoSource, 200);
});
