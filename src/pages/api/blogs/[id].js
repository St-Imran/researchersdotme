// Proxy API endpoint for individual blog operations (admin) - fetches from backend
// API routes run server-side and can access both NEXT_PUBLIC_ and regular env vars
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // Fetch from backend - can use slug or _id
      const backendUrl = `${API_BASE_URL}/api/blogs/${id}`;
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
  } else if (req.method === "PUT") {
    // Update blog
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update blog');
      }

      const blog = await response.json();
      res.status(200).json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({
        message: "Failed to update blog",
        error: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    // Delete blog
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete blog');
      }

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({
        message: "Failed to delete blog",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
