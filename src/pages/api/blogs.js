// Proxy API endpoint for blogs - fetches from backend
// Use NEXT_PUBLIC_API_URL which is available in both client and server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
    // Create new blog
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create blog');
      }

      const blog = await response.json();
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({
        message: "Failed to create blog",
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    // Update blog - not used in this endpoint, handled by blogs/[id].js
    res.status(405).json({ message: "Use /api/blogs/[id] for updates" });
  } else if (req.method === "DELETE") {
    // Delete blog - not used in this endpoint, handled by blogs/[id].js
    res.status(405).json({ message: "Use /api/blogs/[id] for deletion" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

