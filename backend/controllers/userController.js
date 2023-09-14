const User = require('../models/User');

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Exclude the password field
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass the user ID as a parameter

    // Find the user and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};

module.exports = {
  getUsers,
  deleteUser, // Add the new delete function to exports
};