// API Configuration
// Uses environment variable with fallback to localhost for development
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to construct API endpoints
export const getApiUrl = (path) => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For Next.js API routes (starting with /api/), use relative URLs
  // This allows Next.js to proxy the request through its API routes
  if (normalizedPath.startsWith('/api/')) {
    return normalizedPath;
  }
  
  // For other paths, use the backend URL directly
  return `${API_BASE_URL}${normalizedPath}`;
};
