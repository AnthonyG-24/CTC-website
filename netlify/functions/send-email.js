const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    // Log the incoming request body to inspect the data
    console.log("Request body:", event.body);

    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // If any of the required fields are missing, return an error
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

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
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email via EmailJS:", error);
    return {
      statusCode: 500,

      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};
