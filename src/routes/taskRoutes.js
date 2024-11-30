const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true }); // Merge params to access `eventId`

// Routes for managing tasks
router.get('/', authMiddleware, getTasks); // Get all tasks for an event
router.post('/', authMiddleware, addTask); // Add a task to an event
router.put('/:taskId', authMiddleware, updateTask); // Update a task
router.delete('/:taskId', authMiddleware, deleteTask); // Delete a task

module.exports = router;
