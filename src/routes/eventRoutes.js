const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const budgetRoutes = require('./budgetRoutes');
const guestRoutes = require('./guestRoutes');
const taskRoutes = require('./taskRoutes');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/', authMiddleware, getEvents); // Get all events for the logged-in user
router.get('/:id', authMiddleware, getEventById); // Get a specific event
router.post('/', authMiddleware, createEvent); // Create a new event
router.patch('/:id', authMiddleware, updateEvent); // Update an event
router.delete('/:id', authMiddleware, deleteEvent); // Delete an event


router.use('/:eventId/budgets', budgetRoutes);
router.use('/:eventId/tasks', taskRoutes);
router.use('/:eventId/guests', guestRoutes);


module.exports = router;
