// API for image uploads using Cloudinary (works on Vercel)
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

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

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.filepath, {
      folder: 'services',
      resource_type: 'image',
      public_id: `${Date.now()}-${imageFile.originalFilename?.replace(/\.[^/.]+$/, '')}`,
    });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      path: result.secure_url,
      filename: result.public_id,
      size: result.bytes,
      width: result.width,
      height: result.height,
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
}
