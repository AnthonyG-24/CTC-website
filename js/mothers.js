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

// ================== Bible Section Toggle Functionality ==================
function toggleBible() {
  const bibleContainer = document.getElementById("fullBible");

  // Toggle the display of the Bible container between 'none' and 'block'
  if (
    bibleContainer.style.display === "none" ||
    bibleContainer.style.display === ""
  ) {
    bibleContainer.style.display = "block";
  } else {
    bibleContainer.style.display = "none";
  }
}

// ================== Live Stream Video and Chat Handling ==================
document.addEventListener("DOMContentLoaded", function () {
  // Get elements related to the live stream and the message display
  const videoIframe = document.querySelector(".youtube-live iframe");
  const chatIframe = document.querySelector(".live-chat iframe");
  const noStreamMessage = document.getElementById("no-stream-message");
  const noStreamParagraph = document.getElementById("no-stream-paragraph");

  // Fetch data to check if there's a live stream currently running
  fetch("/.netlify/functions/get-youtube-live")
    .then((response) => response.json())
    .then((data) => {
      // If a live stream video ID is returned, update the iframe sources
      if (data.liveVideoId) {
        const liveVideoId = data.liveVideoId;

        // Update the YouTube video iframe with the live video ID
        videoIframe.src = `https://www.youtube.com/embed/${liveVideoId}`;

        // Update the live chat iframe with the correct live chat link
        chatIframe.src = `https://www.youtube.com/live_chat?v=${liveVideoId}&embed_domain=communitytemplechurch.com`;

        // Ensure the live stream elements (video and chat) are visible
        videoIframe.style.display = "block";
        chatIframe.style.display = "block";

        // Hide the "No Live Stream" message
        noStreamMessage.style.display = "none";
        noStreamParagraph.style.display = "none";
      } else {
        // If no live stream is found, hide the iframes and show the message
        videoIframe.style.display = "none";
        chatIframe.style.display = "none";

        // Display the "No Live Stream" message
        noStreamMessage.style.display = "block";
        noStreamParagraph.style.display = "block";
      }
    })
    .catch((error) => {
      // If there's an error fetching the live stream, assume there's no stream
      console.error("Error fetching the live video:", error);

      // Hide the video and chat iframes
      videoIframe.style.display = "none";
      chatIframe.style.display = "none";

      // Show the "No Live Stream" message
      noStreamMessage.style.display = "block";
      noStreamParagraph.style.display = "block";
    });
});
