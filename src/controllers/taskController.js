const Task = require('../models/Task');

// Get all tasks for an event
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ eventId: req.params.eventId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Add a task to an event
const addTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = new Task({
      eventId: req.params.eventId,
      title,
      description,
      status: status || 'To Do',
      dueDate,
    });

    await task.save();
    res.status(201).json({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId, eventId: req.params.eventId }, // Ensure task belongs to the event
      { title, description, status, dueDate },
      { new: true } // Return the updated document
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.taskId, eventId: req.params.eventId });

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
