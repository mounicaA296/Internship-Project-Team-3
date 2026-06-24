const { User, Department } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {

    // LOGIN
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

            const isPasswordValid = await user.comparePassword(password);

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

            const token = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
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
                token,
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
            console.error('Login error:', error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error while processing login'
            });
        }
    }


    // VERIFY TOKEN
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