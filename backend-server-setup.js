// Complete Express Backend Setup for Services
// This is a standalone backend server that runs on port 5000

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'researchersdb';

// Define the uploads directory - use path relative to the Next.js public folder
const UPLOADS_DIR = path.join(__dirname, 'public', 'services');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log('📁 Created uploads directory:', UPLOADS_DIR);
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .toLowerCase();
    cb(null, nameWithoutExt + '-' + uniqueSuffix + ext);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|avif|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, avif, svg)'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for large HTML content
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection helper
let dbClient;
async function connectDB() {
  if (!dbClient) {
    dbClient = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  }
  return dbClient.db(DB_NAME);
}

// Initialize DB connection
connectDB().catch(console.error);

// ==================== IMAGE UPLOAD ROUTES ====================

// POST /api/upload/image - Upload image for services
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    console.log('📤 Received upload request');
    console.log('File:', req.file ? req.file.originalname : 'No file');
    
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the path relative to the public folder
    const imagePath = `/services/${req.file.filename}`;
    
    console.log('✅ Image uploaded:', imagePath);
    console.log('   Size:', req.file.size, 'bytes');
    console.log('   Saved to:', req.file.path);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      path: imagePath,
      filename: req.file.filename,
      size: req.file.size
    });

  } catch (error) {
    console.error('❌ Error uploading image:', error);
    res.status(500).json({
      error: 'Failed to upload image',
      details: error.message
    });
  }
});

// DELETE /api/upload/image/:filename - Delete uploaded image
app.delete('/api/upload/image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOADS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    console.log('✅ Image deleted:', filename);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting image:', error);
    res.status(500).json({
      error: 'Failed to delete image',
      details: error.message
    });
  }
});

// ==================== SERVICES ROUTES ====================

// GET /api/services - Get all services
app.get('/api/services', async (req, res) => {
  try {
    const db = await connectDB();
    const services = await db
      .collection('services')
      .find({ status: 'active' })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/:slug - Get single service by slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const db = await connectDB();
    const service = await db.collection('services').findOne({ slug });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST /api/services - Create new service
app.post('/api/services', async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      heading,
      subTitle,
      description,
      content,
      image,
      features,
      benefits,
      keywords,
      order,
      featured,
      status,
      mainCategory,
      subCategory
    } = req.body;

    // Validation
    if (!title || !slug || !subTitle || !description || !content) {
      return res.status(400).json({
        error: 'Missing required fields: title, slug, subTitle, description, content'
      });
    }

    const db = await connectDB();
    
    // Check if slug already exists
    const existingService = await db.collection('services').findOne({ slug });
    if (existingService) {
      return res.status(400).json({
        error: 'A service with this slug already exists'
      });
    }

    // Prepare service document
    const service = {
      title,
      slug,
      category: category || 'Services',
      heading: heading || title,
      subTitle,
      description,
      content,
      image: image || '/services/default-service.jpg',
      features: Array.isArray(features) ? features : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      keywords: Array.isArray(keywords) ? keywords : [],
      order: parseInt(order) || 0,
      featured: featured === true || featured === 'true',
      status: status || 'active',
      mainCategory: mainCategory || null,
      subCategory: subCategory || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into database
    const result = await db.collection('services').insertOne(service);
    
    console.log('✅ Service created:', title);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service: {
        ...service,
        _id: result.insertedId
      }
    });

  } catch (error) {
    console.error('❌ Error creating service:', error);
    res.status(500).json({
      error: 'Failed to create service',
      details: error.message
    });
  }
});

// PUT /api/services/:slug - Update service
app.put('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    
    delete updateData._id;
    delete updateData.createdAt;
    updateData.updatedAt = new Date();

    const db = await connectDB();
    const result = await db.collection('services').updateOne(
      { slug },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const updatedService = await db.collection('services').findOne({ slug });
    
    console.log('✅ Service updated:', slug);
    
    res.json({
      success: true,
      message: 'Service updated successfully',
      service: updatedService
    });

  } catch (error) {
    console.error('❌ Error updating service:', error);
    res.status(500).json({
      error: 'Failed to update service',
      details: error.message
    });
  }
});

// DELETE /api/services/:slug - Delete service
app.delete('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const db = await connectDB();
    
    const result = await db.collection('services').deleteOne({ slug });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    console.log('✅ Service deleted:', slug);

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting service:', error);
    res.status(500).json({
      error: 'Failed to delete service',
      details: error.message
    });
  }
});

// ==================== BLOGS ROUTES ====================

// GET /api/blogs - Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const db = await connectDB();
    const blogs = await db
      .collection('blogs')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST /api/blogs - Create new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const db = await connectDB();
    const result = await db.collection('blogs').insertOne(blogData);
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: { ...blogData, _id: result.insertedId }
    });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// ==================== CONTACT ROUTES ====================

// POST /api/contact - Handle contact form
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      createdAt: new Date(),
      status: 'new'
    };

    const db = await connectDB();
    await db.collection('contacts').insertOne(contactData);
    
    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error handling contact:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// ==================== NEWSLETTER ROUTES ====================

// POST /api/newsletter - Subscribe to newsletter
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = await connectDB();
    
    // Check if already subscribed
    const existing = await db.collection('newsletter').findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    await db.collection('newsletter').insertOne({
      email,
      subscribedAt: new Date(),
      status: 'active'
    });
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// ==================== TESTIMONIALS ROUTES ====================

// GET /api/testimonials - Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const db = await connectDB();
    const testimonials = await db
      .collection('testimonials')
      .find({ status: 'active' })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// ==================== CASE STUDIES ROUTES ====================

// GET /api/case-studies - Get all case studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const db = await connectDB();
    const caseStudies = await db
      .collection('caseStudies')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    const db = await connectDB();
    res.json({ 
      status: 'ok', 
      timestamp: new Date(),
      database: 'connected',
      uploadsDir: UPLOADS_DIR
    });
  } catch (error) {
    res.json({ 
      status: 'partial', 
      timestamp: new Date(),
      database: 'disconnected',
      uploadsDir: UPLOADS_DIR
    });
  }
});

// Error handling middleware for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.error('Multer error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        details: 'Maximum file size is 5MB'
      });
    }
    return res.status(400).json({
      error: 'File upload error',
      details: error.message
    });
  } else if (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB: ${MONGO_URI}/${DB_NAME}`);
  console.log(`📁 Uploads directory: ${UPLOADS_DIR}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  POST   /api/upload/image`);
  console.log(`  DELETE /api/upload/image/:filename`);
  console.log(`  GET    /api/services`);
  console.log(`  GET    /api/services/:slug`);
  console.log(`  POST   /api/services`);
  console.log(`  PUT    /api/services/:slug`);
  console.log(`  DELETE /api/services/:slug`);
  console.log(`  GET    /api/blogs`);
  console.log(`  POST   /api/blogs`);
  console.log(`  POST   /api/contact`);
  console.log(`  POST   /api/newsletter`);
  console.log(`  GET    /api/testimonials`);
  console.log(`  GET    /api/case-studies`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});
