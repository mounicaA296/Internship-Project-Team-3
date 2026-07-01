const express = require('express');
const router = express.Router();

const ComplaintController = require('../controllers/complaintController');
const { authenticate } = require('../middleware/auth');

const {
    validateComplaint,
    validateResult
} = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');
router.get(
    '/dashboard/stats',
    authenticate,
    ComplaintController.getDashboardStats
);
router.get(
    '/search',
    authenticate,
    ComplaintController.searchComplaints
);
router.get(
    '/',
    authenticate,
    ComplaintController.getAllComplaints
);
router.get(
    '/:id',
    authenticate,
    ComplaintController.getComplaintById
);
router.put(
    '/:id',
    authenticate,
    validateComplaint,
    validateResult,
    ComplaintController.updateComplaint
);
router.delete(
    '/:id',
    authenticate,
    ComplaintController.deleteComplaint
);
router.post(
    '/:id/comments',
    authenticate,
    ComplaintController.addComment
);
router.get(
    '/:id/comments',
    authenticate,
    ComplaintController.getComments
);
router.post(
    '/:id/assign',
    authenticate,
    ComplaintController.assignComplaint
);
router.patch(
    '/:id/status',
    authenticate,
    ComplaintController.updateComplaintStatus
);
router.post(
    '/',
    authenticate,
    validateComplaint,
    validateResult,
    ComplaintController.createComplaint
);
router.post(
    '/:id/upload',
    authenticate,
    upload.single('attachment'),
    handleUploadError,
    ComplaintController.uploadAttachment
);
module.exports = router;