const Feedback = require('../models/feedbackModel');

exports.addFeedback = (req, res) => {
  const feedback = req.body;
  Feedback.addFeedback(feedback, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
  });
};

exports.getFeedback = (req, res) => {
  Feedback.getAllFeedback((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};
