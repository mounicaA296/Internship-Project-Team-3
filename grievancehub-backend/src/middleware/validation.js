const { body, param, query, validationResult } = require('express-validator');

// Complaint validation
const validateComplaint = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required'),

    body('priority')
        .optional()
        .isIn(['High', 'Medium', 'Low']).withMessage('Invalid priority'),

    body('dept_id')
        .notEmpty().withMessage('Department is required')
        .isMongoId().withMessage('Invalid Department ID'),

    body('status_id')
        .notEmpty().withMessage('Status is required')
        .isMongoId().withMessage('Invalid Status ID'),

    body('location')
        .optional()
        .trim()
        .isLength({ max: 150 }).withMessage('Location cannot exceed 150 characters'),

    body('incident_date')
        .optional()
        .isISO8601().withMessage('Invalid incident date')
];

// Validation result
const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    validateComplaint,
    validateResult
};