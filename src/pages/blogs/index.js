import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Blogs.module.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [filteredFeaturedBlogs, setFilteredFeaturedBlogs] = useState([]);

  const categories = [
    "All",
    "Market Research",
    "Data Analytics",
    "Branding",
    "Industry Insights",
    "Small Business",
  ];

  useEffect(() => {
    // Fetch blogs from API
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on category and search
    filterBlogs();
    updateBreadcrumbs();
  }, [selectedCategory, searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
      setFilteredBlogs(data);
      
      // Filter and sort featured blogs by date (newest first)
      const featured = data
        .filter((blog) => blog.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setFeaturedBlogs(featured);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;
    let filteredFeatured = featuredBlogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
      filteredFeatured = filteredFeatured.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchFilter = (blog) =>
        (blog.title &&
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.description &&
          blog.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (blog.excerpt &&
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      
      filtered = filtered.filter(searchFilter);
      filteredFeatured = filteredFeatured.filter(searchFilter);
    }

    setFilteredBlogs(filtered);
    // Limit to top 3 featured blogs per category/filter
    setFilteredFeaturedBlogs(filteredFeatured.slice(0, 3));
  };

  const updateBreadcrumbs = () => {
    const crumbs = [];
    if (selectedCategory !== "All") {
      crumbs.push({ label: selectedCategory, type: "category" });
    }
    setBreadcrumbs(crumbs);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleBreadcrumbClick = () => {
    setSelectedCategory("All");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className={styles.blogsContainer}>
        <div className="container">
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogsContainer}>
      <div className="container">
        {/* Header Section */}
        <div className={styles.blogsHeader}>
          <h1 className={styles.blogsTitle}>Our Insights & Blogs</h1>
          <p className={styles.blogsDescription}>
            Discover the latest trends, insights, and best practices in market
            research, data analytics, and business strategy.
          </p>
        </div>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search blogs..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className={styles.breadcrumbSection}>
            <button
              className={styles.breadcrumbItem}
              onClick={() => handleBreadcrumbClick()}
            >
              All Blogs
            </button>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <span className={styles.breadcrumbSeparator}>/</span>
                <button className={styles.breadcrumbItem}>{crumb.label}</button>
              </span>
            ))}
          </div>
        )}

        {/* Featured Blogs */}
        {filteredFeaturedBlogs.length > 0 && (
            <div className={styles.featuredSection}>
              <h2 className={styles.featuredTitle}>Featured Articles</h2>
              <p className={styles.featuredSubtitle}>
                {selectedCategory === "All" 
                  ? "Discover our top articles and insights"
                  : `Featured ${selectedCategory} articles`}
              </p>
              <div className="row">
                {filteredFeaturedBlogs.map((blog) => {
                  // Dynamic column sizing based on number of featured blogs
                  const colClass = filteredFeaturedBlogs.length === 1 
                    ? "col-md-8 offset-md-2 mb-4"
                    : filteredFeaturedBlogs.length === 2
                    ? "col-md-6 mb-4"
                    : "col-md-4 mb-4";
                  
                  return (
                  <div key={blog.id} className={colClass}>
                    <Link href={blog.link} className={styles.featuredBlogCard}>
                      <div className={styles.blogImageWrapper}>
                        <Image
                          src={blog.bg}
                          alt={blog.title}
                          fill
                          className={styles.blogImage}
                        />
                        <span className={styles.featuredBadge}>⭐ Featured</span>
                        <span className={styles.categoryBadge}>
                          {blog.category}
                        </span>
                      </div>
                      <div className={styles.blogContent}>
                        <div className={styles.blogMeta}>
                          <span className={styles.blogDate}>
                            📅{" "}
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className={styles.blogReadTime}>
                            ⏱️ {blog.readTime}
                          </span>
                        </div>
                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                        <div className={styles.blogFooter}>
                          <span className={styles.blogAuthor}>
                            By {blog.author}
                          </span>
                          <span className={styles.readMore}>Read More →</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Category Filter */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Categories</h3>
          <div className={styles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterBtn} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className={styles.blogsGrid}>
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} href={blog.link} className={styles.blogCard}>
                <div className={styles.blogImageWrapper}>
                  <Image
                    src={blog.bg}
                    alt={blog.title}
                    fill
                    className={styles.blogImage}
                  />
                  <span className={styles.categoryBadge}>{blog.category}</span>
                </div>
                <div className={styles.blogContent}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogDate}>
                      📅{" "}
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className={styles.blogReadTime}>
                      ⏱️ {blog.readTime}
                    </span>
                  </div>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogDescription}>{blog.description}</p>
                  <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                  <div className={styles.blogFooter}>
                    <span className={styles.blogAuthor}>By {blog.author}</span>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No blogs found</h3>
            <p>
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
