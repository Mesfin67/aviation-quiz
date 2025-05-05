const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Route with username normalization
router.post('/signup', async (req, res) => {
  let { username, password } = req.body;
  try {
    // Normalize the username by trimming extra spaces (and optionally lowercasing)
    username = username.trim();
    // Optionally, you can force username to lowercase:
    // username = username.toLowerCase();

    // Check if this username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Successfully signed up. Please login.' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
});

// Login Route with enhanced logging and normalization
router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  console.log("Login attempt - Raw request body:", req.body);

  try {
    // Normalize username
    username = username.trim();
    // Optionally:
    // username = username.toLowerCase();

    // Try to find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      console.log("No user found for username:", username);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    console.log("Found user:", user.username);

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result for", username, ":", isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Sign the JWT token on a successful match
    const payload = { userId: user._id, username: user.username };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ error: 'Server error, please try again later.' });
      }
      console.log("JWT token generated for", username);
      res.json({ token, username: user.username });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
});

module.exports = router;
