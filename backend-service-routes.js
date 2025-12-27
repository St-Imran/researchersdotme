// Backend API Routes for Services
// Add this to your Express backend (localhost:5000)

const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'researchersdb';

// Helper function to get database connection
async function getDB() {
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });
  return client.db(DB_NAME);
}

// GET /api/services - Get all services
router.get('/services', async (req, res) => {
  try {
    const db = await getDB();
    const services = await db
      .collection('services')
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/:slug - Get single service by slug
router.get('/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const db = await getDB();
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
router.post('/services', async (req, res) => {
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

    const db = await getDB();
    
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
    
    // Return the created service
    const createdService = {
      ...service,
      _id: result.insertedId
    };

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service: createdService
    });

  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      error: 'Failed to create service',
      details: error.message
    });
  }
});

// PUT /api/services/:slug - Update service
router.put('/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.createdAt;
    
    // Add updated timestamp
    updateData.updatedAt = new Date();

    const db = await getDB();
    const result = await db.collection('services').updateOne(
      { slug },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const updatedService = await db.collection('services').findOne({ slug });
    
    res.json({
      success: true,
      message: 'Service updated successfully',
      service: updatedService
    });

  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      error: 'Failed to update service',
      details: error.message
    });
  }
});

// DELETE /api/services/:slug - Delete service
router.delete('/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const db = await getDB();
    
    const result = await db.collection('services').deleteOne({ slug });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      error: 'Failed to delete service',
      details: error.message
    });
  }
});

// GET /api/services/category/:category - Get services by category
router.get('/services/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const db = await getDB();
    
    const services = await db
      .collection('services')
      .find({ category })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json(services);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/featured - Get featured services
router.get('/services/featured', async (req, res) => {
  try {
    const db = await getDB();
    const services = await db
      .collection('services')
      .find({ featured: true, status: 'active' })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json(services);
  } catch (error) {
    console.error('Error fetching featured services:', error);
    res.status(500).json({ error: 'Failed to fetch featured services' });
  }
});

module.exports = router;
