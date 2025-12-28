// Mock API endpoint for services
export default function handler(req, res) {
  const services = [
    {
      id: 1,
      title: "Market Research Services",
      subtitle: "Unlocking Insights, Driving Strategy",
      description:
        "Delivering actionable research to help you understand customers, competitors, and emerging opportunities. Our comprehensive market research services provide deep insights into consumer behavior, market trends, and competitive landscapes.",
      bg: "/card1.webp",
      link: "/services/innerPages/feasibilityStudies",
      category: "market-research",
      featured: true,
      features: [
        "Consumer Behavior Analysis",
        "Market Segmentation",
        "Competitor Intelligence",
        "Trend Forecasting",
        "Feasibility Studies",
      ],
      benefits: "Gain competitive advantage with data-driven insights",
    },
    {
      id: 2,
      title: "Business Consulting Services",
      subtitle: "Strategic Solutions for Growth",
      description:
        "Guiding businesses with tailored strategies to scale, optimize, and succeed in dynamic markets. Our expert consultants work closely with you to identify opportunities, overcome challenges, and achieve sustainable growth.",
      bg: "/card2.webp",
      link: "/services/innerPages/dataStoryTelling",
      category: "consulting",
      featured: true,
      features: [
        "Strategic Planning",
        "Business Process Optimization",
        "Change Management",
        "Performance Improvement",
        "Risk Assessment",
      ],
      benefits: "Transform your business with proven strategies",
    },
    {
      id: 3,
      title: "Analytics & Data Services",
      subtitle: "Turning Data Into Actionable Insights",
      description:
        "Empowering businesses with advanced analytics, data management, and insight-driven strategies to make smarter, faster, and future-ready decisions. Transform raw data into strategic assets.",
      bg: "/card3.webp",
      link: "/services/marketResearchAndMeasurement",
      category: "analytics",
      featured: true,
      features: [
        "Data Visualization",
        "Predictive Analytics",
        "Dashboard Development",
        "Business Intelligence",
        "Big Data Solutions",
      ],
      benefits: "Make data-driven decisions with confidence",
    },
    {
      id: 4,
      title: "Experience & Operational Research",
      subtitle: "Enhancing Journeys, Elevating Operations",
      description:
        "Transforming customer touchpoints and operations into competitive advantage. We help you understand and optimize every aspect of the customer journey while streamlining operational efficiency.",
      bg: "/card1.webp",
      link: "/services/analytics",
      category: "research",
      featured: true,
      features: [
        "Customer Journey Mapping",
        "Mystery Shopping",
        "Service Quality Assessment",
        "Operational Efficiency Studies",
        "Employee Experience Research",
      ],
      benefits: "Enhance customer satisfaction and operational excellence",
    },
    {
      id: 5,
      title: "Market Entry & Expansion Advisory",
      subtitle: "Navigate New Markets with Confidence",
      description:
        "Strategic guidance for entering new markets and expanding your business footprint successfully. Our advisory services help you minimize risks and maximize opportunities in new territories.",
      bg: "/card2.webp",
      link: "/services/analytics",
      category: "advisory",
      featured: false,
      features: [
        "Market Assessment",
        "Entry Strategy Development",
        "Regulatory Compliance Guidance",
        "Partner Identification",
        "Go-to-Market Planning",
      ],
      benefits: "Expand confidently with strategic market insights",
    },
    {
      id: 6,
      title: "Brand Research & Strategy",
      subtitle: "Build Strong, Memorable Brands",
      description:
        "Comprehensive brand research and strategic positioning services to help you build, strengthen, and differentiate your brand in competitive markets.",
      bg: "/card3.webp",
      link: "/services/innerPages/brandPositioningAndBenchmarking",
      category: "research",
      featured: false,
      features: [
        "Brand Positioning",
        "Brand Health Tracking",
        "Competitive Benchmarking",
        "Brand Identity Research",
        "Rebranding Strategy",
      ],
      benefits: "Create a brand that resonates and drives loyalty",
    },
    {
      id: 7,
      title: "Digital Transformation Consulting",
      subtitle: "Modernize Your Business",
      description:
        "Guide your organization through digital transformation with strategic consulting that aligns technology with business objectives.",
      bg: "/card1.webp",
      link: "/services/digitalTransformation",
      category: "consulting",
      featured: false,
      features: [
        "Digital Strategy Development",
        "Technology Assessment",
        "Process Automation",
        "Digital Culture Change",
        "Innovation Workshops",
      ],
      benefits: "Stay competitive in the digital age",
    },
    {
      id: 8,
      title: "Customer Insights & Segmentation",
      subtitle: "Know Your Customers Better",
      description:
        "Deep dive into customer behavior, preferences, and needs to create targeted strategies and personalized experiences.",
      bg: "/card2.webp",
      link: "/services/innerPages/customerExperienceAndHappiness",
      category: "market-research",
      featured: false,
      features: [
        "Demographic Analysis",
        "Psychographic Profiling",
        "Purchase Behavior Studies",
        "Customer Lifetime Value",
        "Persona Development",
      ],
      benefits: "Target the right customers with precision",
    },
  ];

  if (req.method === "GET") {
    const { category, featured, limit } = req.query;

    let filteredServices = services;

    if (category) {
      filteredServices = filteredServices.filter(
        (service) => service.category === category
      );
    }

    if (featured === "true") {
      filteredServices = filteredServices.filter(
        (service) => service.featured === true
      );
    }

    if (limit) {
      filteredServices = filteredServices.slice(0, parseInt(limit));
    }

    res.status(200).json(filteredServices);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
