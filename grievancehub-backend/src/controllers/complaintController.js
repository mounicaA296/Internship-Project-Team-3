const Complaint = require('../models/complaint');
const Status = require('../models/status');
const Department = require('../models/department');
const User = require('../models/user');

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dept_id,
            status_id,
            location,
            incident_date
        } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
            priority: priority || 'Medium',
            raised_by: req.user.user_id,
            dept_id,
            status_id,
            location,
            incident_date
        });

        res.status(201).json({
            success: true,
            message: 'Complaint created successfully',
            data: complaint
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate('raised_by', 'full_name email')
            .populate('dept_id', 'dept_name')
            .populate('status_id', 'label color_code')
            .sort({ created_at: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
// Get complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('raised_by', 'full_name email')
            .populate('dept_id', 'dept_name')
            .populate('status_id', 'label color_code');

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        res.status(200).json({
            success: true,
            data: complaint
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Temporary upload function
const uploadAttachment = async (req, res) => {
    try {
        // Find the complaint
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Add file details to the attachments array
        complaint.attachments.push({
            uploaded_by: req.user.user_id,
            file_name: req.file.originalname,
            file_path: req.file.path,
            file_size_kb: Math.round(req.file.size / 1024),
            mime_type: req.file.mimetype
        });

        // Save the updated complaint
        await complaint.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Attachment uploaded successfully',
            attachment: complaint.attachments[complaint.attachments.length - 1]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    uploadAttachment
};