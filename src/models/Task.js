const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Links task to an event
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'], // Task status options
      default: 'To Do',
    },
    dueDate: { type: Date }, // Optional due date for the task
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model('Task', taskSchema);
