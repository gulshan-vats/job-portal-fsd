const Company = require('../models/Company');

// @desc    Create a new company
// @route   POST /api/companies
// @access  Private (Employer only)
const createCompany = async (req, res) => {
    const { name, website, description, location } = req.body;

    const companyExists = await Company.findOne({ name });

    if (companyExists) {
        return res.status(400).json({ message: 'Company already exists' });
    }

    const company = await Company.create({
        name,
        website,
        description,
        location,
        owner: req.user._id,
    });

    if (company) {
        res.status(201).json(company);
    } else {
        res.status(400).json({ message: 'Invalid company data' });
    }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
    const companies = await Company.find({}).populate('owner', 'name email');
    res.json(companies);
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
    const company = await Company.findById(req.params.id).populate('owner', 'name email');

    if (company) {
        res.json(company);
    } else {
        res.status(404).json({ message: 'Company not found' });
    }
};

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private (Owner only)
const updateCompany = async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (company) {
        if (company.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this company' });
        }

        company.name = req.body.name || company.name;
        company.website = req.body.website || company.website;
        company.description = req.body.description || company.description;
        company.location = req.body.location || company.location;

        const updatedCompany = await company.save();
        res.json(updatedCompany);
    } else {
        res.status(404).json({ message: 'Company not found' });
    }
};

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private (Owner only)
const deleteCompany = async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (company) {
        if (company.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this company' });
        }

        await company.deleteOne();
        res.json({ message: 'Company removed' });
    } else {
        res.status(404).json({ message: 'Company not found' });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};
