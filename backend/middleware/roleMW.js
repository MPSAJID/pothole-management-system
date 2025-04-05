const roleMW = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access forbidden: Insufficient rights' });
  }
  next();
};

module.exports = roleMW;

  