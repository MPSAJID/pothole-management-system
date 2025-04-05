const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const authMW = require('../middleware/authMW');
const { addRepair, getRepairs,getWorkers, getWorkerById,updateRepairStatus } = require('../controllers/repairController');
const roleMW = require('../middleware/roleMW');

router.get('/', authMW, getRepairs);
router.post('/assign', authMW, addRepair);
router.get('/workers', authMW, getWorkers);
router.get('/worker/:id', authMW, getWorkerById);
router.put('/:repair_id/status',authMW,roleMW(['worker']),upload.single('image'),updateRepairStatus);

module.exports = router;
