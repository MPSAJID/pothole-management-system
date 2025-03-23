const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const { addRepair, getRepairs,getWorkers, getWorkerById } = require('../controllers/repairController');

router.get('/', authMW, getRepairs);
router.post('/assign', authMW, addRepair);
router.get('/workers', authMW, getWorkers);
router.get('/worker/:id', authMW, getWorkerById);


module.exports = router;
