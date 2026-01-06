# 🔧 Quick Fix for Upload Error

## The Problem
You're getting: `"Unexpected token '<', '<!DOCTYPE'... is not valid JSON"`

This means the backend is returning HTML instead of JSON, which happens because:
**The backend server needs to be restarted to load the new upload endpoint!**

## ✅ Solution

### Step 1: Stop the current backend server
In the terminal where backend is running, press **Ctrl+C**

### Step 2: Restart the backend server
```bash
node backend-server-setup.js
```

You should see:
```
✅ Connected to MongoDB
📁 Created uploads directory: C:\Users\...\public\services
🚀 Backend server running on http://localhost:5000
📁 Uploads directory: C:\Users\...\public\services

Available endpoints:
  POST   /api/upload/image    ← This endpoint is new!
  DELETE /api/upload/image/:filename
  ...
```

### Step 3: Test the upload again
1. Go to http://localhost:3000/admin/add-service
2. Click in the content editor
3. Click the 🖼️ **Image** button
4. Select an image from your computer
5. It should upload successfully now!

## 🔍 How to Verify It's Working

Watch the backend console when you upload. You should see:
```
📤 Received upload request
File: your-image.jpg
✅ Image uploaded: /services/your-image-1234567890.jpg
   Size: 123456 bytes
   Saved to: C:\...\public\services\your-image-1234567890.jpg
```

## 🆘 Still Not Working?

### Error: "Failed to upload image"
- Make sure backend is running: `node backend-server-setup.js`
- Check backend console for error messages
- Verify the upload endpoint is listed in the startup logs

### Error: "File too large"
- Maximum file size is 5MB
- Compress your image before uploading

### Error: "No file uploaded"
- Make sure you're selecting an image file
- Only JPEG, PNG, GIF, WebP, AVIF formats are supported

### Backend shows "No file in request"
- This means the multipart form data isn't being parsed correctly
- Make sure you restarted the backend after updating the code
- Check that multer is installed: `npm list multer`

## 📝 What Changed

The backend now has:
- ✅ Multer middleware for file uploads
- ✅ `/api/upload/image` endpoint
- ✅ Automatic directory creation
- ✅ File validation (type, size)
- ✅ Error handling middleware

All these features were added to `backend-server-setup.js` but **require a restart to take effect**!

## 🎯 Next Steps

After restarting:
1. Upload should work perfectly
2. Images save to `/public/services/`
3. They're immediately accessible at `/services/filename.jpg`
4. SEO-friendly with alt text
5. Fast loading from local server

**Remember**: Any time you update `backend-server-setup.js`, you need to restart the backend server!
