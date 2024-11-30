const express = require('express');
const {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
  getBudgetById,
} = require('../controllers/budgetController');
const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true }); // Merge params to access `eventId`

// Routes for managing budgets
router.get('/', authMiddleware, getBudgets); // List all budgets for an event
router.get('/:budgetId', authMiddleware, getBudgetById); // Get specific budget item
router.post('/', authMiddleware, addBudget); // Add a budget item
router.patch('/:budgetId', authMiddleware, updateBudget); // Update a budget item
router.delete('/:budgetId', authMiddleware, deleteBudget); // Delete a budget item
router.get('/analytics', authMiddleware, getBudgetAnalytics); // Get budget analytics

module.exports = router;
