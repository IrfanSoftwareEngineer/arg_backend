const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.PASSWORD, // Your app password
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
