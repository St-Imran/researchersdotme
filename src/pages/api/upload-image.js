// API for image uploads using Cloudinary (works on Vercel)
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import sharp from 'sharp';
import fs from 'fs/promises';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Optimize image with sharp before uploading
    const optimizedBuffer = await sharp(imageFile.filepath)
      .resize(2000, 2000, { 
        fit: 'inside', // Don't upscale, only downscale if needed
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85, progressive: true })
      .png({ quality: 85, compressionLevel: 9 })
      .webp({ quality: 85 })
      .toBuffer();

    // Get metadata for response
    const metadata = await sharp(optimizedBuffer).metadata();

    // Upload optimized buffer to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'services',
          resource_type: 'image',
          public_id: `${Date.now()}-${imageFile.originalFilename?.replace(/\.[^/.]+$/, '')}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(optimizedBuffer);
    });

    const result = await uploadPromise;

    res.status(200).json({
      success: true,
      message: 'Image uploaded and optimized successfully',
      path: result.secure_url,
      filename: result.public_id,
      size: result.bytes,
      width: result.width,
      height: result.height,
      optimized: true,
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
}
