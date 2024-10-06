const emailjs = require("emailjs-com");

exports.handler = async function (event) {
  try {
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Ensure the data is not empty
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing form data" }),
      };
    }

    // Check environment variables
    console.log("Service ID:", process.env.EMAILJS_SERVICE_ID); // Log to verify
    console.log("Template ID:", process.env.EMAILJS_TEMPLATE_ID); // Log to verify
    console.log("Public Key:", process.env.EMAILJS_PUBLIC_KEY); // Log to verify

    // Send email via EmailJS
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Using environment variables
      process.env.EMAILJS_TEMPLATE_ID, // Using environment variables
      { name, email, baptism_date }, // Form data
      process.env.EMAILJS_PUBLIC_KEY // Using environment variables
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error); // Log any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
