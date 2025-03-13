const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.createUser({ name, email, password: hashedPassword, role }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.getUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.rows.length === 0) return res.status(401).json({ message: 'User not found' });
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
};
