const db = require('../config/db');

const Notification = {
  addNotification: (notification, callback) => {
    const query = 'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *';
    db.query(query, [notification.user_id, notification.message], callback);
  },
  getUserNotifications: (user_id, callback) => {
    db.query('SELECT * FROM notifications WHERE user_id = $1', [user_id], callback);
  }
};

module.exports = Notification;
