const Notification = require('../models/notificationModel');
const io = require('../app');
const { getSocketId } = require('../utils/socketUtils'); 
exports.addNotification = async (req, res) => {
  const { user_id, message } = req.body;

  try {
    const result = await Notification.addNotification(user_id, message);
    const notification = result.rows[0];

    const socketId = getSocketId(user_id);
    if (socketId) {
      io.to(socketId).emit("newNotification", notification);
    }

    res.status(201).json(notification);
  } catch (err) {
    console.error('Error in addNotification:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserNotifications = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await Notification.getUserNotifications(user_id);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
