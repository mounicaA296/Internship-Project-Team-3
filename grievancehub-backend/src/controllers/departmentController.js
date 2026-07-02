const Department = require('../models/department');

// Create Department
const createDepartment = async (req, res) => {
    try {
        const { dept_name, manager_id, grievance_head_id } = req.body;

        const exists = await Department.findOne({ dept_name });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Department already exists'
            });
        }

        const department = await Department.create({
            dept_name,
            manager_id,
            grievance_head_id
        });

        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: department
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get All Departments
const getAllDepartments = async (req, res) => {
    try {

        const departments = await Department.find()
            .populate('manager_id', 'full_name email')
            .populate('grievance_head_id', 'full_name email')
            .sort({ dept_name: 1 });

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get Department By ID
const getDepartmentById = async (req, res) => {
    try {

        const department = await Department.findById(req.params.id)
            .populate('manager_id', 'full_name email')
            .populate('grievance_head_id', 'full_name email');

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        res.status(200).json({
            success: true,
            data: department
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Update Department
const updateDepartment = async (req, res) => {
    try {

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        const {
            dept_name,
            manager_id,
            grievance_head_id
        } = req.body;

        if (dept_name) department.dept_name = dept_name;
        if (manager_id) department.manager_id = manager_id;
        if (grievance_head_id) department.grievance_head_id = grievance_head_id;

        await department.save();

        res.status(200).json({
            success: true,
            message: 'Department updated successfully',
            data: department
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    try {

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        await Department.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Department deleted successfully'
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
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};