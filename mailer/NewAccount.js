'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail(email, name) {
  let mailOptions = {
    from: 'auto-reply@michaelliriano.com',
    to: email,
    subject: `Thank you for signing up!`,
    html: `<p>Thank you ${name}, you are signed up.`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}
module.exports = sendMail;
