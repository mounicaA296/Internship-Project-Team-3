const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');


// Get user notifications
router.get(
    '/',
    authenticate,
    NotificationController.getNotifications
);


// Get unread notification count
router.get(
    '/unread-count',
    authenticate,
    NotificationController.getUnreadCount
);


// Get unread notification count
router.get(
    '/unread-count',
    authenticate,
    NotificationController.getUnreadCount
);


// Mark notification as read
router.put(
    '/:id/read',
    authenticate,
    NotificationController.markAsRead
);


// Mark all notifications as read
router.put(
    '/read-all',
    authenticate,
    NotificationController.markAllAsRead
);


// Delete notification
router.delete(
    '/:id',
    authenticate,
    NotificationController.deleteNotification
);


module.exports = router;