import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./ManageBlogs.module.css";
import { getApiUrl } from "../../config/api";

export default function ManageBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(getApiUrl("/api/blogs"));
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage({ type: "error", text: "Failed to load blogs" });
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/blogs/${slug}`), {
        method: "DELETE"
      });

      if (response.ok) {
        setMessage({ type: "success", text: `"${title}" deleted successfully!` });
        fetchBlogs(); // Refresh the list
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete blog" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manage Blogs</h1>
          <p>View, edit, and delete your blog posts</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/add-blog" className={styles.addButton}>
            ➕ Add New Blog
          </Link>
          <Link href="/admin" className={styles.backButton}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search blogs by title, category, author, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{blogs.length}</span>
          <span className={styles.statLabel}>Total Blogs</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{blogs.filter(b => b.featured).length}</span>
          <span className={styles.statLabel}>Featured</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{blogs.filter(b => b.status === 'active').length}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
      </div>

      <div className={styles.blogsList}>
        {filteredBlogs.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No blogs found</p>
            <Link href="/admin/add-blog" className={styles.addButton}>
              Add Your First Blog
            </Link>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className={styles.blogCard}>
              <div className={styles.blogInfo}>
                <div className={styles.blogHeader}>
                  <h3>{blog.title}</h3>
                  <div className={styles.badges}>
                    {blog.featured && (
                      <span className={styles.badge}>⭐ Featured</span>
                    )}
                    <span className={`${styles.badge} ${styles[blog.status]}`}>
                      {blog.status}
                    </span>
                  </div>
                </div>
                <p className={styles.blogDesc}>{blog.excerpt || blog.description}</p>
                <div className={styles.blogMeta}>
                  {blog.author && (
                    <span className={styles.metaItem}>
                      ✍️ {blog.author}
                    </span>
                  )}
                  {blog.category && (
                    <span className={styles.metaItem}>
                      📁 {blog.category}
                    </span>
                  )}
                  <span className={styles.metaItem}>
                    🔗 /blogs/{blog.slug}
                  </span>
                  {blog.createdAt && (
                    <span className={styles.metaItem}>
                      📅 {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.blogActions}>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className={styles.viewButton}
                  target="_blank"
                >
                  👁️ View
                </Link>
                <Link
                  href={`/admin/add-blog?id=${blog.slug}`}
                  className={styles.editButton}
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.slug, blog.title)}
                  className={styles.deleteButton}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
