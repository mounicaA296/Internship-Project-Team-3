const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departmentController');
const { authenticate } = require('../middleware/auth');

// Create department
router.post(
    '/',
    authenticate,
    DepartmentController.createDepartment
);

// Get all departments
router.get(
    '/',
    authenticate,
    DepartmentController.getAllDepartments
);

// Get department by ID
router.get(
    '/:id',
    authenticate,
    DepartmentController.getDepartmentById
);

// Update department
router.put(
    '/:id',
    authenticate,
    DepartmentController.updateDepartment
);

// Delete department
router.delete(
    '/:id',
    authenticate,
    DepartmentController.deleteDepartment
);

module.exports = router;