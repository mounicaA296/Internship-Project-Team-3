const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Login route
router.post('/login', AuthController.login);

// Verify token route
router.get('/verify', authenticate, AuthController.verifyToken);

// Logout route
router.post('/logout', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;