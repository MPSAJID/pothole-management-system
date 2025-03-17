const db = require('../config/db');

const Pothole = {
  // Report a new pothole
  reportPothole: (pothole, callback) => {
    const query = `
      INSERT INTO potholes 
      (description, image_url, latitude, longitude, severity, status, reported_by)
      VALUES ($1, $2, $3, $4, $5, 'Pending', $6)
      RETURNING *;
    `;
    db.query(
      query,
      [
        pothole.description,
        pothole.image_url, 
        pothole.latitude,
        pothole.longitude,
        pothole.severity,
        pothole.reported_by, 
      ],
      callback
    );
  },

  // Get all potholes
  getAllPotholes: (callback) => {
    db.query('SELECT * FROM potholes ORDER BY reported_at DESC', [], callback);
  },

  // Update pothole status (e.g., to "In Progress", "Resolved")
  updateStatus: (id, status, callback) => {
    db.query(
      'UPDATE potholes SET status = $1 WHERE pothole_id = $2 RETURNING *',
      [status, id],
      callback
    );
  },
};

module.exports = Pothole;
