const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  subCourse: { type: String, required: true }, // e.g., "gc001", "av003", etc.
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  // Store the time limit in minutes (for example, 60 means 60 minutes)
  timeLimit: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
