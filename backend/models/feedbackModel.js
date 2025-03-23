const db = require('../config/db');

// Add Feedback
exports.addFeedback = (feedback, callback) => {
  const { user_id, pothole_id, rating, comments } = feedback;
  const query = `
    INSERT INTO feedback (user_id, pothole_id, rating, comments)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, pothole_id, rating, comments];
  db.query(query, values, callback);
};

// Get All Feedback for a Specific Pothole
exports.getAllFeedbackByPotholeId = (pothole_id, callback) => {
  const query = `
    SELECT 
      f.feedback_id, 
      f.pothole_id, 
      f.user_id, 
      u.name AS user_name, 
      f.rating, 
      f.comments, 
      f.created_at
    FROM feedback f
    JOIN users u 
      ON f.user_id = u.user_id
    WHERE f.pothole_id = $1
    ORDER BY f.created_at DESC;
  `;

  const values = [pothole_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      callback(err, null);
    } else {
      console.log('Database Query Result:', results.rows);
      callback(null, results.rows);
    }
  });
};
