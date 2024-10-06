const emailjs = require("emailjs-com"); // EmailJS SDK

exports.handler = async function (event) {
  // Parse form data from the request body
  const { name, email, baptism_date } = JSON.parse(event.body);

  try {
    // Send email via EmailJS using environment variables for keys
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // Access the service ID
      process.env.EMAILJS_TEMPLATE_ID, // Access the template ID
      {
        name, // Data from form submission
        email,
        baptism_date,
      },
      process.env.EMAILJS_PUBLIC_KEY // Access the public key
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};
