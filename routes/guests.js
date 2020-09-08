const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const sendMail = require('../mailer/Welcome');
const notify = require('../mailer/Notify');

router.post('/contact', async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.msg;

    const guest = new Guest({
      name: name,
      email: email,
      msg: message,
      date: new Date(),
    });
    await guest.save();
    sendMail(email, name)
      .then(async () => {
        res.send({ data: { success: true, msg: 'Message has been sent' } });
      })
      .catch((err) => {
        res.send({ data: { success: true, msg: 'Could not send email' } });
      });
    notify(email, name)
      .then(() => {
        console.log('email sent to notify');
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.send({ data: { success: false, msg: 'Could not make request' } });
  }
});

module.exports = router;
