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
    subject: `Thanks for reaching out!`,
    html: `<strong>Thank you ${name} for reaching out! I received your message and will get back to you as soon as possible.</strong>
    <br>
    <br>
    <br>
    <br>
    <strong>Best Regards,</strong>
    <br>
    <br>
    <strong>Michael Liriano</strong>
    <br>
    <strong>Front End Developer</strong>
    <br>
    <strong>Cell: (786) 201-0974 </strong>
    `,
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
