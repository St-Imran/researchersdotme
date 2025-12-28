# How to Add Images to Services

## The Problem
Images need to be web-accessible, not local Windows file paths. A path like `C:\Users\imran\OneDrive\Pictures\image.jpg` won't work on the web.

## The Solution

### Step 1: Upload Image to Public Folder
1. Copy your image file (e.g., `my-service.jpg`)
2. Paste it into: `public/services/` folder in your project
3. The file path should be: `public/services/my-service.jpg`

### Step 2: Insert Image in Editor
1. Open the admin panel: `http://localhost:3000/admin/add-service`
2. Click in the content editor where you want the image
3. Click the **🖼️ Image** button in the toolbar
4. Enter the URL: `/services/my-service.jpg` (notice the leading slash)
5. Click OK

The image will appear in the editor and in the published article!

## Image URL Format

✅ **CORRECT:**
- `/services/my-image.jpg` (starts with /)
- `/services/subfolder/image.png`
- `https://example.com/image.jpg` (external URLs)

❌ **WRONG:**
- `C:\Users\imran\Pictures\image.jpg` (local Windows path)
- `services/image.jpg` (missing leading slash)
- `my-image.jpg` (no path)

## Quick Example

**File Location:**
```
public/
  services/
    feasibility-studies.jpg  ← Your image here
    data-storytelling.png
```

**Image URL to use:**
```
/services/feasibility-studies.jpg
```

## Tips

1. **Use descriptive names**: `feasibility-studies-hero.jpg` instead of `img1.jpg`
2. **Optimize images**: Compress large images before uploading
3. **Use web formats**: .jpg, .png, .webp, .svg
4. **Responsive**: Images are automatically styled to be responsive

## Image Positioning

- Images are inserted **at your cursor position**
- You can have multiple images in one article
- Add text before/after images by placing cursor and typing
- Images automatically get proper spacing and styling

## What Changed

✅ **Removed Fields:**
- Image URL field (from Settings section)
- Display Order field (not needed)

✅ **Now Using:**
- Rich text editor with image insertion
- Images inserted inline where you need them
- Better validation (URLs must start with / or http)

## If Image Still Broken

1. Check the image file exists in `public/services/`
2. Check the URL starts with `/services/`
3. Try accessing directly: `http://localhost:3000/services/your-image.jpg`
4. Check browser console for errors
