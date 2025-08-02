const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import models
const Review = require('./models/Review');
const Consultation = require('./models/Consultation');
const Admin = require('./models/Admin');

const app = express();
const PORT = 5500;

// Middleware
app.use(cors({
  origin: 'https://ak-bridal-works-frontend.onrender.com'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../FRONTEND')));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sakthiparamesh:sakthi123@cluster0.ro1wtbz.mongodb.net/ak-bridal-works?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
})
.then(async () => {
  console.log('Connected to MongoDB Atlas');
  
  // Insert admin user if not exists
  const adminExists = await Admin.findOne({ username: 'aarthi' });
  if (!adminExists) {
    const admin = new Admin({
      username: 'aarthi',
      password: 'aarthi2004'
    });
    await admin.save();
    console.log('Admin user created');
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// API Routes

// POST /api/reviews - Save reviews from write_review.html
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    const newReview = new Review({ name, rating, review });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// GET /api/reviews - Fetch reviews to show in Reviews.html
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// POST /api/consultation - Save contact form submissions from contact.html
app.post('/api/consultation', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newConsultation = new Consultation({ name, email, phone, message });
    await newConsultation.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// POST /api/admin/login - Handle admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (admin && admin.password === password) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ authenticated: false, message: "Server error" });
  }
});

// Serve the main index.html for all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONTEND', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
