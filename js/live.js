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

// ================== Live Section Touch Interaction ==================
document.addEventListener("DOMContentLoaded", function () {
  var liveSection = document.querySelector(".going-live-section");
  var liveImage = document.querySelector(".going-live-image");
  var liveContentP = document.querySelector(".going-live-content p");
  var liveButton = document.querySelector(".going-live-content button");

  // Add touchstart event listeners to each element
  liveSection.addEventListener("touchstart", function () {
    liveSection.classList.add("touch-active");
  });

  liveImage.addEventListener("touchstart", function () {
    liveImage.classList.add("touch-active");
  });

  liveContentP.addEventListener("touchstart", function () {
    liveContentP.classList.add("touch-active");
  });

  liveButton.addEventListener("touchstart", function () {
    liveButton.classList.add("touch-active");
  });

  // Add touchend event listeners to remove active state
  liveSection.addEventListener("touchend", function () {
    liveSection.classList.remove("touch-active");
  });

  liveImage.addEventListener("touchend", function () {
    liveImage.classList.remove("touch-active");
  });

  liveContentP.addEventListener("touchend", function () {
    liveContentP.classList.remove("touch-active");
  });

  liveButton.addEventListener("touchend", function () {
    liveButton.classList.remove("touch-active");
  });
});

// ================== Lazy Loading for Iframes and Tab Functionality ==================
document.addEventListener("DOMContentLoaded", function () {
  const lazyIframes = document.querySelectorAll("iframe.lazy-iframe");

  lazyIframes.forEach((iframe) => {
    // Native lazy loading support
    if ("loading" in iframe) {
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("src", iframe.getAttribute("data-src"));
    } else {
      // Fallback for browsers without native lazy-loading
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute(
              "src",
              entry.target.getAttribute("data-src")
            );
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(iframe);
    }
  });

  // ================== Tab Functionality for Switching Categories ==================
  const tabs = document.querySelectorAll(".category-tab");
  const categories = document.querySelectorAll(".video-category-content");

  // Hide all categories
  function hideAllCategories() {
    categories.forEach((category) => {
      category.classList.remove("active");
      category.style.display = "none";
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  }

  // Show the default category (e.g., Church Services)
  function showDefaultCategory() {
    hideAllCategories();
    const defaultCategory = document.getElementById("church-services");
    defaultCategory.style.display = "block";
    defaultCategory.classList.add("active");
    tabs[0].classList.add("active");
  }

  // Add event listeners to tabs to switch between categories
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      hideAllCategories();
      const categoryId = tab.getAttribute("data-category");
      const activeCategory = document.getElementById(categoryId);
      activeCategory.style.display = "block";
      activeCategory.classList.add("active");
      tab.classList.add("active");

      // Store the last selected category in localStorage
      localStorage.setItem("lastCategory", categoryId);
    });
  });

  showDefaultCategory();
});

// ================== Lazy Loading for Iframes (Redundant Code) ==================
document.addEventListener("DOMContentLoaded", function () {
  const lazyIframes = document.querySelectorAll("iframe.lazy-iframe");

  lazyIframes.forEach((iframe) => {
    // Native lazy loading support
    if ("loading" in iframe) {
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("src", iframe.getAttribute("data-src"));
    } else {
      // Fallback for browsers without native lazy-loading
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute(
              "src",
              entry.target.getAttribute("data-src")
            );
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(iframe);
    }
  });
});
