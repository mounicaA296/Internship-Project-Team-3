const mongoose = require('mongoose');

const AdminDepartmentScopeSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    assigned_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false
});

// Prevent duplicate department assignments for the same admin
AdminDepartmentScopeSchema.index(
    { admin_id: 1, dept_id: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    'AdminDepartmentScope',
    AdminDepartmentScopeSchema
);