// Script to update a service slug in MongoDB
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'researchersdb';

async function updateSlug(oldSlug, newSlug) {
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });
  
  try {
    const db = client.db(DB_NAME);
    
    // Check if new slug already exists
    const existing = await db.collection('services').findOne({ slug: newSlug });
    if (existing) {
      console.log(`❌ Error: A service with slug "${newSlug}" already exists`);
      return;
    }
    
    // Update the slug
    const result = await db.collection('services').updateOne(
      { slug: oldSlug },
      { $set: { slug: newSlug, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      console.log(`❌ Error: No service found with slug "${oldSlug}"`);
    } else {
      console.log(`✅ Successfully updated slug from "${oldSlug}" to "${newSlug}"`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

// Update from "data-story-telling" to "data-storytelling"
updateSlug('data-story-telling', 'data-storytelling');
