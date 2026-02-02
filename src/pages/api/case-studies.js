// Proxy API endpoint for case studies - fetches from backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const backendUrl = `${API_BASE_URL}/api/case-studies`;
      const response = await fetch(backendUrl);

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}`);
      }

      const caseStudies = await response.json();
      res.status(200).json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies from backend:", error);
      res.status(500).json({ 
        message: "Failed to fetch case studies from backend", 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
