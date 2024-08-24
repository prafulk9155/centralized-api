const express = require("express");
const nodemailer = require("nodemailer");
const Email = require("../models/emailModel"); // Ensure your model is set up correctly
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    error: false,
    message: "Email API Running...",
  });
});

router.post("/send-email", async (req, res) => {
  try {
    console.log("Request body:", req.body.data); // Log the request body
    const data = req.body.data;
    
    // Validate request body
    if (!data || !data.name || !data.email || !data.message) {
      return res.status(400).json({ error: "Request data is missing or incomplete." });
    }

    const { name, email, message } = data;

    // Save email data to MongoDB
    const newEmail = new Email({ name, email, message });
    await newEmail.save();

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'prafulk7050@gmail.com' ,// Use environment variable
        pass: 'kqmormexzxdqoitj', // Use environment variable
      },
    });

    // Mail options for the recipient
    const recipientMailOptions = {
      from: 'prafulk7050@gmail.com', // your email address
      to: "prafulk9155@gmail.com", // recipient's email address
      subject: `New message from ${name} (${email}) from your portfolio `,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email to the recipient
    await transporter.sendMail(recipientMailOptions);

    // Mail options for the sender confirmation
    const senderMailOptions = {
      from: process.env.EMAIL_USER, // your email address
      to: email, // sender's email address
      subject: "Message Received Confirmation",
      text: `Dear ${name},\n\nThank you for reaching out to us! We have received your message and will get back to you shortly.\n\nBest regards,\nPraful Kumar`,
    };

    // Send confirmation email to the sender
    await transporter.sendMail(senderMailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email not sent" });
  }
});

module.exports = router;
