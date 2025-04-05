const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addNotification, getUserNotifications } = require('../controllers/notificationController');

router.post('/add', authMW, addNotification);
router.get('/:user_id', authMW, getUserNotifications);

module.exports = router;
