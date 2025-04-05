const db = require('../config/db');

const Notification = {
  addNotification: (user_id, message) => {
    const query = 'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *';
    return db.query(query, [user_id, message]);
  },

  getUserNotifications: (user_id) => {
    const query = `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`;
    return db.query(query, [user_id]);
  },

  markAsRead: (notification_id) => {
    return db.query('UPDATE notifications SET is_read = TRUE WHERE notification_id = $1', [notification_id]);
  }
};

module.exports = Notification;
