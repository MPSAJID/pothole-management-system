const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMW = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.sendStatus(403);
  const token = bearerHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) return res.sendStatus(403);
    req.user = authData;
    next();
  });
};

module.exports = authMW;
