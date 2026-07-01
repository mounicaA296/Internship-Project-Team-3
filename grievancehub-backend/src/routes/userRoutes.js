const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Get logged-in user profile
router.get(
    '/profile',
    authenticate,
    UserController.getProfile
);


// Update logged-in user profile
router.put(
    '/profile',
    authenticate,
    UserController.updateProfile
);


// Admin: Get all users
router.get(
    '/',
    authenticate,
    UserController.getAllUsers
);


// Admin: Update user role
router.put(
    '/:id/role',
    authenticate,
    UserController.updateUserRole
);


// Admin: Activate/deactivate user
router.put(
    '/:id/status',
 authenticate,
    UserController.toggleUserStatus
);


module.exports = router;