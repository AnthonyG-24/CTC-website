document.addEventListener("DOMContentLoaded", () => {
  // ================== Toggle Menu ==================
  const menuButton = document.getElementById("bTn");
  const menu = document.getElementById("menu");
  const closeButton = document.getElementById("closeMenu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  if (closeButton && menu) {
    closeButton.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (menu && menuButton) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove("active");
      }
    }
  });

  // ================== Update Video ==================
  const videoElement = document.getElementById("video-background");
  const fallbackImage = document.getElementById("videoFallback");

  function updateVideoSource() {
    if (!videoElement && !fallbackImage) return;

    let videoSource;
    if (window.innerWidth <= 768) {
      videoSource = "/assets/videos/CTC-remake-Mobile-Optimized.mp4";
    } else if (window.innerWidth <= 1024) {
      videoSource = "/assets/videos/CTC-Tablet-Optimized.mp4";
    } else {
      videoSource = "/assets/videos/CTC-remake-Largescreens-Optimized.mp4";
    }

    // Add cache-buster to force reload
    videoSource += "?v=" + new Date().getTime();

    if (videoElement) {
      videoElement.src = videoSource;
      videoElement.load();
      videoElement
        .play()
        .then(() => {
          videoElement.style.display = "block";
          if (fallbackImage) fallbackImage.style.display = "none";
        })
        .catch(() => {
          videoElement.style.display = "none";
          if (fallbackImage) fallbackImage.style.display = "block";
        });
    } else if (fallbackImage) {
      fallbackImage.src = "/assets/images/video-fallback.jpg";
      fallbackImage.style.display = "block";
    }
  }

  // Run on load
  updateVideoSource();

  // Run on resize (debounced)
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateVideoSource, 200);
  });
});
