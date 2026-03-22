const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Seeker only)
const applyToJob = async (req, res) => {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: req.user._id,
    });

    if (alreadyApplied) {
        return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
        job: jobId,
        applicant: req.user._id,
        coverLetter,
        resume: req.user.resume, // Auto-attach from profile
    });

    res.status(201).json(application);
};

// @desc    Get my applications
// @route   GET /api/applications/my
// @access  Private (Seeker only)
const getMyApplications = async (req, res) => {
    const applications = await Application.find({ applicant: req.user._id })
        .populate({
            path: 'job',
            populate: { path: 'company', select: 'name logo' }
        })
        .sort({ createdAt: -1 });

    res.json(applications);
};

// @desc    Get applicants for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
const getJobApplicants = async (req, res) => {
    const job = await Job.findById(req.params.jobId);

    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
        .populate('applicant', 'name email profile resume')
        .sort({ createdAt: -1 });

    res.json(applications);
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Employer only)
const updateApplicationStatus = async (req, res) => {
    const { status, employerNote } = req.body;
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    if (application.job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    application.status = status || application.status;
    application.employerNote = employerNote || application.employerNote;

    const updatedApplication = await application.save();
    res.json(updatedApplication);
};

module.exports = {
    applyToJob,
    getMyApplications,
    getJobApplicants,
    updateApplicationStatus,
};
