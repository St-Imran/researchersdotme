# Required Images for SEO & Social Sharing

Place all these images in the `/public/` folder:

## Favicon Files
- **favicon.ico** - 32x32 or 48x48 pixels
- **favicon-16x16.png** - 16x16 pixels
- **favicon-32x32.png** - 32x32 pixels
- **apple-touch-icon.png** - 180x180 pixels

## Social Sharing / Open Graph
- **og-image.jpg** - 1200x630 pixels
  - This appears when sharing on Facebook, LinkedIn, Twitter
  - Should include your logo and tagline
  - High quality, no text smaller than 40px

## Logo
- **logo.png** - Transparent background, 500x500 pixels or larger
  - Used in structured data and various platforms

## Android / PWA
- **android-chrome-192x192.png** - 192x192 pixels
- **android-chrome-512x512.png** - 512x512 pixels

---

## Quick Design Tips

### For og-image.jpg (Social Preview):
```
Recommended content:
- Company logo (large, centered or left)
- Tagline: "Data-Driven Insights for Strategic Growth"
- Background: Professional, brand colors
- Avoid small text (won't be readable in previews)
```

### Color Scheme:
Based on your current theme color: `#0070f3` (blue)
- Use consistently across all images
- Ensure good contrast for text

---

## Tools to Create Images

1. **Canva** (easiest):
   - Use "Custom Size" option
   - Create each size needed
   - Download as PNG/JPG

2. **Favicon Generator**:
   - https://realfavicongenerator.net/
   - Upload one square logo image
   - Generates all favicon sizes automatically

3. **Image Resizer**:
   - https://www.iloveimg.com/resize-image
   - For batch resizing

---

## Testing Your Images

After adding images, test them:

1. **Favicon**: Visit your site and check browser tab
2. **Open Graph**: Use Facebook Debugger
   - https://developers.facebook.com/tools/debug/
   - Enter: https://researchers.me
3. **Twitter Card**: Use Card Validator
   - https://cards-dev.twitter.com/validator
4. **Google Rich Results**:
   - https://search.google.com/test/rich-results

---

## Current Image Status

✅ Logo exists at: `/logo.png` (referenced in code)
❌ Missing: All favicon files
❌ Missing: og-image.jpg
❌ Missing: Android PWA icons

**Priority**: Create og-image.jpg first - this affects all social media sharing!
