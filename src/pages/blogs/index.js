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
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          (blog.title &&
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (blog.description &&
            blog.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (blog.excerpt &&
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
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

  const featuredBlogs = blogs.filter((blog) => blog.featured);

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
        {featuredBlogs.length > 0 &&
          !searchTerm &&
          selectedCategory === "All" && (
            <div className={styles.featuredSection}>
              <h2 className={styles.featuredTitle}>Featured Articles</h2>
              <div className="row">
                {featuredBlogs.slice(0, 3).map((blog) => (
                  <div key={blog.id} className="col-md-4 mb-4">
                    <Link href={blog.link} className={styles.blogCard}>
                      <div className={styles.blogImageWrapper}>
                        <Image
                          src={blog.bg}
                          alt={blog.title}
                          fill
                          className={styles.blogImage}
                        />
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
                ))}
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
