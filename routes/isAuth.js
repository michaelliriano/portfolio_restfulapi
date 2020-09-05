const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'Auth Error' });

  try {
    const decoded = jwt.verify(token, 'kitkatbar12345');
    req.user = decoded._id;
    console.log(decoded._id);
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid Token' });
  }
};
