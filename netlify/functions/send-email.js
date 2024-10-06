const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Log the incoming data to verify it's correct
    console.log("Form Data:", { name, email, baptism_date });

    // Check if the form data was received, if not, return an error
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*", // CORS header
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST requests
        },
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

    // Optionally initialize EmailJS if required
    // emailjs.init(process.env.EMAILJS_PUBLIC_KEY); // Uncomment if needed

    // Send email via EmailJS
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Service ID from environment variables
      process.env.EMAILJS_TEMPLATE_ID, // Template ID from environment variables
      { name, email, baptism_date }, // Form data
      process.env.EMAILJS_PUBLIC_KEY // Public key from environment variables
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS header
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email via EmailJS:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS header
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        error: "Failed to send email.",
        details: error.message, // Include the detailed error
      }),
    };
  }
};
