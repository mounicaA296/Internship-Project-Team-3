const { Complaint, Department, Status } = require('../models');
const mongoose = require('mongoose');

class DashboardController {

    // ============ GET DASHBOARD STATS ============
    static async getStats(req, res) {
        try {
            const userId = req.user.user_id;
            const userRole = req.user.role;
            const userDepartment = req.user.department_id;

            let filter = {};

            // Role-based filtering
            if (userRole === 'employee') {
                filter.raised_by = new mongoose.Types.ObjectId(userId);
            } else if (userRole === 'manager' && userDepartment) {
                filter.dept_id = new mongoose.Types.ObjectId(userDepartment);
            }

            const statuses = await Status.find({});

            const statusCounts = await Complaint.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: '$status_id',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const statusMap = {};

            statuses.forEach(status => {
                statusMap[status._id.toString()] = {
                    label: status.label,
                    color: status.color_code,
                    count: 0
                };
            });

            statusCounts.forEach(item => {
                if (statusMap[item._id.toString()]) {
                    statusMap[item._id.toString()].count = item.count;
                }
            });

            const total = Object.values(statusMap)
                .reduce((sum, status) => sum + status.count, 0);

            const recentComplaints = await Complaint.find(filter)
                .sort({ created_at: -1 })
                .limit(5)
                .populate('raised_by', 'full_name email')
                .populate('dept_id', 'dept_name')
                .populate('status_id', 'label color_code')

            let departmentStats = [];

            if (userRole === 'admin' || userRole === 'manager') {

                const departments = await Department.find({});

                departmentStats = await Promise.all(
                    departments.map(async dept => {

                        const count = await Complaint.countDocuments({
                            dept_id: dept._id,
                            ...filter
                        });

                        return {
                            dept_id: dept._id,
                            department_name: dept.dept_name,
                            total_complaints: count
                        };
                    })
                );
            }


            const priorityCounts = await Complaint.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: '$priority',
                        count: { $sum: 1 }
                    }
                }
            ]);


            const priorityDistribution = {
                High: 0,
                Medium: 0,
                Low: 0
            };


            priorityCounts.forEach(item => {

                if (item._id in priorityDistribution) {
                    priorityDistribution[item._id] = item.count;
                }

            });


            return res.status(200).json({

                success: true,

                data: {

                    total,

                    status_breakdown: Object.values(statusMap),

                    recent_complaints: recentComplaints.map(c => ({
                        complaint_id: c._id,
                        title: c.title,

                        status: c.status_id
                            ? {
                                label: c.status_id.label,
                                color: c.status_id.color_code
                            }
                            : null,

                        department: c.dept_id
                            ? c.dept_id.dept_name
                            : null,

                        raised_by: c.raised_by
                            ? c.raised_by.full_name
                            : null,

                        priority: c.priority,
                        created_at: c.created_at
                    })),

                    department_stats: departmentStats,

                    priority_distribution: priorityDistribution,

                    user_role: userRole
                }

            });


        } catch (error) {

            console.error('Dashboard stats error:', error);

            return res.status(500).json({

                success: false,

                message: 'Internal server error while fetching dashboard stats'

            });

        }
    }



    // ============ GET RECENT COMPLAINTS ============

    static async getRecentComplaints(req, res) {

        try {

            const { limit = 10 } = req.query;

            const userId = req.user.user_id;
            const userRole = req.user.role;
            const userDepartment = req.user.department_id;


            let filter = {};


            if (userRole === 'employee') {

                filter.raised_by = new mongoose.Types.ObjectId(userId);

            } 
            else if (userRole === 'manager' && userDepartment) {

                filter.dept_id = new mongoose.Types.ObjectId(userDepartment);

            }



            const complaints = await Complaint.find(filter)

                .sort({ created_at: -1 })

                .limit(parseInt(limit))

                .populate('raised_by', 'full_name email')

                .populate('dept_id', 'dept_name')

                .populate('status_id', 'label color_code')



            return res.status(200).json({

                success: true,

                data: complaints

            });


        } catch(error) {

            console.error(error);

            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }
static async getDepartmentStats(req, res) {
    try {

        const departments = await Department.find({});

        const departmentStats = await Promise.all(
            departments.map(async (dept) => {

                const count = await Complaint.countDocuments({
                    dept_id: dept._id
                });

                return {
                    dept_id: dept._id,
                    department_name: dept.dept_name,
                    total_complaints: count
                };

            })
        );

        return res.status(200).json({
            success: true,
            data: departmentStats
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
}

module.exports = DashboardController;