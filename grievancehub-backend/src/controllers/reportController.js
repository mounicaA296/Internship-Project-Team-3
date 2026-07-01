const { Complaint, Department } = require('../models');
const mongoose = require('mongoose');
const moment = require('moment');

class ReportController {

    // ============ GENERATE COMPLAINT REPORT ============
    static async generateComplaintsReport(req, res) {

        try {

            if (!['admin','manager'].includes(req.user.role)) {

                return res.status(403).json({

                    success:false,

                    message:'Only admin or manager can generate reports'

                });

            }


            const {
                from_date,
                to_date,
                department_id
            } = req.query;


            let filter = {};


            if(from_date){

                filter.created_at = {

                    $gte:new Date(from_date)

                };

            }


            if(to_date){

                filter.created_at = {

                    ...filter.created_at,

                    $lte:new Date(to_date)

                };

            }


            if(department_id){

                filter.dept_id =
                    new mongoose.Types.ObjectId(department_id);

            }



            if(req.user.role === 'manager' && req.user.department_id){

                filter.dept_id =
                    new mongoose.Types.ObjectId(req.user.department_id);

            }



            const totalComplaints =
                await Complaint.countDocuments(filter);



            const complaints =
                await Complaint.find(filter)

                .populate('dept_id','dept_name')

                .populate('status_id','label')

                .populate('raised_by','full_name email');



            return res.status(200).json({

                success:true,

                data:{

                    total_complaints:totalComplaints,

                    complaints

                }

            });


        } catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }




    // ============ SLA REPORT ============
    static async generateSLAReport(req,res){

        try{


            if(!['admin','manager'].includes(req.user.role)){

                return res.status(403).json({

                    success:false,

                    message:'Permission denied'

                });

            }



            const complaints =
                await Complaint.find({})
                .populate('dept_id','dept_name');



            return res.status(200).json({

                success:true,

                data:complaints

            });



        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }




    // ============ EXPORT REPORT ============
    static async exportReport(req,res){

        try{


            if(!['admin','manager'].includes(req.user.role)){

                return res.status(403).json({

                    success:false,

                    message:'Permission denied'

                });

            }



            const complaints =
                await Complaint.find({})

                .populate('dept_id','dept_name')

                .populate('status_id','label');



            return res.status(200).json({

                success:true,

                data:complaints

            });



        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }

}



module.exports = ReportController;