const mongoose = require('mongoose');

const LoginSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    login_at: {
        type: Date,
        default: Date.now
    },
    logout_at: {
        type: Date,
        default: null
    },
    device_type: {
        type: String,
        default: null
    },
    browser: {
        type: String,
        default: null
    },
    ip_address: {
        type: String,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('LoginSession', LoginSessionSchema);