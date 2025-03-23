const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addFeedback, getFeedback } = require('../controllers/feedbackController');

router.get('/:pothole_id', authMW, getFeedback);
router.post('/add', authMW, addFeedback);

module.exports = router;
