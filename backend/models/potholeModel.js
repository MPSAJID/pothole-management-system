const db = require('../config/db');

const Pothole = {
  reportPothole: (pothole, callback) => {
    const query = 'INSERT INTO potholes (location, image, status, reported_by) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [pothole.location, pothole.image, pothole.status, pothole.reported_by], callback);
  },
  getAllPotholes: (callback) => {
    db.query('SELECT * FROM potholes', [], callback);
  },
  updateStatus: (id, status, callback) => {
    db.query('UPDATE potholes SET status = $1 WHERE pothole_id = $2 RETURNING *', [status, id], callback);
  }
};

module.exports = Pothole;
