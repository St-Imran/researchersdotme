# 🚀 Quick Start - Vercel Deployment

## For Vercel Deployment - You Need:

### 1. Cloudinary Account (FREE)
Sign up: https://cloudinary.com
Get these from dashboard:
- Cloud Name
- API Key  
- API Secret

### 2. Local Setup

Create `.env.local` file:
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Test locally:
```bash
npm run dev
```

### 3. Vercel Setup

Push to GitHub:
```bash
git add .
git commit -m "Add Cloudinary support"
git push
```

Deploy on Vercel:
1. Import project from GitHub
2. Add environment variables (same as .env.local)
3. Deploy!

### 4. MongoDB (Optional for Production)

If using MongoDB Atlas:
1. Create free cluster at https://cloud.mongodb.com
2. Get connection string
3. Add to Vercel env vars:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
   ```

---

## That's It! 🎉

Your app is now production-ready on Vercel with:
- ✅ Image uploads (Cloudinary)
- ✅ Database (MongoDB Atlas)
- ✅ CDN delivery
- ✅ Auto-scaling
- ✅ 100% FREE tier

See [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) for detailed steps.
