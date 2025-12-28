# Backend Setup Guide

## Overview
This guide explains how to set up and run the backend server for managing services, blogs, and other data.

## Files Created

1. **backend-server-setup.js** - Complete standalone Express server
2. **backend-service-routes.js** - Service routes only (if you want to add to existing server)

## Prerequisites

Make sure you have these installed:
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)

## Installation

### 1. Install Dependencies

```bash
npm install express cors mongodb
```

Or if you need to install them separately:
```bash
npm install express
npm install cors
npm install mongodb
```

### 2. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Or if using MongoDB Compass, start from there
```

### 3. Start the Backend Server

```bash
node backend-server-setup.js
```

You should see:
```
✅ Connected to MongoDB
🚀 Backend server running on http://localhost:5000
📊 MongoDB: mongodb://localhost:27017/researchersdb

Available endpoints:
  GET    /api/services
  GET    /api/services/:slug
  POST   /api/services
  PUT    /api/services/:slug
  DELETE /api/services/:slug
  ...
```

## API Endpoints

### Services

#### Get All Services
```bash
GET http://localhost:5000/api/services
```

#### Get Service by Slug
```bash
GET http://localhost:5000/api/services/feasibility-studies
```

#### Create New Service
```bash
POST http://localhost:5000/api/services
Content-Type: application/json

{
  "title": "My Service",
  "slug": "my-service",
  "subTitle": "Professional service description",
  "description": "Detailed description",
  "content": "<div>HTML content here</div>",
  "category": "Consulting",
  "features": ["Feature 1", "Feature 2"],
  "benefits": ["Benefit 1", "Benefit 2"],
  "keywords": ["keyword1", "keyword2"],
  "image": "/services/my-service.jpg",
  "order": 1,
  "featured": true,
  "status": "active"
}
```

#### Update Service
```bash
PUT http://localhost:5000/api/services/my-service
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Service
```bash
DELETE http://localhost:5000/api/services/my-service
```

### Blogs

#### Get All Blogs
```bash
GET http://localhost:5000/api/blogs
```

#### Create Blog
```bash
POST http://localhost:5000/api/blogs
Content-Type: application/json

{
  "title": "Blog Title",
  "slug": "blog-title",
  "excerpt": "Blog excerpt",
  "content": "Full blog content",
  "author": "John Doe",
  "category": "Technology",
  "tags": ["tech", "innovation"]
}
```

### Other Endpoints

- **Contact**: `POST /api/contact`
- **Newsletter**: `POST /api/newsletter`
- **Testimonials**: `GET /api/testimonials`
- **Case Studies**: `GET /api/case-studies`

## Database Structure

The backend uses MongoDB with the following collections:

- **services** - All service pages
- **blogs** - Blog posts
- **contacts** - Contact form submissions
- **newsletter** - Newsletter subscriptions
- **testimonials** - Client testimonials
- **caseStudies** - Case study entries

## Using the Admin Panel

1. Start the backend server:
   ```bash
   node backend-server-setup.js
   ```

2. Start your Next.js frontend:
   ```bash
   npm run dev
   ```

3. Open the admin panel:
   ```
   http://localhost:3000/admin/add-service
   ```

4. Fill in the form and submit - the service will be:
   - Saved to MongoDB
   - Displayed as a card on `/services`
   - Available as a page at `/services/[your-slug]`

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
net start MongoDB
```

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the port in backend-server-setup.js
```javascript
const PORT = 5001; // Use a different port
```

### CORS Errors
Make sure the backend has CORS enabled:
```javascript
app.use(cors());
```

## Running in Production

For production, use PM2 or similar process manager:

```bash
# Install PM2
npm install -g pm2

# Start backend
pm2 start backend-server-setup.js --name "researchers-backend"

# Monitor
pm2 monit

# View logs
pm2 logs researchers-backend
```

## Environment Variables (Optional)

Create a `.env` file:
```
MONGO_URI=mongodb://localhost:27017
DB_NAME=researchersdb
PORT=5000
```

Then update backend-server-setup.js:
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'researchersdb';
```

## Testing the Backend

You can test endpoints using:

### Using curl
```bash
# Get all services
curl http://localhost:5000/api/services

# Get specific service
curl http://localhost:5000/api/services/feasibility-studies

# Create service
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Service","slug":"test-service","subTitle":"Test","description":"Test desc","content":"<div>Test</div>"}'
```

### Using Postman
1. Import the endpoints
2. Set method (GET, POST, PUT, DELETE)
3. Add JSON body for POST/PUT requests
4. Send request

## Next Steps

1. ✅ Backend server is ready
2. ✅ Admin panel is ready at `/admin/add-service`
3. ✅ Services are dynamically loaded from MongoDB
4. ✅ Add services via the admin form
5. 📝 Consider adding authentication for admin routes
6. 📝 Add image upload functionality
7. 📝 Create admin dashboard for managing all services
