require('dotenv').config(); // Load env variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models
const Review = require('./models/Review');
const Consultation = require('./models/Consultation');
const Admin = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors({
  origin: ['https://ak-bridal-works-frontend.onrender.com', 'http://localhost:3000', 'http://127.0.0.1:3000']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Connecting to MongoDB:", MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');

    const adminExists = await Admin.findOne({ username: 'aarthi' });
    if (!adminExists) {
      const admin = new Admin({ username: 'aarthi', password: 'aarthi2004' });
      await admin.save();
      console.log('✅ Admin user created');
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes

// Save a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    const newReview = new Review({ name, rating, review });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// Save consultation message
app.post('/api/consultation', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newConsultation = new Consultation({ name, email, phone, message });
    await newConsultation.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin && admin.password === password) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false, message: 'Invalid credentials' });
    }
  } catch {
    res.status(500).json({ authenticated: false, message: 'Server error' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('✅ AK Bridal Works Backend is Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
