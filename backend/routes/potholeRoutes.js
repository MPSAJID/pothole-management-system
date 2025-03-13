const express = require('express');
const router = express.Router();
const authMW = require('../middleware/auth');
const { reportPothole, getPotholes, updateStatus } = require('../controllers/potholeController');

router.post('/report', authMW, reportPothole);
router.get('/', authMW, getPotholes);
router.put('/update/:id', authMW, updateStatus);

module.exports = router;
