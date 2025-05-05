const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const questionsRouter = require('./routes/questions');

dotenv.config();
connectDB();

const app = express();

app.use(cors("*"));
app.use(express.json());

// Connect to MongoDB – replace with your connection string.
mongoose.connect(process.env.MOGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB."))
  .catch(err => console.error(err));


// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
// Mount the questions API.
app.use('/api/questions', questionsRouter);
// Default route
app.get('/', (req, res) => {
  res.send('Aviation Quiz API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
