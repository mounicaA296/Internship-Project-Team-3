const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Department name cannot exceed 100 characters']
    },

    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});


// Index
DepartmentSchema.index({ dept_name: 1 });


module.exports = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);