const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const liveVideoId = data.items[0].id.videoId; // Extract video ID from response
      return {
        statusCode: 200,
        body: JSON.stringify({ liveVideoId }), // Send video ID back to the client
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No live stream found" }), // No live stream available
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching live video" }), // Handle errors
    };
  }
};
