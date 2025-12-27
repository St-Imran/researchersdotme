# Adding Feasibility Studies Service - Setup Guide

## Overview
This guide will help you add the "Feasibility Studies" service to your application, served from MongoDB backend.

## Prerequisites
- MongoDB running (on same computer or accessible)
- Backend server running on port 5000
- Node.js and npm installed

## Step-by-Step Setup

### 1. Ensure MongoDB is Running

Check if MongoDB is running:
```powershell
# Check MongoDB service status
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB

# Or if using mongod directly
mongod --dbpath "C:\path\to\your\data"
```

### 2. Ensure Backend Server is Running

Your backend should be running on `http://localhost:5000`

Check if these endpoints exist:
- `GET http://localhost:5000/api/services` - List all services
- `GET http://localhost:5000/api/services/:slug` - Get service by slug
- `POST http://localhost:5000/api/services` - Create new service

### 3. Install Dependencies

```powershell
# If node-fetch is not installed
npm install node-fetch@2
```

### 4. Run the Script to Add Feasibility Studies

```powershell
node add-feasibility-studies-service.js
```

Expected output:
```
🚀 Adding Feasibility Studies service to backend...

✅ Feasibility Studies service added successfully!
📝 Service ID: 6584abc123def456789
🔗 Access at: http://localhost:3000/services/feasibility-studies
```

### 5. Verify the Service

1. **Check Backend API:**
   ```powershell
   # Test with PowerShell
   Invoke-RestMethod -Uri "http://localhost:5000/api/services/feasibility-studies"
   ```

2. **Check Frontend:**
   - Visit `http://localhost:3000/services`
   - You should see "Feasibility Studies" card
   - Click on it to view the full service page

### 6. View the Service Page

Navigate to: `http://localhost:3000/services/feasibility-studies`

You should see:
- Hero section with service title
- Comprehensive content from the researchers.me website
- Modern, themed styling matching your current design
- Call-to-action section

## Backend Implementation Required

If your backend doesn't have these endpoints yet, here's what you need:

### MongoDB Model (services.model.js)

```javascript
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: String,
  heading: String,
  subTitle: String,
  description: String,
  content: String,  // HTML content
  image: String,
  featured: { type: Boolean, default: false },
  features: [String],
  benefits: [String],
  keywords: [String],
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
```

### API Routes (services.routes.js)

```javascript
const express = require('express');
const router = express.Router();
const Service = require('./models/service.model');

// GET all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({ status: 'active' })
      .sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET service by slug
router.get('/services/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      slug: req.params.slug,
      status: 'active'
    });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new service
router.post('/services', async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
```

### Server Setup (server.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const servicesRoutes = require('./routes/services.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/researchersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api', servicesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## Troubleshooting

### Error: "Cannot find module 'node-fetch'"
```powershell
npm install node-fetch@2
```

### Error: "Failed to fetch"
- Ensure backend server is running on port 5000
- Check if MongoDB is running
- Verify CORS is enabled on backend

### Service not appearing on frontend
1. Clear browser cache
2. Restart Next.js dev server: `npm run dev`
3. Check browser console for errors
4. Verify service was added to database

### Check MongoDB directly
```powershell
# Connect to MongoDB
mongo

# Use database
use researchersdb

# List all services
db.services.find().pretty()

# Find feasibility studies service
db.services.findOne({ slug: "feasibility-studies" })
```

## Adding More Services

To add more services from researchers.me:

1. Fetch content from the source page
2. Modify `add-feasibility-studies-service.js` with new content
3. Change the service data object
4. Run the script

Or create a new script for each service:
```javascript
// add-another-service.js
const anotherService = {
  title: "Your Service Name",
  slug: "your-service-slug",
  // ... other fields
};

// Use same fetch logic to POST to backend
```

## Database Indexes (Optional but Recommended)

```javascript
// In MongoDB shell
use researchersdb

db.services.createIndex({ slug: 1 }, { unique: true })
db.services.createIndex({ category: 1 })
db.services.createIndex({ featured: 1 })
db.services.createIndex({ status: 1 })
db.services.createIndex({ order: 1 })
```

## Next Steps

1. ✅ Add Feasibility Studies service
2. Add more services from researchers.me
3. Create admin panel to manage services
4. Add search functionality for services
5. Implement service categories/filtering

## Support

If you encounter issues:
1. Check backend logs
2. Check MongoDB logs
3. Check browser console
4. Verify all ports are correct (3000 for frontend, 5000 for backend, 27017 for MongoDB)
