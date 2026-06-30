const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        default: null
    },
    type: {
        type: String,
        enum: ['assignment', 'status_change', 'comment', 'sla_breach', 'escalation'],
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: [255, 'Title cannot exceed 255 characters']
    },
    message: {
        type: String,
        required: true,
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    is_read: {
        type: Boolean,
        default: false,
        index: true
    },
    read_at: {
        type: Date,
        default: null
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

// Compound index for unread notifications
NotificationSchema.index({ user_id: 1, is_read: 1 });

module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);