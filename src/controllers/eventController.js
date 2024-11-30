const Event = require('../models/Event');

// Get all events for a user
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate } = req.body;

    const newEvent = new Event({
      userId: req.user.id, // Attach the logged-in user's ID
      title,
      description,
      location,
      startDate,
      endDate,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate } = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure the event belongs to the user
      { title, description, location, startDate, endDate },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
