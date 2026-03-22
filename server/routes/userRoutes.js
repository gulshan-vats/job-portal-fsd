const express = require('express');
const { getUserProfile, updateUserProfile, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, getUserById);

module.exports = router;
