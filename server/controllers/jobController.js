const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Employer only)
const createJob = async (req, res) => {
    const { title, description, company, location, type, salary, skills, experienceLevel, category, deadline } = req.body;

    const job = await Job.create({
        title,
        description,
        company,
        location,
        type,
        salary,
        skills,
        experienceLevel,
        category,
        deadline,
        postedBy: req.user._id,
    });

    if (job) {
        res.status(201).json(job);
    } else {
        res.status(400).json({ message: 'Invalid job data' });
    }
};

// @desc    Get all jobs (with search and filters)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    const { keyword, location, type, minSalary, experienceLevel, category, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = { isActive: true };

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
        ];
    }

    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    if (category) query.category = category;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (minSalary) query['salary.min'] = { $gte: Number(minSalary) };

    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
        .populate('company', 'name logo location')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

    res.json({
        jobs,
        page: Number(page),
        pages: Math.ceil(totalJobs / limit),
        totalJobs,
    });
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id).populate('company', 'name logo description website location');

    if (job) {
        res.json(job);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only)
const updateJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this job' });
        }

        Object.assign(job, req.body);
        const updatedJob = await job.save();
        res.json(updatedJob);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only)
const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};
