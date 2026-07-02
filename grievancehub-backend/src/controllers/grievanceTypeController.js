const { GrievanceType } = require('../models');

class GrievanceTypeController {

    // Get all grievance types
    static async getAll(req, res) {
        try {
            const types = await GrievanceType.find({ is_active: true })
                .sort({ sort_order: 1 });

            return res.status(200).json({
                success: true,
                data: types
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Create grievance type
    static async create(req, res) {
        try {
            const { type_name, sort_order } = req.body;

            if (!type_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Type name is required'
                });
            }

            const type = await GrievanceType.create({
                type_name,
                sort_order: sort_order || 0,
                is_active: true
            });

            return res.status(201).json({
                success: true,
                message: 'Grievance type created successfully',
                data: type
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update grievance type
    static async update(req, res) {
        try {
            const { id } = req.params;

            const type = await GrievanceType.findById(id);

            if (!type) {
                return res.status(404).json({
                    success: false,
                    message: 'Grievance type not found'
                });
            }

            const {
                type_name,
                is_active,
                sort_order
            } = req.body;

            if (type_name !== undefined)
                type.type_name = type_name;

            if (is_active !== undefined)
                type.is_active = is_active;

            if (sort_order !== undefined)
                type.sort_order = sort_order;

            await type.save();

            return res.status(200).json({
                success: true,
                message: 'Grievance type updated successfully',
                data: type
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Delete grievance type
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const type = await GrievanceType.findByIdAndDelete(id);

            if (!type) {
                return res.status(404).json({
                    success: false,
                    message: 'Grievance type not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Grievance type deleted successfully'
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

module.exports = GrievanceTypeController;