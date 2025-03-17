const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMW = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) return res.status(401).json({ message: 'No token provided' });
  const token = bearerHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.user = authData;
    next();
  });
  
};

module.exports = authMW;
