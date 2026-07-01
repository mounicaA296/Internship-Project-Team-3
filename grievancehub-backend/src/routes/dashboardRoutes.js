const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

router.get(
    '/stats',
    authenticate,
    DashboardController.getStats
);

router.get(
    '/recent',
    authenticate,
    DashboardController.getRecentComplaints
);
router.get(
    '/departments',
    authenticate,
    DashboardController.getDepartmentStats
);
module.exports = router;