const Guest = require('../models/Guest');

// Get all guests for an event
const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({ eventId: req.params.eventId });
    const groupedGuests = guests.reduce((acc, guest) => {
      if (!guest.primaryGuestId) {
        acc.push({
          primaryGuest: guest,
          groupMembers: guests.filter(g => String(g.primaryGuestId) === String(guest._id)),
        });
      }
      return acc;
    }, []);

    res.json(groupedGuests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guests', error });
  }
};

// Add a primary guest and group members
const addGuests = async (req, res) => {
  try {
    const { primaryGuest, groupMembers } = req.body;

    // Add primary guest
    const primaryGuestDoc = new Guest({
      eventId: req.params.eventId,
      name: primaryGuest.name,
      email: primaryGuest.email,
      phone: primaryGuest.phone,
      rsvpStatus: primaryGuest.rsvpStatus || 'Pending',
      dietaryPreferences: primaryGuest.dietaryPreferences || '',
    });

    await primaryGuestDoc.save();

    // Add group members if provided
    const groupDocs = [];
    if (groupMembers && groupMembers.length > 0) {
      for (const member of groupMembers) {
        groupDocs.push(
          new Guest({
            eventId: req.params.eventId,
            primaryGuestId: primaryGuestDoc._id,
            name: member.name,
            dietaryPreferences: member.dietaryPreferences || '',
            rsvpStatus: 'Pending',
          })
        );
      }
      await Guest.insertMany(groupDocs);
    }

    res.status(201).json({
      message: 'Guests added successfully',
      primaryGuest: primaryGuestDoc,
      groupMembers: groupDocs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding guests', error });
  }
};

// Update guest details
const updateGuest = async (req, res) => {
  try {
    const { name, rsvpStatus, dietaryPreferences } = req.body;

    const updatedGuest = await Guest.findOneAndUpdate(
      { _id: req.params.guestId, eventId: req.params.eventId },
      { name, rsvpStatus, dietaryPreferences },
      { new: true }
    );

    if (!updatedGuest) return res.status(404).json({ message: 'Guest not found' });

    res.json({ message: 'Guest updated successfully', guest: updatedGuest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating guest', error });
  }
};

// Delete a guest and their group members (if primary guest)
const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findOne({ _id: req.params.guestId, eventId: req.params.eventId });

    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    // If the guest is a primary guest, delete their group members as well
    if (!guest.primaryGuestId) {
      await Guest.deleteMany({ primaryGuestId: guest._id });
    }

    await guest.deleteOne();

    res.json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting guest', error });
  }
};

module.exports = { getGuests, addGuests, updateGuest, deleteGuest };
