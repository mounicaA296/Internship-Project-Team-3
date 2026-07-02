const mongoose = require('mongoose');

const GrievanceTypeSchema = new mongoose.Schema({
    type_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 150
    },
    is_active: {
        type: Boolean,
        default: true
    },
    sort_order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

module.exports = mongoose.model('GrievanceType', GrievanceTypeSchema);