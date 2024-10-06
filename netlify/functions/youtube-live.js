// Import node-fetch
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UCc6508gRYgLCAFpzK3C6gzg"; // Replace with your YouTube Channel ID

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return {
        statusCode: 200,
        body: JSON.stringify({ videoId }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No live stream currently active." }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube data" }),
    };
  }
};
