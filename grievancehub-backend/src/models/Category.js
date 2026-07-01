const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Category name cannot exceed 100 characters']
    },
    category_code: {
        type: String,
        required: [true, 'Category code is required'],
        unique: true,
        trim: true,
        uppercase: true,
        maxlength: [20, 'Category code cannot exceed 20 characters']
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

CategorySchema.index({ category_name: 1 });
CategorySchema.index({ department_id: 1 });

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);