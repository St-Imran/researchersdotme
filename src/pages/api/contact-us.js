// API endpoint for contact form submissions - proxies to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, country, phone, company, message, service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    try {
      // Send to backend server
      const response = await fetch(`${API_BASE_URL}/api/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          country,
          phone,
          company,
          message,
          service,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({
          success: true,
          message: "Thank you for contacting us! We'll get back to you soon.",
          data: {
            name,
            email,
            submittedAt: new Date().toISOString(),
          },
        });
      } else {
        throw new Error(data.error || 'Failed to submit contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
