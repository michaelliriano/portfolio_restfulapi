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

async function notify(email, name) {
  let mailOptions = {
    from: 'auto-reply@michaelliriano.com',
    to: 'michaelandrewliriano@gmail.com',
    subject: `Someone has sent an inquiry`,
    html: `<p>${name}, has submitted a request to contact you. Please check DB for more details.`,
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
module.exports = notify;
