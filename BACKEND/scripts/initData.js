const fs = require('fs');
const path = require('path');

// Data directory
const dataDir = path.join(__dirname, '../data');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize contact messages
const contactMessagesFile = path.join(dataDir, 'contactMessages.json');
if (!fs.existsSync(contactMessagesFile)) {
  fs.writeFileSync(contactMessagesFile, JSON.stringify([
    {
      id: 1,
      name: "Sample Contact",
      email: "sample@example.com",
      phone: "123-456-7890",
      message: "This is a sample contact message.",
      date: new Date().toISOString()
    }
  ], null, 2));
}

// Initialize gallery images
const galleryImagesFile = path.join(dataDir, 'galleryImages.json');
if (!fs.existsSync(galleryImagesFile)) {
  fs.writeFileSync(galleryImagesFile, JSON.stringify([
    {
      id: 1,
      name: "Sample Image 1",
      url: "images/DSC00014.JPG"
    },
    {
      id: 2,
      name: "Sample Image 2",
      url: "images/DSC00084.JPG"
    },
    {
      id: 3,
      name: "Sample Image 3",
      url: "images/DSC00055.JPG"
    }
  ], null, 2));
}

// Initialize gallery videos
const galleryVideosFile = path.join(dataDir, 'galleryVideos.json');
if (!fs.existsSync(galleryVideosFile)) {
  fs.writeFileSync(galleryVideosFile, JSON.stringify([
    {
      id: 1,
      name: "Sample Video 1",
      url: "Reel videos/reel1.mp4"
    },
    {
      id: 2,
      name: "Sample Video 2",
      url: "Reel videos/reel2.mp4"
    },
    {
      id: 3,
      name: "Sample Video 3",
      url: "Reel videos/reel3.mp4"
    }
  ], null, 2));
}

// Initialize reviews
const reviewsFile = path.join(dataDir, 'reviews.json');
if (!fs.existsSync(reviewsFile)) {
  fs.writeFileSync(reviewsFile, JSON.stringify([
    {
      id: 1,
      name: "Sample Reviewer",
      rating: 5,
      review: "This is a sample review.",
      date: new Date().toISOString()
    }
  ], null, 2));
}

// Initialize admin
const adminFile = path.join(dataDir, 'admin.json');
if (!fs.existsSync(adminFile)) {
  fs.writeFileSync(adminFile, JSON.stringify([
    {
      username: "aarthi",
      password: "aarthi2004"
    }
  ], null, 2));
}

console.log('Data files initialized successfully!');
