const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill all feedback fields.' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ message: 'Feedback email is not configured yet.' });
  }

  try {
    const transporter = createTransporter();
    const receiver = process.env.FEEDBACK_RECEIVER_EMAIL || process.env.SMTP_USER;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: receiver,
      replyTo: email,
      subject: `FactLens Feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${message}`,
      html: `
        <h2>New FactLens Feedback</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Feedback:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return res.status(200).json({ message: 'Feedback sent successfully.' });
  } catch (error) {
    console.error('Feedback mail error:', error.message);
    return res.status(500).json({ message: 'Could not send feedback right now.' });
  }
};

module.exports = { sendFeedback };
