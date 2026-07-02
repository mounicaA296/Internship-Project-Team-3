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
            grievance_type_id,
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
            grievance_type_id,
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
            .populate('grievance_type_id', 'type_name')
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
            .populate('grievance_type_id', 'type_name')
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
const updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        const {
            title,
            description,
            priority,
            dept_id,
             grievance_type_id,
            status_id,
            location,
            incident_date
        } = req.body;

        complaint.title = title || complaint.title;
        complaint.description = description || complaint.description;
        complaint.priority = priority || complaint.priority;
        complaint.dept_id = dept_id || complaint.dept_id;
        complaint.grievance_type_id =
        grievance_type_id || complaint.grievance_type_id;
        complaint.status_id = status_id || complaint.status_id;
        complaint.location = location || complaint.location;
        complaint.incident_date = incident_date || complaint.incident_date;

        await complaint.save();

        res.status(200).json({
            success: true,
            message: 'Complaint updated successfully',
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
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        await Complaint.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Complaint deleted successfully'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
const addComment = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        const { message, is_internal } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Comment message is required'
            });
        }

        complaint.comments.push({
            user_id: req.user.user_id,
            message,
            is_internal: is_internal || false
        });

        await complaint.save();

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: complaint.comments[complaint.comments.length - 1]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
const getComments = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('comments.user_id', 'full_name email');

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        res.status(200).json({
            success: true,
            count: complaint.comments.length,
            comments: complaint.comments
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
const assignComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        const {
            assigned_to,
            due_date,
            priority_override,
            note
        } = req.body;

        if (!assigned_to || !due_date) {
            return res.status(400).json({
                success: false,
                message: 'assigned_to and due_date are required'
            });
        }

        complaint.assignments.push({
            assigned_to,
            assigned_by: req.user.user_id,
            due_date,
            priority_override,
            note
        });

        await complaint.save();

        res.status(200).json({
            success: true,
            message: 'Complaint assigned successfully',
            assignment: complaint.assignments[complaint.assignments.length - 1]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
const updateComplaintStatus = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            });
        }

        const { status_id } = req.body;

        if (!status_id) {
            return res.status(400).json({
                success: false,
                message: 'status_id is required'
            });
        }

        complaint.status_id = status_id;

        await complaint.save();

        res.status(200).json({
            success: true,
            message: 'Complaint status updated successfully',
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
const getDashboardStats = async (req, res) => {
    try {
        const totalComplaints = await Complaint.countDocuments();

        const statuses = await Status.find();

        const stats = {
            total: totalComplaints
        };

        for (const status of statuses) {
            const count = await Complaint.countDocuments({
                status_id: status._id
            });

            stats[status.label.toLowerCase().replace(/\s+/g, "_")] = count;
        }

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const searchComplaints = async (req, res) => {
    try {
        const {
            keyword,
            priority,
            dept_id,
            status_id
        } = req.query;

        let filter = {};

        if (keyword) {
            filter.$or = [
                {
                    title: {
                        $regex: keyword,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: 'i'
                    }
                }
            ];
        }

        if (priority) {
            filter.priority = priority;
        }

        if (dept_id) {
            filter.dept_id = dept_id;
        }

        if (status_id) {
            filter.status_id = status_id;
        }

        const complaints = await Complaint.find(filter)
           .populate('raised_by', 'full_name email')
            .populate('dept_id', 'dept_name')
            .populate('grievance_type_id', 'type_name')
            .populate('status_id', 'label color_code')
            .sort({
                created_at: -1
            });

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
    updateComplaint,
    deleteComplaint,
    addComment,
    getComments,
    assignComplaint,
    updateComplaintStatus,
    getDashboardStats,
    searchComplaints,
    uploadAttachment
};