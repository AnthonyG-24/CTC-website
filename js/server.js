const express = require("express");
const bodyParser = require("body-parser");
const emailjs = require("emailjs-com");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submissions
app.post("/send-email", (req, res) => {
  const { name, email, baptism_date } = req.body;

  // Prepare email data
  const emailData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    template_params: {
      name,
      email,
      baptism_date,
    },
  };

  // Send the email using EmailJS
  emailjs
    .send(
      emailData.service_id,
      emailData.template_id,
      emailData.template_params,
      emailData.user_id
    )
    .then((response) => {
      console.log("Email sent successfully", response.status, response.text);
      res.json({ success: true, message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error("Failed to send email", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
