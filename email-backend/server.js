const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');  // Import axios
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5000;

// Enable CORS for all origins (for development purposes)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests only from your React app
  methods: ['GET', 'POST'],  // Allow only specific methods
}));

// Body parser middleware to handle JSON requests
app.use(express.json());

// Sending email route
app.post('/send-email', (req, res) => {
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Sending Telegram message route using axios
app.post('/send-telegram', async (req, res) => {
  const { message } = req.body;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    if (response.data.ok) {
      res.status(200).json({ message: 'Telegram message sent successfully!' });
    } else {
      res.status(500).json({ error: 'Error sending Telegram message: ' + response.data.description });
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    res.status(500).json({ error: 'Error sending Telegram message' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
