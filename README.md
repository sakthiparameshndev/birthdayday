# AK Bridal Works - Full Stack Application

This is a full-stack web application for AK Bridal Works, featuring a frontend built with HTML/CSS/JavaScript and a backend built with Node.js, Express, and MongoDB.

## Deployment Instructions for Render

### Backend Deployment (Web Service)

1. **Create a new Web Service on Render:**
   - Go to https://render.com/ and sign in to your account
   - Click "New" and select "Web Service"
   - Connect your GitHub repository or upload your code
   - Set the following configuration:
     - **Name**: ak-bridal-works-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Root Directory**: `BACKEND`
     - **Plan**: Free or any plan of your choice

2. **Add Environment Variables:**
   - In the "Advanced" section, add the following environment variable:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
       (Example: `mongodb+srv://username:password@cluster0.ro1wtbz.mongodb.net/database-name?retryWrites=true&w=majority`)

3. **Deploy:**
   - Click "Create Web Service" to start the deployment
   - Wait for the deployment to complete

### Frontend Deployment (Static Site)

The frontend is served directly by the backend, so you don't need to deploy it separately as a static site. The backend already serves all frontend files from the `FRONTEND` directory.

### Post-Deployment

After deployment, your application will be accessible at the URL provided by Render (e.g., `https://ak-bridal-works-backend.onrender.com`).

All API calls from the frontend will automatically connect to the backend since they use relative URLs (e.g., `/api/reviews`).

### Notes

- The backend runs on port 5500 in development but will automatically use the port provided by Render in production
- MongoDB connection is handled through the `MONGODB_URI` environment variable
- The admin user with username "aarthi" and password "aarthi2004" will be automatically created on first run if it doesn't exist
