// Mock API endpoint for testimonials
export default function handler(req, res) {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Al-Mansouri",
      position: "CEO",
      company: "TechVision UAE",
      image: "/testimonial1.jpg",
      rating: 5,
      text: "Researchers helped us understand our market better than we ever thought possible. Their insights were instrumental in our successful product launch in Dubai.",
      date: "2025-01-15",
      featured: true,
    },
    {
      id: 2,
      name: "Mohammed Hassan",
      position: "Founder",
      company: "StartUp Hub",
      image: "/testimonial2.jpg",
      rating: 5,
      text: "The feasibility study conducted by Researchers saved us from making costly mistakes. Their team is professional, thorough, and truly understands the UAE market.",
      date: "2024-12-20",
      featured: true,
    },
    {
      id: 3,
      name: "Lisa Chen",
      position: "Marketing Director",
      company: "Global Innovations",
      image: "/testimonial3.jpg",
      rating: 5,
      text: "Their data analytics services transformed how we make decisions. The visualizations and insights they provided were clear, actionable, and valuable.",
      date: "2024-11-10",
      featured: true,
    },
    {
      id: 4,
      name: "Ahmed Al-Rashid",
      position: "Operations Manager",
      company: "Emirates Solutions",
      image: "/testimonial4.jpg",
      rating: 5,
      text: "Working with Researchers was a game-changer for our business. Their market research gave us the confidence to expand into new segments.",
      date: "2024-10-05",
      featured: false,
    },
    {
      id: 5,
      name: "Jennifer Williams",
      position: "Product Manager",
      company: "Innovation Labs",
      image: "/testimonial5.jpg",
      rating: 4,
      text: "Great team with deep knowledge of market research methodologies. They delivered exactly what we needed, on time and within budget.",
      date: "2024-09-22",
      featured: false,
    },
  ];

  if (req.method === "GET") {
    const { featured, limit } = req.query;

    let filteredTestimonials = testimonials;

    if (featured === "true") {
      filteredTestimonials = filteredTestimonials.filter(
        (t) => t.featured === true
      );
    }

    if (limit) {
      filteredTestimonials = filteredTestimonials.slice(0, parseInt(limit));
    }

    res.status(200).json(filteredTestimonials);
  } else if (req.method === "POST") {
    // For future: add new testimonial
    const { name, position, company, text, rating } = req.body;

    if (!name || !text || !rating) {
      return res.status(400).json({
        success: false,
        message: "Name, text, and rating are required",
      });
    }

    res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully",
      data: {
        id: testimonials.length + 1,
        name,
        position,
        company,
        text,
        rating,
        date: new Date().toISOString(),
        featured: false,
      },
    });
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
