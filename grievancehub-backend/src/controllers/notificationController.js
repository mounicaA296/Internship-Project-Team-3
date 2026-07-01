const { Notification } = require('../models');

class NotificationController {

    // ============ GET USER NOTIFICATIONS ============
    static async getNotifications(req, res) {

        try {
console.log("req.user =", req.user);
            const userId = req.user.user_id;

            const {
                page = 1,
                limit = 20,
                unread_only = false
            } = req.query;


            const filter = {
                user_id: userId
            };


            if (unread_only === 'true') {

                filter.is_read = false;

            }


            const skip = (parseInt(page) - 1) * parseInt(limit);


            const total = await Notification.countDocuments(filter);


            const notifications = await Notification.find(filter)

                .populate('complaint_id', 'title')

                .sort({ created_at: -1 })

                .skip(skip)

                .limit(parseInt(limit));



            const unreadCount = await Notification.countDocuments({

                user_id:userId,

                is_read:false

            });



            return res.status(200).json({

                success:true,

                data:notifications,

                unread_count:unreadCount,

                pagination:{

                    total,

                    page:parseInt(page),

                    limit:parseInt(limit)

                }

            });


        } catch(error) {

            console.error(error);

            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ MARK AS READ ============
    static async markAsRead(req,res){

        try{

            const notification = await Notification.findOne({

                _id:req.params.id,

                user_id:req.user.user_id

            });


            if(!notification){

                return res.status(404).json({

                    success:false,

                    message:'Notification not found'

                });

            }


            notification.is_read=true;

            notification.read_at=new Date();


            await notification.save();



            return res.status(200).json({

                success:true,

                message:'Notification marked as read'

            });



        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ MARK ALL READ ============
    static async markAllAsRead(req,res){

        try{

            await Notification.updateMany(

                {
                    user_id:req.user.user_id,
                    is_read:false
                },

                {
                    is_read:true,
                    read_at:new Date()
                }

            );


            return res.status(200).json({

                success:true,

                message:'All notifications marked as read'

            });


        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ DELETE NOTIFICATION ============
    static async deleteNotification(req,res){

        try{


            const notification = await Notification.findOneAndDelete({

                _id:req.params.id,

                user_id:req.user.user_id

            });


            if(!notification){

                return res.status(404).json({

                    success:false,

                    message:'Notification not found'

                });

            }



            return res.status(200).json({

                success:true,

                message:'Notification deleted successfully'

            });


        }catch(error){

            console.error(error);


            return res.status(500).json({

                success:false,

                message:'Internal server error'

            });

        }

    }



    // ============ GET UNREAD COUNT ============
    static async getUnreadCount(req,res){

        try{

            const count = await Notification.countDocuments({

                user_id:req.user.user_id,

                is_read:false

            });


            return res.status(200).json({

                success:true,

                data:{
                    unread_count:count
                }

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



module.exports = NotificationController;