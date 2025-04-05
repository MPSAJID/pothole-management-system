const Pothole = require('../models/potholeModel');
const Notification = require('../models/notificationModel');

const { cloudinary, uploadToCloudinary } = require('../config/cloudinary');

exports.reportPothole = async (req, res) => {
  try {
    console.log("Request received:", req.body);  // Log request body
    console.log("File received:", req.file);    // Log file info
    console.log("User ID:", req.user?.id);      // Log user ID

    const { description, latitude, longitude, severity } = req.body;

    if (!req.user) {
      console.log("Unauthorized request - Missing user");
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
      console.log("Missing image file");
      return res.status(400).json({ error: 'Image is required' });
    }

    // Upload image to Cloudinary
    console.log("Uploading to Cloudinary...");
    const image_url = await uploadToCloudinary(req.file.buffer);
    console.log("Cloudinary upload result:", image_url);


    if (!description || !latitude || !longitude || !severity || !image_url) {
      console.log("Validation failed:", { description, latitude, longitude, severity, image_url });
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pothole = { description, image_url, latitude, longitude, severity, reported_by: req.user.id };

    // Use async/await instead of callback
    Pothole.reportPothole(pothole, async (err, dbResult) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Failed to report pothole' });
      }
      res.status(201).json({ message: 'Pothole reported successfully', pothole: dbResult.rows[0] });
      // Notify admin(s) - assuming admin user_id = 1 for now
      await Notification.addNotification(1, `New pothole reported`);

    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

exports.getPotholes = (req, res) => {
  Pothole.getAllPotholes((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};

exports.getPotholeinfo = (req, res) => {

  const potholeId = req.params.id;

  Pothole.getPotholeinfo(potholeId, (err, result) => {
    if (err) {
      console.error("Error fetching pothole:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pothole not found" });
    }
    res.json(result.rows[0]);
  });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  Pothole.updateStatus(id, status, async (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update status' });
    if (result.rowCount === 0) return res.status(404).json({ message: 'Pothole not found' });
    res.json({ message: 'Status updated successfully', pothole: result.rows[0] });

    const pothole = Pothole.getPotholeinfo(id); 
    if (pothole.rows.length > 0) {
      const reporterId = pothole.rows[0].reported_by;
      await Notification.addNotification(reporterId, `Your reported pothole (ID: ${pothole.pothole_d}) status is now "${pothole.status}"`);
    }
  });
};