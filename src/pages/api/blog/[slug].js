// Proxy API endpoint for individual blog details - fetches from backend
// API routes run server-side and can access both NEXT_PUBLIC_ and regular env vars
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      // Fetch from backend
      const backendUrl = `${API_BASE_URL}/api/blog/${slug}`;
      const response = await fetch(backendUrl);

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "Blog not found" });
        }
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const blog = await response.json();
      res.status(200).json(blog);
    } catch (error) {
      console.error("Error fetching blog from backend:", error);
      res.status(500).json({
        message: "Failed to fetch blog from backend",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
