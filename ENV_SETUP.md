# Environment Configuration

This project uses environment variables to configure the backend API URL for different environments.

## Setup

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. The default configuration in `.env.local` uses `http://localhost:5000`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Start your local backend server on port 5000

4. Run the Next.js development server:
   ```bash
   npm run dev
   ```

### Vercel Deployment

For Vercel deployments, you need to set the environment variable in the Vercel dashboard:

1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://rdot-me-backend-services-imran-khans-projects-b3df5052.vercel.app`
   - **Environment**: Select the appropriate environments:
     - **Production** (main branch)
     - **Preview** (test-app branch)

4. Redeploy your application for the changes to take effect

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API
  - Local: `http://localhost:5000`
  - Production: `https://rdot-me-backend-services-imran-khans-projects-b3df5052.vercel.app`

## Usage in Code

The API configuration is centralized in `src/config/api.js`:

```javascript
import { getApiUrl } from '../config/api';

// Use it in your fetch calls
fetch(getApiUrl('/api/services'))
```

This automatically uses the correct backend URL based on the environment.
