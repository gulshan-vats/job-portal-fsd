const express = require('express');
const { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getCompanies)
    .post(protect, authorize('employer', 'admin'), createCompany);

router.route('/:id')
    .get(getCompanyById)
    .put(protect, authorize('employer', 'admin'), updateCompany)
    .delete(protect, authorize('employer', 'admin'), deleteCompany);

module.exports = router;
