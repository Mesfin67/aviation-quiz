const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., GC, AV, AF, PP
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: String }
    }
  ],
  time: { type: Number, default: 60 } // time limit (in seconds)
});

module.exports = mongoose.model('Quiz', QuizSchema);
