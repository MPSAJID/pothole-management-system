const Notification = require('../models/notificationModel');

exports.addNotification = (req, res) => {
  const notification = req.body;
  Notification.addNotification(notification, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};

exports.getNotifications = (req, res) => {
  const { user_id } = req.params;
  Notification.getUserNotifications(user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};
