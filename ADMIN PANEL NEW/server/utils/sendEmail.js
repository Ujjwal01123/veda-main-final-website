const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email utility
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - email body
 */
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"Puja Booking" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent to: ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
}

module.exports = sendEmail;
