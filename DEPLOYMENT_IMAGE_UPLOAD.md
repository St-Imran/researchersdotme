# Image Upload - Production Deployment Guide

## Current Status: Development Only ⚠️

The current image upload implementation saves files to `/public/services/` which works **locally** but **NOT in production** on serverless platforms.

## Why It Won't Work in Production

Modern hosting platforms (Vercel, Netlify, AWS Lambda) use:
- **Serverless functions** - No persistent filesystem
- **Read-only `/public` folder** - Cannot write files after deployment
- **Stateless containers** - Files disappear after function execution

## Solutions for Production

### Option 1: Cloud Storage (Recommended) ✅

Use a cloud storage service like:
- **Cloudinary** (easiest, has free tier)
- **AWS S3** (scalable, popular)
- **Google Cloud Storage**
- **Azure Blob Storage**

#### Cloudinary Example (Recommended):

1. **Install Cloudinary SDK:**
```bash
npm install cloudinary
```

2. **Update `/api/upload-image.js`:**
```javascript
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.filepath, {
      folder: 'services',
      resource_type: 'image',
    });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      path: result.secure_url,
      filename: result.public_id,
      size: result.bytes,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
}
```

3. **Add environment variables:**
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Benefits:**
- ✅ Works in production
- ✅ Free tier available (25GB storage, 25GB bandwidth/month)
- ✅ Automatic image optimization
- ✅ CDN included
- ✅ Image transformations (resize, crop, etc.)
- ✅ Easy to implement

---

### Option 2: AWS S3 (Enterprise Scale)

1. **Install AWS SDK:**
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

2. **Update `/api/upload-image.js`:**
```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read file
    const fileBuffer = fs.readFileSync(imageFile.filepath);
    const fileName = `services/${Date.now()}-${imageFile.originalFilename}`;

    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: imageFile.mimetype,
      ACL: 'public-read',
    }));

    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      path: imageUrl,
      filename: fileName,
      size: imageFile.size,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
}
```

**Benefits:**
- ✅ Enterprise-grade
- ✅ Unlimited scalability
- ✅ Pay-as-you-go pricing
- ✅ Full control

---

### Option 3: Traditional Server (VPS/Dedicated)

If deploying to a **traditional server** (not serverless):
- **DigitalOcean Droplet**
- **AWS EC2**
- **Linode**
- **Your own VPS**

**Current code will work as-is!** ✅

Just ensure:
1. The `/public/services/` directory exists
2. Proper file permissions (755 or 777)
3. Enough disk space

---

## Orphaned Images Problem

### The Issue:
Images are saved immediately on upload, even if the user doesn't submit the form. Over time, you'll accumulate unused images.

### Solution 1: Cleanup Script

```javascript
// cleanup-orphaned-images.js
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function cleanupOrphanedImages() {
  // Connect to MongoDB
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('researchersdb');
  
  // Get all services
  const services = await db.collection('services').find({}).toArray();
  
  // Extract all image paths used in services
  const usedImages = new Set();
  services.forEach(service => {
    const content = service.content || '';
    const imageMatches = content.match(/\/services\/[^\s"']+/g);
    if (imageMatches) {
      imageMatches.forEach(img => {
        usedImages.add(img.replace('/services/', ''));
      });
    }
  });
  
  // Get all files in services folder
  const servicesDir = path.join(__dirname, 'public', 'services');
  const allFiles = fs.readdirSync(servicesDir);
  
  // Find orphaned files
  const orphaned = allFiles.filter(file => !usedImages.has(file));
  
  console.log(`Found ${orphaned.length} orphaned images:`);
  orphaned.forEach(file => {
    console.log(`- ${file}`);
    // Uncomment to delete:
    // fs.unlinkSync(path.join(servicesDir, file));
  });
  
  await client.close();
}

cleanupOrphanedImages();
```

Run periodically:
```bash
node cleanup-orphaned-images.js
```

### Solution 2: Two-Step Upload

Change the flow to only upload when form is submitted:
1. User selects image → **Preview** (base64)
2. User submits form → **Upload image** + Create service

This prevents orphaned images but makes the form more complex.

---

## Comparison Table

| Solution | Cost | Complexity | SEO | Speed | Scalability |
|----------|------|------------|-----|-------|-------------|
| **Local Upload (Current)** | Free | Easy | Good | Fast | Limited |
| **Cloudinary** | Free tier | Medium | Excellent | Very Fast | High |
| **AWS S3** | Pay-as-you-go | Hard | Excellent | Very Fast | Unlimited |
| **Traditional Server** | $5-20/mo | Medium | Good | Fast | Medium |

---

## Recommended Approach

### For Development: ✅ Current Setup
Keep using local uploads - it's simple and works great!

### For Production: ✅ Cloudinary
1. Easy to set up (5 minutes)
2. Free tier is generous
3. Automatic CDN and optimization
4. No infrastructure management

### For Enterprise: ✅ AWS S3
1. Unlimited scale
2. Full control
3. Integration with other AWS services
4. Professional-grade reliability

---

## Migration Steps (Local → Cloudinary)

1. **Sign up for Cloudinary** (free tier)
2. **Install package:** `npm install cloudinary`
3. **Update `/api/upload-image.js`** (see code above)
4. **Add env variables** to Vercel/Netlify
5. **Test locally** first
6. **Deploy** to production
7. **Migrate existing images** (optional):
   ```javascript
   // Upload existing images to Cloudinary
   const files = fs.readdirSync('./public/services');
   for (const file of files) {
     await cloudinary.uploader.upload(`./public/services/${file}`, {
       folder: 'services',
     });
   }
   ```

---

## Current Code Status

- ✅ **Works locally** (development)
- ❌ **Won't work on Vercel/Netlify** (serverless)
- ✅ **Will work on VPS** (traditional server)
- ⚠️ **Creates orphaned images** if form not submitted

Choose your deployment platform and update accordingly!
