import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Services.module.css";

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [navigationData, setNavigationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mainCategories = ["All", ...navigationData.map((cat) => cat.title)];

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setNavigationData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load services data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const extractedServices = extractAllServices();
    setAllServices(extractedServices);
    setFilteredServices(extractedServices);
  }, [navigationData]);

  useEffect(() => {
    filterServices();
    updateBreadcrumbs();
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
    searchTerm,
    allServices,
  ]);

  const extractAllServices = () => {
    const services = [];
    navigationData.forEach((mainCat, mainIndex) => {
      if (mainCat.subSections && mainCat.subSections.length > 0) {
        mainCat.subSections.forEach((subCat, subIndex) => {
          if (subCat.subSections && subCat.subSections.length > 0) {
            subCat.subSections.forEach((subSubCat, subSubIndex) => {
              services.push({
                id: `${mainIndex}-${subIndex}-${subSubIndex}`,
                title: subSubCat.title,
                heading: subSubCat.heading || subCat.heading,
                subtitle: subSubCat.subTitle || subCat.subTitle,
                mainCategory: mainCat.title,
                mainCategoryHeading: mainCat.heading,
                subCategory: subCat.title,
                subCategoryHeading: subCat.heading,
                subSubCategory: subSubCat.title,
                url: subSubCat.url,
                level: 3,
                description:
                  subSubCat.subTitle ||
                  subCat.subTitle ||
                  mainCat.subTitle ||
                  "",
              });
            });
          } else {
            services.push({
              id: `${mainIndex}-${subIndex}`,
              title: subCat.title,
              heading: subCat.heading || mainCat.heading,
              subtitle: subCat.subTitle || mainCat.subTitle,
              mainCategory: mainCat.title,
              mainCategoryHeading: mainCat.heading,
              subCategory: subCat.title,
              url: subCat.url,
              level: 2,
              description: subCat.subTitle || mainCat.subTitle || "",
            });
          }
        });
      }
    });
    return services;
  };

  const filterServices = () => {
    let filtered = allServices;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.mainCategory === selectedCategory
      );
    }
    if (selectedSubCategory) {
      filtered = filtered.filter(
        (service) => service.subCategory === selectedSubCategory
      );
    }
    if (selectedSubSubCategory) {
      filtered = filtered.filter(
        (service) => service.subSubCategory === selectedSubSubCategory
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (service.subtitle &&
            service.subtitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (service.heading &&
            service.heading.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (service.description &&
            service.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredServices(filtered);
  };

  const updateBreadcrumbs = () => {
    const crumbs = [];
    if (selectedCategory !== "All")
      crumbs.push({ label: selectedCategory, type: "main" });
    if (selectedSubCategory)
      crumbs.push({ label: selectedSubCategory, type: "sub" });
    if (selectedSubSubCategory)
      crumbs.push({ label: selectedSubSubCategory, type: "subsub" });
    setBreadcrumbs(crumbs);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedSubSubCategory("");
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedSubSubCategory("");
  };

  const handleSubSubCategoryClick = (subSubCategory) => {
    setSelectedSubSubCategory(subSubCategory);
  };

  const handleBreadcrumbClick = (type) => {
    if (type === "main") {
      setSelectedSubCategory("");
      setSelectedSubSubCategory("");
    } else if (type === "sub") {
      setSelectedSubSubCategory("");
    }
  };

  const getSubCategories = () => {
    if (selectedCategory === "All") return [];
    const mainCat = navigationData.find(
      (cat) => cat.title === selectedCategory
    );
    return mainCat?.subSections || [];
  };

  const getSubSubCategories = () => {
    if (!selectedSubCategory) return [];
    const mainCat = navigationData.find(
      (cat) => cat.title === selectedCategory
    );
    const subCat = mainCat?.subSections?.find(
      (sub) => sub.title === selectedSubCategory
    );
    return subCat?.subSections || [];
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const getCategoryColor = (index) => {
    const colors = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ];
    return colors[index % colors.length];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.servicesContainer}>
      <div className="container">
        <div className={styles.servicesHeader}>
          <h1 className={styles.servicesTitle}>Our Services</h1>
          <p className={styles.servicesDescription}>
            Empowering businesses with comprehensive research, analytics, and
            strategic consulting services tailored to drive growth and success
            in the UAE and beyond.
          </p>
        </div>
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Projects Completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>200+</div>
            <div className={styles.statLabel}>Happy Clients</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Client Satisfaction</div>
          </div>
        </div>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search services..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {breadcrumbs.length > 0 && (
          <div className={styles.breadcrumbSection}>
            <button
              className={styles.breadcrumbItem}
              onClick={() => handleCategoryClick("All")}
            >
              All Services
            </button>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <span className={styles.breadcrumbSeparator}>/</span>
                <button
                  className={styles.breadcrumbItem}
                  onClick={() => handleBreadcrumbClick(crumb.type)}
                >
                  {crumb.label}
                </button>
              </span>
            ))}
          </div>
        )}
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Main Categories</h3>
          <div className={styles.filterButtons}>
            {mainCategories.map((category) => (
              <button
                key={category}
                className={`${styles.filterBtn} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {selectedCategory !== "All" && getSubCategories().length > 0 && (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Subcategories</h3>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterBtn} ${
                  !selectedSubCategory ? styles.active : ""
                }`}
                onClick={() => setSelectedSubCategory("")}
              >
                All {selectedCategory}
              </button>
              {getSubCategories().map((subCat) => (
                <button
                  key={subCat.title}
                  className={`${styles.filterBtn} ${
                    selectedSubCategory === subCat.title ? styles.active : ""
                  }`}
                  onClick={() => handleSubCategoryClick(subCat.title)}
                >
                  {subCat.title}
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedSubCategory && getSubSubCategories().length > 0 && (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Services</h3>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterBtn} ${
                  !selectedSubSubCategory ? styles.active : ""
                }`}
                onClick={() => setSelectedSubSubCategory("")}
              >
                All {selectedSubCategory}
              </button>
              {getSubSubCategories().map((subSubCat) => (
                <button
                  key={subSubCat.title}
                  className={`${styles.filterBtn} ${
                    selectedSubSubCategory === subSubCat.title
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => handleSubSubCategoryClick(subSubCat.title)}
                >
                  {subSubCat.title}
                </button>
              ))}
            </div>
          </div>
        )}
        {filteredServices.length > 0 ? (
          <div className={styles.servicesGrid}>
            {filteredServices.map((service, index) => {
              // Map service titles to component file names
              const titleToComponent = {
                // Market Research Services
                "Feasibility Studies": "feasibilityStudies",
                "Mystery Shopping": "mystreyShopping",
                "Brand Positioning & Benchmarking":
                  "brandPositioningAndBenchmarking",
                "Competitor Analysis": "competitorAnalysis",
                "Market Research & Measurement": "marketResearchAndmeasurement",

                // Business Consulting Services
                "Strategy & Advisory": "strategyAndConsultation",
                "Marketing Consulting": "marketingConsulting",
                "Business Consultation & Implementation":
                  "businessConsultationAndImplementation",

                // Analytics & Data Services
                Analytics: "analytics",
                "Data Analytics": "dataAnalytics",
                "Data Story Telling": "dataStoryTelling",
                "Data Quality": "dataQuality",
                "Data Integration": "dataIntegration",
                "Dashboard & Reporting": "dashboardAndReporting",
                "Customer Experience & Happiness":
                  "customerExperienceAndHappiness",
                "Master Data Management": "masterDataManagement",
                "Business Intelligence": "businessIntelligence",
                "IBM Cognos Analytics": "ibmCognosAnalytics",
                "Microsoft Power BI": "microsoftPowerBi",
                Tableau: "tableau",
                "Qlik View / Qlik Sense": "qlikviewQliksense",
                "Q Analysis": "qAnalysis",
                "Product Analysis": "productAnalysis",
                "Process Analysis": "processAnalysis",
                "Employee Engagement & Satisfaction":
                  "employeeEngagementAndSatisfaction",

                // Technology Services
                "Artificial Intelligence": "artificialIntelligence",
                Blockchain: "blockchain",
                "Web 3.0": "web30",
                "Web 3.0 Strategy & Consultation":
                  "web30StrategyAndConsultation",
                "Blockchain Infra Consulting": "blockchainInfraConsulting",
                "Asset Tokenization": "assetTokenization",
                "DeFi Consultation": "deFiConsultation",
                Tokenomics: "tokenomics",
                "Market Making": "marketMaking",
                "On-Chain Ecosystem Consulting": "onChainEcosystemConsulting",
                Technology: "technology",
                "UI/UX": "uiUx",
                Ideation: "ideation",
                "Designing & Implementation of Loyalty & Rewards Program":
                  "designingAndImplementationOfLoyaltyAndRewardsProgram",
              };

              // Use existing URL if valid, otherwise map to component
              let serviceUrl;
              if (service.url && service.url !== "javascript:void(0)") {
                serviceUrl = service.url;
              } else if (titleToComponent[service.title]) {
                serviceUrl = `/services/innerPages/${
                  titleToComponent[service.title]
                }`;
              } else {
                // Fallback: create slug-based URL for services without mapping
                const serviceSlug = service.title
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-");
                serviceUrl = `/services/innerPages/${serviceSlug}`;
              }

              return (
                <Link
                  key={service.id}
                  href={serviceUrl}
                  className={styles.serviceCard}
                >
                  <div
                    className={styles.serviceHeader}
                    style={{ background: getCategoryColor(index) }}
                  >
                    <div className={styles.serviceLevel}>
                      {service.level === 3
                        ? "Specialized Service"
                        : "Service Category"}
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    {service.heading && (
                      <p className={styles.serviceHeading}>{service.heading}</p>
                    )}
                  </div>
                  <div className={styles.serviceContent}>
                    <div className={styles.categoryPath}>
                      <span className={styles.pathItem}>
                        {service.mainCategory}
                      </span>
                      {service.subCategory && (
                        <>
                          <span className={styles.pathSeparator}>›</span>
                          <span className={styles.pathItem}>
                            {service.subCategory}
                          </span>
                        </>
                      )}
                      {service.subSubCategory && (
                        <>
                          <span className={styles.pathSeparator}>›</span>
                          <span className={styles.pathItem}>
                            {service.subSubCategory}
                          </span>
                        </>
                      )}
                    </div>
                    {service.description && (
                      <p className={styles.serviceDescription}>
                        {service.description}
                      </p>
                    )}
                    <div className={styles.learnMore}>Learn More →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No services found</h3>
            <p>
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Business?
            </h2>
            <p className={styles.ctaText}>
              Let's discuss how our services can help you achieve your goals.
              Contact us today for a free consultation.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
