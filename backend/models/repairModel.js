const db = require('../config/db');

const Repair = {
  addRepair: (repair, callback) => {
    const query = 'INSERT INTO repairs (pothole_id, worker_id, repair_status, remarks) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [repair.pothole_id, repair.worker_id, 'assigned', repair.remarks], callback);
  },
  getRepairs: (callback) => {
    db.query('SELECT * FROM repairs', [], callback);
  },
  updateRepairStatus: (repair_id, repair_status, imageUrl, callback) => {
    const query = `
      UPDATE repairs 
      SET repair_status = $1, 
          image_url = COALESCE($2, image_url)
      WHERE repair_id = $3
      RETURNING *`;
    db.query(query, [repair_status, imageUrl, repair_id], callback);
  }
};

module.exports = Repair;
