# Image Resize Feature

## Overview
Added image resizing capability to the admin service editor, allowing users to optimize images before uploading them to the server.

## Features Added

### 1. Client-Side Image Resizing
- **Preview**: Shows image preview with original dimensions
- **Custom Dimensions**: Enter specific width/height values
- **Aspect Ratio Lock**: Maintain proportions when resizing
- **Quick Presets**: One-click buttons for common sizes (800px, 1200px, 1920px, Original)
- **Canvas API**: Uses HTML5 Canvas for high-quality client-side resizing

### 2. Server-Side Optimization
- **Sharp Integration**: Automatic server-side image optimization
- **Smart Resize**: Maximum 2000px on longest side (prevents huge uploads)
- **Format Optimization**: Progressive JPEG, optimized PNG/WebP
- **Quality**: 85% quality for good balance between size and quality

## How to Use

### For Users:
1. Go to `/admin/add-service` or edit any service
2. Click the 🖼️ Image button in the rich text editor toolbar
3. Select an image file from your computer
4. The modal will show:
   - Image preview
   - Original dimensions
   - Resize options with presets
   - Alt text input for SEO
5. Choose a resize option:
   - Use preset buttons (800px, 1200px, 1920px, or Original)
   - Enter custom dimensions manually
   - Toggle aspect ratio lock as needed
6. Enter descriptive alt text
7. Click "Insert Image"

### Recommended Sizes:
- **Hero/Banner Images**: 1920px wide
- **Content Images**: 1200px wide
- **Thumbnails/Cards**: 800px wide
- **Icons/Small Graphics**: Keep original if already optimized

## Technical Details

### Files Modified:

1. **ImageSeoModal.js** (`src/components/ImageSeoModal/ImageSeoModal.js`)
   - Added image preview functionality
   - Added resize controls (width, height, aspect ratio)
   - Added preset buttons for quick sizing
   - Passes resize options to parent component

2. **AddService.js** (`src/pages/admin/add-service.js`)
   - Added `resizeImage()` function using Canvas API
   - Modified `handleImageModalSubmit()` to handle resize options
   - Passes `imageFile` prop to modal for preview

3. **ImageSeoModal.module.css** (`src/components/ImageSeoModal/ImageSeoModal.module.css`)
   - Added styles for preview section
   - Added styles for resize controls
   - Added preset button styles
   - Increased modal width to accommodate new features

4. **upload-image.js** (`src/pages/api/upload-image.js`)
   - Integrated Sharp for server-side optimization
   - Auto-resize to max 2000px (prevents huge uploads)
   - Optimized compression (85% quality)
   - Progressive JPEG support

### Image Processing Flow:

```
User selects image
    ↓
Modal shows preview + original dimensions
    ↓
User chooses resize options (optional)
    ↓
Client-side Canvas resizing (if requested)
    ↓
Upload to server
    ↓
Server-side Sharp optimization (auto max 2000px)
    ↓
Upload to Cloudinary
    ↓
Insert into editor with alt text
```

## Benefits

1. **Performance**: Smaller file sizes load faster
2. **Storage**: Reduced storage costs on Cloudinary
3. **SEO**: Proper alt text improves search rankings
4. **UX**: Visual preview before upload
5. **Flexibility**: Multiple preset options + custom sizes
6. **Quality**: High-quality resizing with Canvas API + Sharp

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses Canvas API (supported since IE9+)
- Progressive enhancement (falls back gracefully)

## Future Enhancements (Optional)
- [ ] Crop tool for image cropping before upload
- [ ] Filters/adjustments (brightness, contrast, etc.)
- [ ] Batch image upload with bulk resize
- [ ] Image format conversion (PNG to WebP, etc.)
- [ ] Drag & drop image upload
