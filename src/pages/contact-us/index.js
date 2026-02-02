import { useState } from "react";
import styles from "./ContactNew.module.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "+971",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Optional field
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Local number should be 8-12 digits (covers most countries)
    // UAE: 9 digits, India: 10 digits, USA: 10 digits, etc.
    return digitsOnly.length >= 8 && digitsOnly.length <= 12;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits and spaces
    const sanitized = value.replace(/[^\d\s]/g, '');
    // Limit to 12 digits
    const digitsOnly = sanitized.replace(/\D/g, '');
    if (digitsOnly.length <= 12) {
      if (validationErrors.phone) {
        setValidationErrors(prev => ({
          ...prev,
          phone: ""
        }));
      }

      setFormData((prev) => ({
        ...prev,
        phone: sanitized,
      }));
    }
  };

  const validateName = (name) => {
    // Name should be at least 2 characters and only contain letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      errors.name = "Name should be 2-50 characters and contain only letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
8-12
    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      errors.message = "Message must not exceed 1000 characters";
    }

    // Company validation (optional but limited length if provided)
    if (formData.company && formData.company.length > 100) {
      errors.company = "Company name must not exceed 100 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact-us", {
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
                  className={`${styles.formInput} ${validationErrors.name ? styles.inputError : ''}`}
                  placeholder="John Doe"
                  maxLength={50}
                />
                {validationErrors.name && (
                  <span className={styles.errorText}>{validationErrors.name}</span>
                )}
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
                  className={`${styles.formInput} ${validationErrors.email ? styles.inputError : ''}`}
                  placeholder="john@example.com"
                />
                {validationErrors.email && (
                  <span className={styles.errorText}>{validationErrors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.formLabel}>
                  Country Code
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={styles.formSelect}
                >
                  <option value="+971">🇦🇪 UAE (+971)</option>
                  <option value="+91">🇮🇳 India (+91)</option>
                  <option value="+1">🇺🇸 USA (+1)</option>
                  <option value="+44">🇬🇧 UK (+44)</option>
                  <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                  <option value="+974">🇶🇦 Qatar (+974)</option>
                  <option value="+965">🇰🇼 Kuwait (+965)</option>
                  <option value="+973">🇧🇭 Bahrain (+973)</option>
                  <option value="+968">🇴🇲 Oman (+968)</option>
                  <option value="+20">🇪🇬 Egypt (+20)</option>
                  <option value="+962">🇯🇴 Jordan (+962)</option>
                  <option value="+961">🇱🇧 Lebanon (+961)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`${styles.formInput} ${validationErrors.phone ? styles.inputError : ''}`}
                  placeholder="50 123 4567"
                  maxLength={14}
                />
                {validationErrors.phone && (
                  <span className={styles.errorText}>{validationErrors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
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
                  className={`${styles.formInput} ${validationErrors.company ? styles.inputError : ''}`}
                  placeholder="Your Company"
                  maxLength={100}
                />
                {validationErrors.company && (
                  <span className={styles.errorText}>{validationErrors.company}</span>
                )}
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
                className={`${styles.formTextarea} ${validationErrors.message ? styles.inputError : ''}`}
                placeholder="Tell us about your project..."
                rows={5}
                maxLength={1000}
              />
              <div className={styles.charCount}>
                {formData.message.length}/1000 characters
              </div>
              {validationErrors.message && (
                <span className={styles.errorText}>{validationErrors.message}</span>
              )}
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
