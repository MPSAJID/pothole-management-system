const db = require('../config/db');

const Feedback = {
  addFeedback: (feedback, callback) => {
    const query = 'INSERT INTO feedback (user_id, pothole_id, rating, comments) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [feedback.user_id, feedback.pothole_id, feedback.rating, feedback.comments], callback);
  },
  getAllFeedback: (callback) => {
    db.query('SELECT * FROM feedback', [], callback);
  }
};

module.exports = Feedback;
