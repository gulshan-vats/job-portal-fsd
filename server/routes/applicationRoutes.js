const express = require('express');
const { applyToJob, getMyApplications, getJobApplicants, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('seeker'), applyToJob);
router.get('/my', protect, authorize('seeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplicants);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;
