const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Links budget to an event
    category: { type: String, required: true }, // Expense category (e.g., transportation, food)
    plannedAmount: { type: Number, required: true }, // Budgeted amount
    actualAmount: { type: Number, default: 0 }, // Actual amount spent
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model('Budget', budgetSchema);
