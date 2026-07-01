const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/auth');


// Generate complaints report
router.get(
    '/complaints',
    authenticate,
    ReportController.generateComplaintsReport
);


// Generate SLA report
router.get(
    '/sla',
    authenticate,
    ReportController.generateSLAReport
);


// Export report
router.get(
    '/export',
    authenticate,
    ReportController.exportReport
);


module.exports = router;