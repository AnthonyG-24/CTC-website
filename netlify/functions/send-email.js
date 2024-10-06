const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    // Ensure that the body contains valid JSON
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Check if the form data was received, if not, return an error
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

    // Send email via EmailJS using environment variables for keys
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Environment variable for service ID
      process.env.EMAILJS_TEMPLATE_ID, // Environment variable for template ID
      { name, email, baptism_date }, // Data to be passed to EmailJS template
      process.env.EMAILJS_PUBLIC_KEY // Environment variable for public key
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};
