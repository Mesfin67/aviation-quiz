const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// GET all quiz categories
router.get('/categories', authMiddleware, async (req, res) => {
  try {
    const categories = await Quiz.distinct('category');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a quiz by category (ex: GC, AV, AF, or PP)
router.get('/:category', authMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    const quiz = await Quiz.findOne({ category });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
