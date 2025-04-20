const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // This will allow all origins. You can restrict it to specific origins if needed.

// Middleware to parse JSON request bodies
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email service like Mailgun, SendGrid, etc.
  auth: {
    user: "recruitmentupdate9@gmail.com", // Replace with your email
    pass: "ghtb ltut ihbk ghor",  // Replace with your email password or app-specific password
  },
});

// POST route to send email
app.post("/send-email", (req, res) => {
  const { subject, message } = req.body;
  const mailOptions = {
    from: "recruitmentupdate9@gmail.com", // Sender's email address
    to: "recruitmentupdate9@gmail.com", // Replace with recipient's email
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send email", details: error });
    }
    res.status(200).json({ message: "Email sent successfully", info: info.response });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
