const express = require('express');
const { User, validate } = require('../models/User');
const auth = require('./isAuth');
const router = express.Router();

// router.get('/me', auth, async (req, res) => {
//   try {
//     // request.user is getting fetched from Middleware after token authentication
//     const user = await User.findOne(req.user);
//     res.json(user);
//   } catch (e) {
//     res.send({ message: 'Error in Fetching user' });
//     console.log(e);
//   }
// });

module.exports = router;
