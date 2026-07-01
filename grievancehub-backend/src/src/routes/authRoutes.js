const express = require('express');
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();


router.post('/login', AuthController.login);


router.get('/verify', verifyToken, AuthController.verifyToken);


module.exports = router;