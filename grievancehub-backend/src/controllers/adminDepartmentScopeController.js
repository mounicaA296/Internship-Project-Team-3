const { AdminDepartmentScope } = require('../models');

class AdminDepartmentScopeController {

    // Get all department assignments for an admin
    static async getByAdmin(req, res) {
        try {
            const { adminId } = req.params;

            const scopes = await AdminDepartmentScope.find({
                admin_id: adminId
            }).populate('dept_id', 'dept_name');

            return res.status(200).json({
                success: true,
                data: scopes
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Assign a department to an admin
    static async assignDepartment(req, res) {
        try {
            const { admin_id, dept_id } = req.body;

            if (!admin_id || !dept_id) {
                return res.status(400).json({
                    success: false,
                    message: 'admin_id and dept_id are required'
                });
            }

            const scope = await AdminDepartmentScope.create({
                admin_id,
                dept_id
            });

            return res.status(201).json({
                success: true,
                message: 'Department assigned successfully',
                data: scope
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Remove department assignment
    static async removeDepartment(req, res) {
        try {
            const { id } = req.params;

            const scope = await AdminDepartmentScope.findByIdAndDelete(id);

            if (!scope) {
                return res.status(404).json({
                    success: false,
                    message: 'Assignment not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Department assignment removed successfully'
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = AdminDepartmentScopeController;