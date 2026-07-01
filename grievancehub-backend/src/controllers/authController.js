const { User, Department } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {

    // ===================== LOGIN =====================
    static async login(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const user = await User.findOne({ email })
                .select('+password_hash')
                .populate('department_id', 'dept_name');

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            if (!user.is_active) {
                return res.status(403).json({
                    success: false,
                    message: 'Your account has been deactivated. Please contact admin.'
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password_hash
            );
            

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            if (role && user.role !== role) {
                return res.status(403).json({
                    success: false,
                    message: `Invalid role. You are logged in as ${user.role}`
                });
            }

            await User.findByIdAndUpdate(user._id, {
                last_login: new Date()
            });

            const token = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    department_id: user.department_id?._id || null
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE || '7d'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful!',
                token,
                user: {
                    user_id: user._id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    department: user.department_id?.dept_name || null,
                    avatar: user.profile_photo
                        ? user.profile_photo
                        : user.full_name
                              .split(' ')
                              .map(name => name[0])
                              .join('')
                              .toUpperCase()
                }
            });

        } catch (error) {
            console.error('Login error:', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error while processing login'
            });
        }
    }

    // ===================== REGISTER =====================
    static async register(req, res) {
        try {
            const {
                full_name,
                email,
                password,
                role = 'employee',
                department_id = null
            } = req.body;

            if (!full_name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, email, and password are required'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters'
                });
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // ✅ FIX: hash password correctly
            const user = await User.create({
    full_name,
    email,
    password_hash: password,
    role,
    department_id,
    is_active: true
});
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: {
                    user_id: user._id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('Register error:', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error while registering user'
            });
        }
    }

    // ===================== VERIFY TOKEN =====================
    static async verifyToken(req, res) {
        try {
            const user = await User.findById(req.user.user_id)
                .populate('department_id', 'dept_name');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Token is valid',
                user: {
                    user_id: user._id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    department: user.department_id?.dept_name || null,
                    avatar: user.profile_photo || null
                }
            });

        } catch (error) {
            console.error('Token verification error:', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = AuthController;