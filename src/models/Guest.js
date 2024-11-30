const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Links guest to an event
    primaryGuestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', default: null }, // Links to primary guest if part of a group
    name: { type: String, required: true },
    email: { type: String }, // Optional for guests
    phone: { type: String }, // Optional for guests
    rsvpStatus: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' },
    dietaryPreferences: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Guest', guestSchema);
