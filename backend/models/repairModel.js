const db = require('../config/db');

const Repair = {
  addRepair: (repair, callback) => {
    const query = 'INSERT INTO repairs (pothole_id, worker_id, repair_status, remarks) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [repair.pothole_id, repair.worker_id, repair.repair_status, repair.remarks], callback);
  },
  getRepairs: (callback) => {
    db.query('SELECT * FROM repairs', [], callback);
  }
};

module.exports = Repair;
