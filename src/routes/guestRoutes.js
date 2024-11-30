const express = require('express');
const { getGuests, addGuests, updateGuest, deleteGuest, getGuestById } = require('../controllers/guestController');
const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true }); // Merge params to access `eventId`

// Routes for managing guests
router.get('/', authMiddleware, getGuests); // Get all guests for an event
router.post('/', authMiddleware, addGuests); // Add a primary guest and group members
router.patch('/:guestId', authMiddleware, updateGuest); // Update guest details
router.delete('/:guestId', authMiddleware, deleteGuest); // Delete a guest
router.get('/:guestId', authMiddleware, getGuestById); //Get specific guest

module.exports = router;
