const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        required: true,
    },
    salary: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' },
    },
    skills: [String],
    experienceLevel: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'lead'],
    },
    category: String,
    deadline: Date,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
