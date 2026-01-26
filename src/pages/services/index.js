import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Services.module.css";
import { getApiUrl } from "../../config/api";

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [filteredFeaturedServices, setFilteredFeaturedServices] = useState([]);

  // Extract unique categories from services
  const mainCategories = ["All", ...new Set(allServices.map((service) => service.category || service.mainCategory).filter(Boolean))];

  useEffect(() => {
    fetch(getApiUrl("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        // Store the flat array of services directly
        setAllServices(data);
        setFilteredServices(data);
        // Filter featured services and get the latest 3
        const featured = data
          .filter(service => service.featured === true)
          .sort((a, b) => {
            // Sort by createdAt if available, otherwise by _id (MongoDB ObjectId contains timestamp)
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(parseInt(a._id?.substring(0, 8), 16) * 1000 || 0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(parseInt(b._id?.substring(0, 8), 16) * 1000 || 0);
            return dateB - dateA; // Descending order (newest first)
          });
        setFeaturedServices(featured.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load services data");
        setLoading(false);
      });
  }, []);

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

  const filterServices = () => {
    let filtered = allServices;
    let filteredFeatured = featuredServices;

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory || 
                     service.mainCategory === selectedCategory
      );
      filteredFeatured = filteredFeatured.filter(
        (service) => service.category === selectedCategory || 
                     service.mainCategory === selectedCategory
      );
    }

    // Apply subcategory filter
    if (selectedSubCategory) {
      filtered = filtered.filter(
        (service) => service.subCategory === selectedSubCategory
      );
      filteredFeatured = filteredFeatured.filter(
        (service) => service.subCategory === selectedSubCategory
      );
    }

    // Apply sub-subcategory filter
    if (selectedSubSubCategory) {
      filtered = filtered.filter(
        (service) => service.subSubCategory === selectedSubSubCategory
      );
      filteredFeatured = filteredFeatured.filter(
        (service) => service.subSubCategory === selectedSubSubCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      const searchFilter = (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.subTitle &&
          service.subTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (service.heading &&
          service.heading.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service.description &&
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      
      filtered = filtered.filter(searchFilter);
      filteredFeatured = filteredFeatured.filter(searchFilter);
    }

    setFilteredServices(filtered);
    setFilteredFeaturedServices(filteredFeatured);
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
    // Get unique sub-categories for the selected main category
    const subCats = allServices
      .filter((service) => service.category === selectedCategory || service.mainCategory === selectedCategory)
      .map((service) => service.subCategory)
      .filter(Boolean);
    return [...new Set(subCats)];
  };

  const getSubSubCategories = () => {
    if (!selectedSubCategory) return [];
    // Get unique sub-sub-categories for the selected sub-category
    const subSubCats = allServices
      .filter((service) => service.subCategory === selectedSubCategory)
      .map((service) => service.subSubCategory)
      .filter(Boolean);
    return [...new Set(subSubCats)];
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

  if (loading) {
    return (
      <div className={styles.servicesContainer}>
        <div className="container">
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Featured Services */}
        {filteredFeaturedServices.length > 0 && (
            <div className={styles.featuredSection}>
              <h2 className={styles.featuredTitle}>Featured Services</h2>
              <p className={styles.featuredSubtitle}>
                {selectedCategory === "All" 
                  ? "Explore our top services that can help transform your business"
                  : `Featured ${selectedCategory} services`}
              </p>
              <div 
                className={styles.featuredGrid}
                style={{
                  gridTemplateColumns: filteredFeaturedServices.length === 1
                    ? '1fr'
                    : filteredFeaturedServices.length === 2
                    ? 'repeat(2, 1fr)'
                    : 'repeat(auto-fit, minmax(320px, 1fr))'
                }}
              >
                {filteredFeaturedServices.map((service, index) => {
                  const serviceUrl = `/services/${service.slug}`;
                  return (
                    <Link
                      key={service._id || service.slug || index}
                      href={serviceUrl}
                      className={styles.featuredCard}
                      style={{
                        maxWidth: filteredFeaturedServices.length === 1 ? '1000px' : 'none',
                        width: filteredFeaturedServices.length === 1 ? '100%' : 'auto',
                        margin: filteredFeaturedServices.length === 1 ? '0 auto' : '0'
                      }}
                    >
                      <div
                        className={styles.featuredCardHeader}
                        style={{ background: getCategoryColor(index) }}
                      >
                        <div className={styles.featuredBadge}>⭐ Featured</div>
                        <div className={styles.categoryBadge}>
                          {service.category || service.mainCategory}
                        </div>
                        <h3 className={styles.featuredCardTitle}>
                          {service.title}
                        </h3>
                        {service.subTitle && (
                          <p className={styles.featuredCardSubtitle}>
                            {service.subTitle}
                          </p>
                        )}
                      </div>
                      <div className={styles.featuredCardContent}>
                        {service.description && (
                          <p className={styles.featuredCardDescription}>
                            {service.description.substring(0, 150)}
                            {service.description.length > 150 ? "..." : ""}
                          </p>
                        )}
                        <div className={styles.featuredCardFooter}>
                          <span className={styles.learnMore}>Learn More →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
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
                  key={subCat}
                  className={`${styles.filterBtn} ${
                    selectedSubCategory === subCat ? styles.active : ""
                  }`}
                  onClick={() => handleSubCategoryClick(subCat)}
                >
                  {subCat}
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
                  key={subSubCat}
                  className={`${styles.filterBtn} ${
                    selectedSubSubCategory === subSubCat
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => handleSubSubCategoryClick(subSubCat)}
                >
                  {subSubCat}
                </button>
              ))}
            </div>
          </div>
        )}
        {filteredServices.length > 0 ? (
          <div className={styles.servicesGrid}>
            {filteredServices.map((service, index) => {
              // Use the slug from the database directly
              const serviceUrl = `/services/${service.slug}`;

              return (
                <Link
                  key={service._id || service.slug || index}
                  href={serviceUrl}
                  className={styles.serviceCard}
                >
                  <div
                    className={styles.serviceHeader}
                    style={{ background: getCategoryColor(index) }}
                  >
                    <div className={styles.serviceLevel}>
                      {service.category || "Service"}
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    {service.heading && service.heading !== service.title && (
                      <p className={styles.serviceHeading}>{service.heading}</p>
                    )}
                  </div>
                  <div className={styles.serviceContent}>
                    <div className={styles.categoryPath}>
                      {(service.category || service.mainCategory) && (
                        <span className={styles.pathItem}>
                          {service.category || service.mainCategory}
                        </span>
                      )}
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
                    {(service.description || service.subTitle) && (
                      <p className={styles.serviceDescription}>
                        {service.description || service.subTitle}
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
