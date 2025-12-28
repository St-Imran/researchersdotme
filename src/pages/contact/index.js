import { useState } from "react";
import styles from "./ContactNew.module.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactWrapper}>
        <div className={styles.contactHeader}>
          <h1 className={styles.contactTitle}>Get In Touch</h1>
          <p className={styles.contactSubtitle}>
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>

        <div className={styles.contactContent}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <div>
              <h2 className={styles.infoTitle}>Contact Information</h2>
              <p className={styles.infoText}>
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div className={styles.infoItemContent}>
                <h3 className={styles.infoItemTitle}>Email</h3>
                <p className={styles.infoItemText}>
                  <a
                    href="mailto:Info@researchers.me"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Info@researchers.me
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📱</span>
              <div className={styles.infoItemContent}>
                <h3 className={styles.infoItemTitle}>Phone</h3>
                <p className={styles.infoItemText}>
                  <a
                    href="tel:+919999888676"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    +91 9999888676
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💬</span>
              <div className={styles.infoItemContent}>
                <h3 className={styles.infoItemTitle}>WhatsApp</h3>
                <p className={styles.infoItemText}>
                  <a
                    href="https://wa.me/+919999888676"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Chat with us on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🌐</span>
              <div className={styles.infoItemContent}>
                <h3 className={styles.infoItemTitle}>Location</h3>
                <p className={styles.infoItemText}>
                  Serving clients across UAE and MENA region
                </p>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                💼
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                🐦
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                📘
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                📷
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <h2 className={styles.formTitle}>Send us a Message</h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="+971 XX XXX XXXX"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="company" className={styles.formLabel}>
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="service" className={styles.formLabel}>
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={styles.formSelect}
              >
                <option value="">Select a service</option>
                <option value="market-research">Market Research</option>
                <option value="business-consulting">Business Consulting</option>
                <option value="data-analytics">Data Analytics</option>
                <option value="brand-strategy">Brand Strategy</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.formTextarea}
                required
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <div className={styles.successMessage}>
                Thank you for contacting us! We'll get back to you soon.
              </div>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
