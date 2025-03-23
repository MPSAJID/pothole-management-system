const Repair = require('../models/repairModel');
const User = require('../models/userModel');


exports.addRepair = (req, res) => {
  const repair = req.body;
  console.log(repair);
  Repair.addRepair(repair, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};

exports.getRepairs = (req, res) => {
  Repair.getRepairs((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};

exports.getWorkers = (req,res) => {
  User.getWorkers((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
}
exports.getWorkerById = (req, res) => {
  const workerId = parseInt(req.params.id, 10);
  User.getWorkerById(workerId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.rows.length === 0) return res.status(404).json({ message: "Worker not found" });
    res.json(result.rows[0]);
  });
};