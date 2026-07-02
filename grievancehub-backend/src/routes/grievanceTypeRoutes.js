const express = require('express');
const router = express.Router();

const GrievanceTypeController = require('../controllers/grievanceTypeController');
const { authenticate } = require('../middleware/auth');

// Get all grievance types
router.get('/', authenticate, GrievanceTypeController.getAll);

// Create grievance type
router.post('/', authenticate, GrievanceTypeController.create);

// Update grievance type
router.put('/:id', authenticate, GrievanceTypeController.update);

// Delete grievance type
router.delete('/:id', authenticate, GrievanceTypeController.delete);

module.exports = router;