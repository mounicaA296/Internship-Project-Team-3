const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'created',
            'updated',
            'status_changed',
            'assigned',
            'commented',
            'attachment_added',
            'escalated',
            'resolved',
            'closed',
            'reopened'
        ]
    },
    old_value: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    new_value: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    description: {
        type: String,
        trim: true
    },
    ip_address: {
        type: String,
        default: null
    },
    user_agent: {
        type: String,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

// Compound index for audit trail
ActivityLogSchema.index({ complaint_id: 1, created_at: -1 });

// Prevent updates (immutable)
ActivityLogSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next(new Error('Activity log entries cannot be updated'));
    }
    next();
});
module.exports = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
