import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./ManageServices.module.css";

export default function ManageServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/services");
      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setMessage({ type: "error", text: "Failed to load services" });
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/services/${slug}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setMessage({ type: "success", text: `"${title}" deleted successfully!` });
        fetchServices(); // Refresh the list
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete service" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading services...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Manage Services</h1>
          <p>View, edit, and delete your services</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/add-service" className={styles.addButton}>
            ➕ Add New Service
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
          placeholder="Search services by title, category, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{services.length}</span>
          <span className={styles.statLabel}>Total Services</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{services.filter(s => s.featured).length}</span>
          <span className={styles.statLabel}>Featured</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{services.filter(s => s.status === 'active').length}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
      </div>

      <div className={styles.servicesList}>
        {filteredServices.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No services found</p>
            <Link href="/admin/add-service" className={styles.addButton}>
              Add Your First Service
            </Link>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service._id} className={styles.serviceCard}>
              <div className={styles.serviceInfo}>
                <div className={styles.serviceHeader}>
                  <h3>{service.title}</h3>
                  <div className={styles.badges}>
                    {service.featured && (
                      <span className={styles.badge}>⭐ Featured</span>
                    )}
                    <span className={`${styles.badge} ${styles[service.status]}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                <p className={styles.serviceDesc}>{service.description || service.subTitle}</p>
                <div className={styles.serviceMeta}>
                  <span className={styles.metaItem}>
                    📁 {service.category || "Uncategorized"}
                  </span>
                  <span className={styles.metaItem}>
                    🔗 /services/{service.slug}
                  </span>
                  {service.createdAt && (
                    <span className={styles.metaItem}>
                      📅 {new Date(service.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.serviceActions}>
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className={styles.viewButton}
                >
                  👁️ View
                </Link>
                <button
                  onClick={() => handleDelete(service.slug, service.title)}
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
