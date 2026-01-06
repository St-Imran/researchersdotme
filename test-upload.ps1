# Test script for image upload functionality
Write-Host "🧪 Testing Image Upload System" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if backend is running
Write-Host "1️⃣ Testing backend health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -UseBasicParsing
    Write-Host "   ✅ Backend is running" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor White
    Write-Host "   Database: $($health.database)" -ForegroundColor White
    Write-Host "   Uploads Dir: $($health.uploadsDir)" -ForegroundColor White
} catch {
    Write-Host "   ❌ Backend is NOT running!" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Please start the backend server first:" -ForegroundColor Yellow
    Write-Host "   node backend-server-setup.js" -ForegroundColor White
    exit 1
}

Write-Host ""

# Test 2: Check uploads directory
Write-Host "2️⃣ Checking uploads directory..." -ForegroundColor Yellow
$uploadsDir = ".\public\services"
if (Test-Path $uploadsDir) {
    Write-Host "   ✅ Directory exists: $uploadsDir" -ForegroundColor Green
    $fileCount = (Get-ChildItem $uploadsDir -File).Count
    Write-Host "   Files in directory: $fileCount" -ForegroundColor White
} else {
    Write-Host "   ⚠️ Directory does not exist: $uploadsDir" -ForegroundColor Yellow
    Write-Host "   It will be created automatically on first upload" -ForegroundColor White
}

Write-Host ""

# Test 3: Check Next.js dev server
Write-Host "3️⃣ Testing Next.js dev server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2
    Write-Host "   ✅ Next.js is running on port 3000" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ Next.js dev server not detected" -ForegroundColor Yellow
    Write-Host "   Start it with: npm run dev" -ForegroundColor White
}

Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   - Backend: ✅ Running on port 5000" -ForegroundColor Green
Write-Host "   - You can now test image uploads at:" -ForegroundColor White
Write-Host "     http://localhost:3000/admin/add-service" -ForegroundColor White
Write-Host ""
Write-Host "🔍 If uploads still fail, check the backend console for error messages" -ForegroundColor Yellow
