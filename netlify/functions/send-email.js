const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Check if the form data was received, if not, return an error
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow CORS
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

    // Send email via EmailJS
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Environment variable for service ID
      process.env.EMAILJS_TEMPLATE_ID, // Environment variable for template ID
      { name, email, baptism_date }, // Form data
      process.env.EMAILJS_PUBLIC_KEY // Environment variable for public key
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email via EmailJS:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};
