const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addFeedback, getFeedback } = require('../controllers/feedbackController');

router.post('/add', authMW, addFeedback);
router.get('/', authMW, getFeedback);

module.exports = router;
