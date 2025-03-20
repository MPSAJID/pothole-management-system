const db = require('../config/db');

const Pothole = {
  // Report a new pothole
  reportPothole: (pothole, callback) => {
    const query = `
      INSERT INTO potholes 
      (description, image_url, latitude, longitude, severity, status, reported_by)
      VALUES ($1, $2, $3, $4, $5, 'reported', $6)
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
    const query = `
      SELECT 
        p.pothole_id, 
        p.description, 
        p.image_url, 
        p.latitude, 
        p.longitude, 
        p.severity, 
        p.status, 
        p.reported_at, 
        u.name AS reported_by 
      FROM potholes p
      LEFT JOIN users u ON p.reported_by = u.user_id
      ORDER BY p.reported_at DESC;
    `;
    db.query(query, [], callback);
  },

  getPotholeinfo:(id,callback) => {
    const query = `
    SELECT 
      p.pothole_id, 
      p.description, 
      p.image_url, 
      p.latitude, 
      p.longitude, 
      p.severity, 
      p.status, 
      p.reported_at, 
      u.name AS reported_by 
    FROM potholes p
    LEFT JOIN users u ON p.reported_by = u.user_id
    WHERE p.pothole_id = $1;
  `;
  db.query(query, [id], callback);
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
