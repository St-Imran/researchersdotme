import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Admin.module.css";
import { getApiUrl } from "../../config/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    services: 0,
    blogs: 0,
    caseStudies: 0
  });

  useEffect(() => {
    // Fetch counts from backend
    Promise.all([
      fetch(getApiUrl("/api/services")).then(r => r.json()),
      fetch(getApiUrl("/api/blogs")).then(r => r.json()),
      fetch(getApiUrl("/api/case-studies")).then(r => r.json())
    ])
    .then(([services, blogs, caseStudies]) => {
      console.log("Services data:", services);
      console.log("Blogs data:", blogs);
      console.log("Case Studies data:", caseStudies);
      
      setStats({
        services: Array.isArray(services) ? services.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        caseStudies: Array.isArray(caseStudies) ? caseStudies.length : 0
      });
    })
    .catch(err => {
      console.error("Error fetching stats:", err);
      console.error("API URL:", getApiUrl("/api/services"));
    });
  }, []);

  const adminCards = [
    {
      title: "Services",
      count: stats.services,
      icon: "⚙️",
      actions: [
        { label: "Add New Service", href: "/admin/add-service", color: "primary" },
        { label: "Manage Services", href: "/admin/manage-services", color: "secondary" }
      ]
    },
    {
      title: "Blogs",
      count: stats.blogs,
      icon: "📝",
      actions: [
        { label: "Add New Blog", href: "/admin/add-blog", color: "primary" },
        { label: "Manage Blogs", href: "/admin/manage-blogs", color: "secondary" }
      ]
    },
    {
      title: "Case Studies",
      count: stats.caseStudies,
      icon: "📊",
      actions: [
        { label: "Add New Case Study", href: "/admin/add-case-study", color: "primary" },
        { label: "Manage Case Studies", href: "/admin/manage-case-studies", color: "secondary" }
      ]
    }
  ];

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Admin Dashboard</h1>
          <p>Manage your content, services, and website data</p>
        </div>
        <Link href="/" className={styles.backButton}>
          ← Back to Website
        </Link>
      </div>

      <div className={styles.statsGrid}>
        {adminCards.map((card, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardInfo}>
                <h3>{card.title}</h3>
                <div className={styles.cardCount}>{card.count}</div>
              </div>
            </div>
            <div className={styles.cardActions}>
              {card.actions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`${styles.actionButton} ${styles[action.color]}`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <button 
            className={styles.quickActionCard}
            onClick={() => router.push("/admin/add-service")}
          >
            <span className={styles.quickIcon}>➕</span>
            <span className={styles.quickLabel}>Add Service</span>
          </button>
          <button 
            className={styles.quickActionCard}
            onClick={() => router.push("/admin/add-blog")}
          >
            <span className={styles.quickIcon}>✍️</span>
            <span className={styles.quickLabel}>Write Blog</span>
          </button>
          <button 
            className={styles.quickActionCard}
            onClick={() => router.push("/admin/add-case-study")}
          >
            <span className={styles.quickIcon}>📄</span>
            <span className={styles.quickLabel}>Add Case Study</span>
          </button>
          <button 
            className={styles.quickActionCard}
            onClick={() => router.push("/admin/manage-services")}
          >
            <span className={styles.quickIcon}>🗑️</span>
            <span className={styles.quickLabel}>Delete Items</span>
          </button>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Updates</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>⚙️</div>
            <div className={styles.activityContent}>
              <p className={styles.activityTitle}>Services Module</p>
              <p className={styles.activityDesc}>Ready to add and manage services</p>
            </div>
            <div className={styles.activityTime}>Now</div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📝</div>
            <div className={styles.activityContent}>
              <p className={styles.activityTitle}>Blogs Module</p>
              <p className={styles.activityDesc}>Ready to create blog posts</p>
            </div>
            <div className={styles.activityTime}>Now</div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📊</div>
            <div className={styles.activityContent}>
              <p className={styles.activityTitle}>Case Studies Module</p>
              <p className={styles.activityDesc}>Ready to add case studies</p>
            </div>
            <div className={styles.activityTime}>Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
