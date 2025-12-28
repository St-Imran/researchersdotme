// Mock API endpoint for newsletter subscriptions
export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, name } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // In a real application, this would:
    // 1. Save to MongoDB newsletter collection
    // 2. Send welcome email
    // 3. Add to email marketing platform (Mailchimp, SendGrid, etc.)

    console.log("Newsletter subscription:", {
      email,
      name,
      subscribedAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
      data: {
        email,
        subscribedAt: new Date().toISOString(),
      },
    });
  } else if (req.method === "GET") {
    // Return mock newsletter statistics
    res.status(200).json({
      totalSubscribers: 1547,
      growthRate: "+12.5%",
      activeSubscribers: 1432,
    });
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
