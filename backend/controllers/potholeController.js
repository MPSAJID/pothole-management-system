const Pothole = require('../models/potholeModel');

exports.reportPothole = (req, res) => {
  const pothole = req.body;
  Pothole.reportPothole(pothole, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};

exports.getPotholes = (req, res) => {
  Pothole.getAllPotholes((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  Pothole.updateStatus(id, status, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};
