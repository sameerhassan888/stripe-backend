const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered. Please login or use a different email.' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'Registration successful',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed. Please try again later.' });
  }
};


// Login with an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }

    // Remove sensitive user data before sending the response
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      // Include any other non-sensitive user data you want to send
    };
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

//fetch users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

module.exports = {
  register,
  login,
  getUsers, // Add this line to export the getUsers function
};