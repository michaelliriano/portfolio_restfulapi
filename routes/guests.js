const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const sendMail = require('../mailer/Welcome');

router.post('/mail', async (req, res) => {
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
        res.send({ success: true, msg: 'Could not send email' });
      });
  } catch (error) {
    res.send({ data: { success: false, msg: 'Could not make request' } });
  }
});

module.exports = router;
