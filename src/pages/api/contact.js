// Mock API endpoint for contact form submissions
export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, company, message, service } = req.body;

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

    // In a real application, this would:
    // 1. Save to MongoDB
    // 2. Send email notification
    // 3. Add to CRM system

    // Mock successful response
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      company,
      message,
      service,
      timestamp: new Date().toISOString(),
    });

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
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
