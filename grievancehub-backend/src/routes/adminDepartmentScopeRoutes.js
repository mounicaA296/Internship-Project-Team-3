const express = require('express');
const router = express.Router();

const AdminDepartmentScopeController = require('../controllers/adminDepartmentScopeController');
const { authenticate } = require('../middleware/auth');

// Get all departments assigned to an admin
router.get('/:adminId', authenticate, AdminDepartmentScopeController.getByAdmin);

// Assign a department
router.post('/', authenticate, AdminDepartmentScopeController.assignDepartment);

// Remove a department assignment
router.delete('/:id', authenticate, AdminDepartmentScopeController.removeDepartment);

module.exports = router;