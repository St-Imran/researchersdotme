// API endpoint for fetching, updating, and deleting a single service by slug
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      const backendUrl = `${API_BASE_URL}/api/services/${slug}`;
      const response = await fetch(backendUrl);

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "Service not found" });
        }
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const service = await response.json();
      res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service from backend:", error);
      res.status(500).json({ 
        message: "Failed to fetch service from backend", 
        error: error.message 
      });
    }
  } else if (req.method === "PUT") {
    try {
      const backendUrl = `${API_BASE_URL}/api/services/${slug}`;
      const response = await fetch(backendUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Backend responded with status: ${response.status}`);
      }

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ 
        message: "Failed to update service", 
        error: error.message 
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const backendUrl = `${API_BASE_URL}/api/services/${slug}`;
      const response = await fetch(backendUrl, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Backend responded with status: ${response.status}`);
      }

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ 
        message: "Failed to delete service", 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
