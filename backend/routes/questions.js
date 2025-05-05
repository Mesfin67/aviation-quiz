const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET all questions or filter by subCourse (optional query parameter)
router.get('/', async (req, res) => {
  try {
    const { subCourse } = req.query;
    const filter = subCourse ? { subCourse: subCourse.toLowerCase() } : {};
    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single question by id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (insert) a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an existing question by id
router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a question by id
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
