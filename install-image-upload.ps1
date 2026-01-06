# Image Upload Installation Script
# Run this to install all required dependencies

Write-Host "🚀 Installing Image Upload Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install formidable and form-data for Next.js
Write-Host "📦 Installing Next.js dependencies..." -ForegroundColor Yellow
npm install formidable form-data

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install multer in backend: npm install multer" -ForegroundColor White
Write-Host "2. Start backend server: node backend-server-setup.js" -ForegroundColor White
Write-Host "3. Start Next.js dev server: npm run dev" -ForegroundColor White
Write-Host "4. Navigate to /admin/add-service and test image upload" -ForegroundColor White
Write-Host ""
Write-Host "📖 See IMAGE_UPLOAD_SETUP.md for complete documentation" -ForegroundColor Cyan
