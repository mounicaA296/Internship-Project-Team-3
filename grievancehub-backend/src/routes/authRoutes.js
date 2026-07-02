const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Login route
router.post('/login', AuthController.login);

// Signup route
router.post('/register', AuthController.register);

// Verify token route
router.get('/verify', authenticate, AuthController.verifyToken);

// Logout route
// Logout route
router.post('/logout', authenticate, AuthController.logout);

module.exports = router;