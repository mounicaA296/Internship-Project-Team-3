const { User, ActivityLog } = require('../models');

class UserController {

    // ============ GET USER PROFILE ============
    static async getProfile(req, res) {

        try {

            const userId = req.user.user_id;

            const user = await User.findById(userId)
                .populate('department_id', 'dept_name');


            if (!user) {

                return res.status(404).json({

                    success:false,
                    message:'User not found'

                });

            }


            return res.status(200).json({

                success:true,

                data:user

            });


        } catch(error) {

            console.error(error);

            return res.status(500).json({

                success:false,
                message:'Internal server error'

            });

        }

    }



    // ============ UPDATE USER PROFILE ============
    static async updateProfile(req,res){

        try {

            const userId=req.user.user_id;

            const {
                full_name,
                email,
                phone,
                department_id
            }=req.body;


            const user=await User.findById(userId);


            if(!user){

                return res.status(404).json({

                    success:false,
                    message:'User not found'

                });

            }


            if(full_name) user.full_name=full_name;
            if(email) user.email=email;
            if(phone) user.phone=phone;
            if(department_id) user.department_id=department_id;


            await user.save();



            await ActivityLog.create({

                user_id:userId,

                action:'updated',

                description:'User profile updated',

                ip_address:req.ip,

                user_agent:req.headers['user-agent']

            });



            return res.status(200).json({

                success:true,

                message:'Profile updated successfully',

                data:user

            });



        }catch(error){

            console.error(error);

            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ GET ALL USERS ============
    static async getAllUsers(req,res){

        try{


            if(req.user.role!=='admin'){

                return res.status(403).json({

                    success:false,

                    message:'Admin privileges required'

                });

            }



            const users=await User.find({})
                .populate('department_id','dept_name');


            return res.status(200).json({

                success:true,

                data:users

            });


        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ UPDATE USER ROLE ============
    static async updateUserRole(req,res){

        try{

            if(req.user.role!=='admin'){

                return res.status(403).json({

                    success:false,

                    message:'Admin privileges required'

                });

            }


            const user=await User.findById(req.params.id);


            if(!user){

                return res.status(404).json({

                    success:false,

                    message:'User not found'

                });

            }


            user.role=req.body.role;

            await user.save();



            return res.status(200).json({

                success:true,

                message:'User role updated',

                data:user

            });



        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ TOGGLE USER STATUS ============
    static async toggleUserStatus(req,res){

        try{

            if(req.user.role!=='admin'){

                return res.status(403).json({

                    success:false,

                    message:'Admin privileges required'

                });

            }


            const user=await User.findById(req.params.id);


            if(!user){

                return res.status(404).json({

                    success:false,

                    message:'User not found'

                });

            }


            user.is_active=!user.is_active;


            await user.save();



            return res.status(200).json({

                success:true,

                message:'User status updated',

                data:user

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



module.exports = UserController;