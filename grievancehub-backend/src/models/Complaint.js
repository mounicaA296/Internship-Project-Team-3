const mongoose = require('mongoose');

// Assignment Sub-schema
const AssignmentSchema = new mongoose.Schema({
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    assigned_at: {
        type: Date,
        default: Date.now
    },

    due_date: {
        type: Date,
        required: true
    },

    priority_override: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: null
    },

    note: {
        type: String,
        default: null
    }
});


// Comment Sub-schema
const CommentSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true
    },

    is_internal: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});


// Attachment Sub-schema
const AttachmentSchema = new mongoose.Schema({

    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    file_name: {
        type: String,
        required: true,
        maxlength: [255, 'File name cannot exceed 255 characters']
    },

    file_path: {
        type: String,
        required: true,
        maxlength: [500, 'File path cannot exceed 500 characters']
    },

    file_size_kb: {
        type: Number,
        default: null
    },

    mime_type: {
        type: String,
        maxlength: [100, 'MIME type cannot exceed 100 characters'],
        default: null
    },

    uploaded_at: {
        type: Date,
        default: Date.now
    }
});


// Notification Sub-schema
const NotificationSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    type: {
        type: String,
        enum: [
            'assignment',
            'status_change',
            'comment',
            'sla_breach',
            'escalation'
        ],
        required: true
    },

    message: {
        type: String,
        required: true,
        maxlength: [500, 'Message cannot exceed 500 characters']
    },

    is_read: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});


// Audit Log Sub-schema
const AuditLogSchema = new mongoose.Schema({

    changed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    action: {
        type: String,
        required: true,
        maxlength: [100, 'Action cannot exceed 100 characters']
    },

    old_value: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    new_value: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    changed_at: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});


// Main Complaint Schema
const ComplaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },

    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
        required: true
    },

    raised_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },

    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },

    location: {
        type: String,
        maxlength: [150, 'Location cannot exceed 150 characters'],
        default: null
    },

    incident_date: {
        type: Date,
        default: null
    },

    assignments: [AssignmentSchema],

    comments: [CommentSchema],

    attachments: [AttachmentSchema],

    notifications: [NotificationSchema],

    audit_log: [AuditLogSchema],

    resolved_at: {
        type: Date,
        default: null
    },

    closed_at: {
        type: Date,
        default: null
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


// Indexes
ComplaintSchema.index({ status_id: 1 });
ComplaintSchema.index({ dept_id: 1 });
ComplaintSchema.index({ raised_by: 1 });
ComplaintSchema.index({ created_at: -1 });
ComplaintSchema.index({ 'assignments.due_date': 1 });
ComplaintSchema.index({ 'notifications.is_read': 1 });


// Virtual Complaint ID
ComplaintSchema.virtual('complaint_id').get(function() {
    return this._id.toString().slice(-6).toUpperCase();
});


const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;