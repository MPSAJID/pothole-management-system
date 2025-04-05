const { cloudinary, uploadToCloudinary } = require('../config/cloudinary');
const Repair = require('../models/repairModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');


exports.addRepair = (req, res) => {
  const repair = req.body;
  console.log(repair);
  Repair.addRepair(repair, async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows[0]);
    await Notification.addNotification(repair.worker_id, `You have been assigned a new repair task (Pothole ID: ${repair.pothole_id})`);

  });
};

exports.getRepairs = (req, res) => {
  Repair.getRepairs((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result.rows);
  });
};

exports.getWorkers = (req, res) => {
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


// Update Repair Status
exports.updateRepairStatus = async (req, res) => {
  const { repair_id } = req.params;
  const { repair_status, user_role } = req.body;
  console.log("Request received:", req.body);  // Log request body
  console.log("File received:", req.file);
  const image = req.file; // Assuming multer is used
  let imageUrl = null;

  try {

    if (user_role !== "worker") {
      return res.status(403).json({ error: "Only workers can update status" });
    }

    if (repair_status === 'completed' && !req.file) {
      return res.status(400).json({ message: "Missing required parameter - file" });
    }
    console.log("File Received:", req.file);
    console.log("Form Body:", req.body);

    if (repair_status === "completed" && image) {
      console.log("Uploading to Cloudinary...");
      imageUrl = await uploadToCloudinary(req.file.buffer);
      console.log("Cloudinary upload result:", imageUrl);
    }

    Repair.updateRepairStatus(repair_id, repair_status, imageUrl, async (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Repair not found" });
      }
      res.status(200).json({ message: "Repair status updated", repair: result.rows[0] });
      await Notification.addNotification(1, `Repair ID ${repair_id} status updated to ${repair_status}`);
    });
  } catch (error) {
    console.error("Error updating repair status:", error);
    res.status(500).json({ error: "Failed to update repair status" });
  }
};
