const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addRepair, getRepairs } = require('../controllers/repairController');

router.post('/add', authMW, addRepair);
router.get('/', authMW, getRepairs);

module.exports = router;
