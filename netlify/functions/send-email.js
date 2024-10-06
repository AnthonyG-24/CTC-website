const sgMail = require("@sendgrid/mail");

exports.handler = async function (event) {
  try {
    // Parse the incoming form data
    const { name, email, baptism_date } = JSON.parse(event.body || "{}");

    // Log the incoming data
    console.log("Form Data Received:", { name, email, baptism_date });

    // If any field is missing, return a 400 error
    if (!name || !email || !baptism_date) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing form data." }),
      };
    }

    // Set your SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Add your SendGrid API key to Netlify environment variables

    // Compose the email
    const msg = {
      to: "admin@example.com", // Your email address where you want to receive form data
      from: email, // The email address of the sender (from form data)
      subject: `New Baptism Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPreferred Baptism Date: ${baptism_date}`,
    };

    // Send the email
    await sgMail.send(msg);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    // Log the error details
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        error: "Failed to send email.",
        details: error.message || "Unknown error",
      }),
    };
  }
};
