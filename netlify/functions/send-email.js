const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Log the incoming data to verify it's being sent correctly
    console.log("Form Data Received:", { name, email, baptism_date });

    // Ensure all form data is provided
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*", // CORS header
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

    // Send the email via EmailJS using environment variables
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Service ID from environment
      process.env.EMAILJS_TEMPLATE_ID, // Template ID from environment
      { name, email, baptism_date }, // Form data
      process.env.EMAILJS_PUBLIC_KEY // Public key from environment
    );

    // Return success response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS header
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    // Log detailed error to the console for debugging
    console.error("Error in send-email function:", error);

    // Return detailed error message
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS header
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        error: "Failed to send email.",
        details: error.message || "Unknown error", // Add detailed error information
      }),
    };
  }
};
