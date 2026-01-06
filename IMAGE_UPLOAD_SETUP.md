# Image Upload Setup Guide

## Overview
This implementation allows users to upload images directly from their local drive when creating services. Images are automatically stored on the server and optimized for SEO.

## Features
✅ **Local File Upload** - Users select images from their computer  
✅ **Automatic Server Storage** - Images saved to `/public/services/` folder  
✅ **SEO Optimized** - Prompts for alt text, uses descriptive filenames  
✅ **File Validation** - Size limit (5MB), type checking (JPEG, PNG, GIF, WebP, AVIF)  
✅ **Real-time Preview** - Images inserted immediately into content editor  
✅ **Secure** - Files stored locally, not on external services  

## Installation Steps

### 1. Install Backend Dependencies

```bash
# Install multer for file uploads and form-data for API proxy
npm install multer form-data formidable
```

Or if using the backend separately:
```bash
cd backend
npm install multer
```

### 2. Verify Backend Configuration

The backend server ([backend-server-setup.js](backend-server-setup.js)) now includes:
- Multer configuration for file uploads
- Image upload endpoint: `POST /api/upload/image`
- Image delete endpoint: `DELETE /api/upload/image/:filename`
- Automatic directory creation for uploads

### 3. Start the Backend Server

```bash
node backend-server-setup.js
```

You should see:
```
✅ Connected to MongoDB
📁 Created uploads directory: C:\path\to\project\public\services
🚀 Backend server running on http://localhost:5000
```

### 4. Test the Upload Feature

1. Navigate to `/admin/add-service`
2. Click in the content editor where you want to insert an image
3. Click the 🖼️ **Image** button in the toolbar
4. Select an image from your computer
5. Enter alt text for SEO (optional)
6. Image will be uploaded and inserted automatically

## How It Works

### Upload Flow
```
User selects image → Frontend validates → Upload to /api/upload-image → 
Backend saves to /public/services/ → Returns image path → 
Insert into content editor
```

### File Storage
- **Location**: `/public/services/`
- **Naming**: `original-name-timestamp-random.ext`
- **Example**: `team-photo-1736198765-987654321.jpg`
- **Access**: `/services/team-photo-1736198765-987654321.jpg`

### Supported Formats
- JPEG/JPG
- PNG
- GIF
- WebP
- AVIF
- SVG

### File Size Limit
- Maximum: **5MB per image**
- Recommended: 500KB - 1MB for optimal performance

## SEO Benefits

1. **Local Hosting** - Faster load times, better for SEO
2. **Alt Text** - Prompts for descriptive text for accessibility
3. **Descriptive Filenames** - Uses original filename (sanitized)
4. **Proper Image Tags** - Includes max-width, height auto, margins
5. **No External Dependencies** - No reliance on Google Drive or external services

## Troubleshooting

### "Failed to upload image"
- Ensure backend server is running on port 5000
- Check MongoDB is connected
- Verify `/public/services/` directory exists

### "File too large"
- Compress image before uploading
- Maximum size is 5MB
- Use tools like TinyPNG or ImageOptim

### Images not showing after upload
- Check file was saved to `/public/services/`
- Verify image path starts with `/services/`
- Check browser console for errors

## API Endpoints

### Upload Image
```
POST /api/upload/image
Content-Type: multipart/form-data

Body: { image: File }

Response:
{
  "success": true,
  "path": "/services/image-1234567890.jpg",
  "filename": "image-1234567890.jpg",
  "size": 123456
}
```

### Delete Image
```
DELETE /api/upload/image/:filename

Response:
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## Best Practices

1. **Optimize Before Upload**
   - Compress images to reduce file size
   - Use WebP format for better compression
   - Resize to appropriate dimensions (max 1920px width)

2. **Use Descriptive Alt Text**
   - Describe what the image shows
   - Include relevant keywords naturally
   - Keep it under 125 characters

3. **File Naming**
   - Use descriptive original filenames
   - Avoid spaces (use hyphens)
   - Example: `feasibility-study-diagram.jpg`

4. **Image Dimensions**
   - Content images: 800-1200px wide
   - Hero images: 1920px wide
   - Thumbnails: 400-600px wide

## Comparison: Google Drive vs Local Upload

| Feature | Google Drive Link | Local Upload ✅ |
|---------|------------------|----------------|
| SEO | ❌ Poor | ✅ Excellent |
| Speed | ❌ Slow (external) | ✅ Fast (local) |
| Reliability | ⚠️ Depends on Google | ✅ Full control |
| Privacy | ❌ External service | ✅ Your server |
| Caching | ❌ Limited | ✅ Full control |
| Alt Text | ⚠️ Manual | ✅ Prompted |

## Why This Is Better Than Google Drive

### Google Drive Issues:
1. **Not Direct URLs** - Share links redirect, not actual images
2. **Slow Loading** - External requests add latency
3. **SEO Penalty** - Search engines prefer local images
4. **Quota Limits** - Google Drive has bandwidth limits
5. **Reliability** - Depends on Google's availability
6. **Privacy** - Images hosted on Google's servers

### Local Upload Benefits:
1. **Direct URLs** - Fast, predictable paths
2. **Fast Loading** - Same server, no external requests
3. **SEO Boost** - Search engines index local images better
4. **No Limits** - Only limited by your server space
5. **Full Control** - You manage everything
6. **Better Privacy** - Data stays on your server

## Future Enhancements

- [ ] Image cropping/resizing in browser
- [ ] Automatic WebP conversion
- [ ] Bulk upload support
- [ ] Image gallery/library
- [ ] CDN integration option
- [ ] Image compression on upload

## Support

For issues or questions, check:
1. Backend console for errors
2. Browser console for upload errors
3. Verify all dependencies installed
4. Ensure MongoDB is running
