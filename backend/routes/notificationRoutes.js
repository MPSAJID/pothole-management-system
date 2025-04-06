const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addNotification, getUserNotifications, markNotificationAsRead } = require('../controllers/notificationController');

router.post('/add', authMW, addNotification);
router.get('/:user_id', authMW, getUserNotifications);
router.put('/read/:id', authMW, markNotificationAsRead);

module.exports = router;
