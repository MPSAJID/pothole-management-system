const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW');
const roleMW = require('../middleware/roleMW');
const { reportPothole, getPotholes, updateStatus } = require('../controllers/potholeController');

router.get('/', authMW, getPotholes);
router.post('/report', authMW,roleMW(['citizen', 'admin']), reportPothole);
router.put('/:id/status', authMW,roleMW(['admin', 'Worker']), updateStatus);

module.exports = router;
