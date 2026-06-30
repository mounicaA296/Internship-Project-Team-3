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
    '/',
    authenticate,
    ComplaintController.getAllComplaints
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