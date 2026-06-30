const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({

    label: {
        type: String,
        required: [true, 'Status label is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Status label cannot exceed 50 characters']
    },

    color_code: {
        type: String,
        default: '#808080',
        match: [/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color code']
    },

    sort_order: {
        type: Number,
        default: 0
    }

});


// Index
StatusSchema.index({ label: 1 });


module.exports = mongoose.models.Status || mongoose.model('Status', StatusSchema);