const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/profile', authMiddleware, getUserProfile); // Get user profile
router.patch('/profile', authMiddleware, updateUserProfile); // Update user profile

module.exports = router;
