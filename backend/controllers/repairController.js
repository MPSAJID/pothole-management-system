const Repair = require('../models/repairModel');

exports.addRepair = (req, res) => {
  const repair = req.body;
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
