const Feedback = require('../models/feedbackModel');

// Add Feedback
exports.addFeedback = (req, res) => {
  const { pothole_id, comments, rating } = req.body;
  const user_id = req.user.id; // Assuming JWT auth provides user ID

  if (!pothole_id || !comments) {
    return res.status(400).json({ error: "Pothole ID and comments are required" });
  }

  // Ensure rating is either a number or NULL
  const feedback = { user_id, pothole_id, rating: rating || null, comments };

  Feedback.addFeedback(feedback, (err, result) => {
    if (err) {
      console.error("Error adding feedback:", err);
      return res.status(500).json({ error: "Failed to add feedback" });
    }
    res.status(201).json(result.rows[0]);
  });
};

// Get Feedback for a Specific Pothole
exports.getFeedback = (req, res) => {
  const { pothole_id } = req.params;
  console.log("Pothole ID:", pothole_id);

  if (!pothole_id) {
    return res.status(400).json({ error: "Pothole ID is required" });
  }

  Feedback.getAllFeedbackByPotholeId(pothole_id, (err, feedback) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).json({ error: "Failed to fetch feedback" });
    }

    // Check if feedback is an array
    console.log("Feedback Result:", feedback);
    if (feedback.length === 0) {
      return res.status(200).json([]); 
    }

    return res.status(200).json(feedback);
  });
};


