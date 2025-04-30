const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Enhanced CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://wayneverify.online'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ Handle preflight (OPTIONS) requests
app.options('*', cors());

// Middleware to parse JSON
app.use(express.json());

// 📧 Email Sending Route
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
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// 📩 Telegram Message Route
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
      res.status(500).json({ error: response.data.description || 'Failed to send Telegram message' });
    }
  } catch (error) {
    console.error('Telegram error:', error.message);
    res.status(500).json({ error: 'Error sending Telegram message' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
