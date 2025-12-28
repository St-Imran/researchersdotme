// Proxy API endpoint for blogs - fetches from backend
// API routes run server-side and can access both NEXT_PUBLIC_ and regular env vars
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, featured, limit } = req.query;

      // Build query string for backend
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (featured) queryParams.append("featured", featured);
      if (limit) queryParams.append("limit", limit);

      const queryString = queryParams.toString();
      const backendUrl = `${API_BASE_URL}/api/blogs${
        queryString ? `?${queryString}` : ""
      }`;

      // Fetch from backend
      const response = await fetch(backendUrl);

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const blogs = await response.json();

      // Transform blogs to ensure compatibility with frontend
      const transformedBlogs = blogs.map((blog) => ({
        ...blog,
        link: blog.link || `/blogs/${blog.slug}`,
        bg: blog.bg || blog.image || "/card1.webp",
        excerpt: blog.excerpt || blog.description || "",
      }));

      res.status(200).json(transformedBlogs);
    } catch (error) {
      console.error("Error fetching blogs from backend:", error);
      res.status(500).json({
        message: "Failed to fetch blogs from backend",
        error: error.message,
      });
    }
  } else if (req.method === "POST") {
    // For future: add new blog
    res.status(201).json({ message: "Blog created (mock)" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
