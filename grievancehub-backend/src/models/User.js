const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: [150, 'Email cannot exceed 150 characters']
    },

    password_hash: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },

    role: {
        type: String,
        enum: ['employee', 'staff', 'manager', 'admin'],
        default: 'employee',
        required: true
    },

    department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
},

    is_active: {
        type: Boolean,
        default: true
    },

    profile_photo: {
        type: String,
        default: null
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ department_id: 1 });
UserSchema.index({ role: 1 });


// Hash password before saving
UserSchema.pre('save', async function() {

    if (!this.isModified('password_hash')) {
        return;
    }

    const salt = await bcrypt.genSalt(12);

    this.password_hash = await bcrypt.hash(
        this.password_hash,
        salt
    );

});


// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {

    return await bcrypt.compare(
        candidatePassword,
        this.password_hash
    );

};


// Remove password from JSON response
UserSchema.set('toJSON', {

    transform: function(doc, ret) {

        delete ret.password_hash;
        delete ret.__v;

        return ret;
    }

});


module.exports = mongoose.models.User || mongoose.model('User', UserSchema);