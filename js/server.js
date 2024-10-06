const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// You can still log form submissions or store data in a database here
app.post("/submit-form", (req, res) => {
  const { name, email, baptism_date } = req.body;

  // Log or process form data (e.g., store in a database)
  console.log("Form submitted:", { name, email, baptism_date });

  // Respond to the client
  res.json({ success: true, message: "Form submitted successfully!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
