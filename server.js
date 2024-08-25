require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rateLimiter = require('./rateLimiter');
const { processTask } = require('./taskController');

const app = express();
app.use(express.json());

app.post('/api/v1/task', rateLimiter, processTask);

const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
