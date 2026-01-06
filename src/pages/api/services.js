// Proxy API endpoint for services - fetches from backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const backendUrl = `${API_BASE_URL}/api/services`;
      const response = await fetch(backendUrl);

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const services = await response.json();
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services from backend:", error);
      res.status(500).json({ 
        message: "Failed to fetch services from backend", 
        error: error.message 
      });
    }
  } else if (req.method === "POST") {
    try {
      const backendUrl = `${API_BASE_URL}/api/services`;
      const response = await fetch(backendUrl, {
        method: 'POST',
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
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ 
        message: "Failed to create service", 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
