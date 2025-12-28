import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogDetail.module.css";

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${slug}`);

      if (!response.ok) {
        throw new Error("Blog not found");
      }

      const data = await response.json();
      setBlog(data);

      // Fetch related blogs if available
      if (data.relatedBlogs && data.relatedBlogs.length > 0) {
        fetchRelatedBlogs(data.relatedBlogs);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (relatedIds) => {
    try {
      const response = await fetch("/api/blogs");
      const allBlogs = await response.json();
      const related = allBlogs.filter((b) => relatedIds.includes(b.id));
      setRelatedBlogs(related);
    } catch (err) {
      console.error("Error fetching related blogs:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.blogDetailContainer}>
        <div className="container">
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={styles.blogDetailContainer}>
        <div className="container">
          <div className={styles.errorState}>
            <h2>Blog Not Found</h2>
            <p>
              The blog you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blogs" className={styles.backButton}>
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogDetailContainer}>
      {/* Blog Header */}
      <div className={styles.blogHeader}>
        <div className={styles.headerContent}>
          <Link href="/blogs" className={styles.backButton}>
            ← Back to Blogs
          </Link>
          <span className={styles.categoryBadge}>{blog.category}</span>
          <h1 className={styles.blogTitle}>{blog.title}</h1>
          <div className={styles.blogMeta}>
            <div className={styles.metaItem}>
              <span>📅</span>
              <span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span>✍️</span>
              <span>{blog.author}</span>
            </div>
            <div className={styles.metaItem}>
              <span>⏱️</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container">
        <div className={styles.blogContent}>
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              width={900}
              height={400}
              className={styles.featuredImage}
            />
          )}

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <h3 className={styles.tagsTitle}>Tags</h3>
              <div className={styles.tags}>
                {blog.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className={styles.shareSection}>
            <h3 className={styles.shareTitle}>Share this article</h3>
            <div className={styles.shareButtons}>
              <button
                className={styles.shareBtn}
                style={{ background: "#1DA1F2", color: "white" }}
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      blog.title
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  );
                }}
              >
                🐦 Twitter
              </button>
              <button
                className={styles.shareBtn}
                style={{ background: "#0077B5", color: "white" }}
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  );
                }}
              >
                💼 LinkedIn
              </button>
              <button
                className={styles.shareBtn}
                style={{ background: "#25D366", color: "white" }}
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      blog.title + " " + window.location.href
                    )}`,
                    "_blank"
                  );
                }}
              >
                💬 WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className={styles.relatedBlogs}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={relatedBlog.link}
                  className="card"
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ position: "relative", height: "200px" }}>
                    <Image
                      src={relatedBlog.bg}
                      alt={relatedBlog.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body">
                    <span
                      className="badge"
                      style={{
                        background: "#667eea",
                        color: "white",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {relatedBlog.category}
                    </span>
                    <h5 className="card-title">{relatedBlog.title}</h5>
                    <p className="card-text text-muted">
                      {relatedBlog.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
