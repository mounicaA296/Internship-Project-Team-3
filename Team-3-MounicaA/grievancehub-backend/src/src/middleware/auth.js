const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();


const verifyToken = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }


        const token = authHeader.split(' ')[1];


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const user = await User.findById(decoded.user_id);


        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }


        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated.'
            });
        }


        req.user = {
            user_id: decoded.user_id,
            email: decoded.email,
            role: decoded.role,
            department_id: decoded.department_id
        };


        next();


    } catch (error) {


        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }


        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again.'
            });
        }


        console.error("Authentication error:", error);


        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication.'
        });

    }
};



// Role based authorization
const authorize = (...allowedRoles) => {

    return (req, res, next) => {


        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. User not authenticated.'
            });
        }


        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
            });

        }


        next();

    };

};



// Admin only
const isAdmin = (req, res, next) => {

    if (req.user.role !== 'admin') {

        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });

    }

    next();
};



// Manager or Admin
const isManagerOrAdmin = (req, res, next) => {


    if (!['admin', 'manager'].includes(req.user.role)) {

        return res.status(403).json({
            success: false,
            message: 'Access denied. Manager or Admin privileges required.'
        });

    }


    next();

};



module.exports = {
    verifyToken,
    authorize,
    isAdmin,
    isManagerOrAdmin
};