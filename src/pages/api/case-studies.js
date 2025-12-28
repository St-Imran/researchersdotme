// Mock API endpoint for case studies
export default function handler(req, res) {
  const caseStudies = [
    {
      id: 1,
      title: "Market Entry Strategy for Tech Startup",
      client: "TechVision UAE",
      industry: "Technology",
      challenge:
        "A Silicon Valley tech startup needed to understand the UAE market before launching their SaaS product.",
      solution:
        "Conducted comprehensive market research including competitor analysis, customer segmentation, and pricing strategy.",
      results: [
        "Identified 3 key customer segments",
        "Achieved 150% of first-year revenue targets",
        "Reduced customer acquisition cost by 35%",
      ],
      image: "/case1.jpg",
      featured: true,
      category: "Market Research",
      duration: "3 months",
      year: "2024",
    },
    {
      id: 2,
      title: "Brand Repositioning for Retail Chain",
      client: "Emirates Retail Group",
      industry: "Retail",
      challenge:
        "A struggling retail chain needed to rebrand and reposition to compete with new market entrants.",
      solution:
        "Developed comprehensive brand strategy including customer research, competitive analysis, and brand identity redesign.",
      results: [
        "40% increase in brand awareness",
        "25% growth in customer loyalty",
        "Successfully launched in 5 new locations",
      ],
      image: "/case2.jpg",
      featured: true,
      category: "Branding",
      duration: "6 months",
      year: "2024",
    },
    {
      id: 3,
      title: "Data Analytics Implementation",
      client: "Healthcare Provider",
      industry: "Healthcare",
      challenge:
        "Large healthcare provider needed to transform raw patient data into actionable insights.",
      solution:
        "Implemented advanced analytics platform with custom dashboards and reporting.",
      results: [
        "50% reduction in report generation time",
        "Improved patient satisfaction by 30%",
        "Data-driven decisions led to 20% cost savings",
      ],
      image: "/case3.jpg",
      featured: true,
      category: "Data Analytics",
      duration: "4 months",
      year: "2024",
    },
    {
      id: 4,
      title: "Customer Experience Optimization",
      client: "Hospitality Group",
      industry: "Hospitality",
      challenge:
        "Hotel chain wanted to improve customer satisfaction and increase repeat bookings.",
      solution:
        "Mystery shopping program, customer journey mapping, and experience optimization.",
      results: [
        "Customer satisfaction score increased from 7.2 to 9.1",
        "35% increase in repeat bookings",
        "Reduced complaint rate by 60%",
      ],
      image: "/case4.jpg",
      featured: false,
      category: "Customer Experience",
      duration: "5 months",
      year: "2023",
    },
  ];

  if (req.method === "GET") {
    const { featured, category, limit } = req.query;

    let filteredCases = caseStudies;

    if (featured === "true") {
      filteredCases = filteredCases.filter((c) => c.featured === true);
    }

    if (category) {
      filteredCases = filteredCases.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (limit) {
      filteredCases = filteredCases.slice(0, parseInt(limit));
    }

    res.status(200).json(filteredCases);
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
