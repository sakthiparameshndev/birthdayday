# AK Bridal Works Backend

This is the backend for the AK Bridal Works website, built with Node.js, Express, and MongoDB.

## Features

- RESTful API for reviews and consultation requests
- MongoDB integration for data storage
- CORS support for frontend integration
- Static file serving for frontend assets
- Admin login functionality

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. For production:
   ```
   npm start
   ```

## Environment Variables

- MONGODB_URI: MongoDB connection string (defaults to a hardcoded string if not provided)
- PORT: Port number for the server (default: 5500)

## API Endpoints

- POST /api/reviews - Submit a new review
- GET /api/reviews - Retrieve all reviews
- POST /api/consultation - Submit a consultation request
- POST /api/admin/login - Admin login

## MongoDB Connection

The application connects to MongoDB using the MONGODB_URI environment variable, with a fallback to a hardcoded connection string.

## Dependencies

- express - Web framework
- cors - Cross-origin resource sharing
- body-parser - Parse incoming request bodies
- mongoose - MongoDB object modeling

## Development Dependencies

- nodemon - Auto-restart server on file changes
