const Budget = require('../models/Budget');

// Get all budget items for an event
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ eventId: req.params.eventId });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budgets', error });
  }
};

// Add a budget item to an event
const addBudget = async (req, res) => {
  try {
    const { category, plannedAmount, actualAmount } = req.body;

    const budget = new Budget({
      eventId: req.params.eventId,
      category,
      plannedAmount,
      actualAmount: actualAmount || 0,
    });

    await budget.save();
    res.status(201).json({ message: 'Budget item added successfully', budget });
  } catch (error) {
    res.status(500).json({ message: 'Error adding budget item', error });
  }
};

// Update a budget item
const updateBudget = async (req, res) => {
  try {
    const { category, plannedAmount, actualAmount } = req.body;

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: req.params.budgetId, eventId: req.params.eventId }, // Ensure budget item belongs to the event
      { category, plannedAmount, actualAmount },
      { new: true } // Return the updated document
    );

    if (!updatedBudget) return res.status(404).json({ message: 'Budget item not found' });

    res.json({ message: 'Budget item updated successfully', budget: updatedBudget });
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget item', error });
  }
};

// Delete a budget item
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findOneAndDelete({ _id: req.params.budgetId, eventId: req.params.eventId });

    if (!deletedBudget) return res.status(404).json({ message: 'Budget item not found' });

    res.json({ message: 'Budget item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget item', error });
  }
};

// Budget analytics for an event
const getBudgetAnalytics = async (req, res) => {
  try {
    const budgets = await Budget.find({ eventId: req.params.eventId });

    const totalPlanned = budgets.reduce((sum, budget) => sum + budget.plannedAmount, 0);
    const totalActual = budgets.reduce((sum, budget) => sum + budget.actualAmount, 0);

    const utilizationPercentage = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

    // Category breakdown
    const categoryBreakdown = budgets.map(budget => ({
      category: budget.category,
      plannedAmount: budget.plannedAmount,
      actualAmount: budget.actualAmount,
    }));

    res.json({
      totalPlanned,
      totalActual,
      utilizationPercentage: Math.round(utilizationPercentage),
      categoryBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget analytics', error });
  }
};

module.exports = { getBudgets, addBudget, updateBudget, deleteBudget, getBudgetAnalytics };
