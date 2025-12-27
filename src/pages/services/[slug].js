import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ServiceDetail.module.css";

const ServiceDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    
    // Fetch service directly from backend by slug
    fetch(`http://localhost:5000/api/services/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Service not found');
        }
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.serviceDetailContainer}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading service details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className={styles.serviceDetailContainer}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Service Not Found</h1>
            <p>The service you're looking for doesn't exist or hasn't been added yet.</p>
            <Link href="/services" className={styles.backButtonLink}>
              ← Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.serviceDetailContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbSection}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/services">Services</Link>
            <span className={styles.separator}>›</span>
            {service.category && (
              <>
                <Link href="/services">{service.category}</Link>
                <span className={styles.separator}>›</span>
              </>
            )}
            {service.mainCategory && service.mainCategory !== service.category && (
              <>
                <Link href="/services">{service.mainCategory}</Link>
                <span className={styles.separator}>›</span>
              </>
            )}
            {service.subCategory && (
              <>
                <Link href="/services">{service.subCategory}</Link>
                <span className={styles.separator}>›</span>
              </>
            )}
            <span className={styles.current}>{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              {service.category || service.mainCategory || "Professional Service"}
            </div>
            <h1 className={styles.heroTitle}>{service.title}</h1>
            {service.heading && service.heading !== service.title && (
              <p className={styles.heroHeading}>{service.heading}</p>
            )}
            {service.subTitle && (
              <p className={styles.heroSubtitle}>{service.subTitle}</p>
            )}
            {service.description && (
              <p className={styles.heroDescription}>{service.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* If service has HTML content, render it */}
          {service.content ? (
            <div 
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          ) : (
            // Fallback to default template if no content
            <>
              <div className={styles.section}>
                <h2>Overview</h2>
                <p>
                  {service.description || service.subTitle ||
                    `${service.title} is a comprehensive service designed to help businesses achieve their goals through strategic planning and implementation.`}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className={styles.section}>
                  <h2>Key Features</h2>
                  <div className={styles.featuresGrid}>
                    {service.features.map((feature, index) => (
                      <div key={index} className={styles.featureCard}>
                        <div className={styles.featureIcon}>✓</div>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div className={styles.section}>
                  <h2>Benefits</h2>
                  <div className={styles.benefitsGrid}>
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className={styles.benefitCard}>
                        <div className={styles.benefitIcon}>⭐</div>
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <h2>How We Help</h2>
                <div className={styles.processSteps}>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>1</div>
                    <h3>Discovery & Assessment</h3>
                    <p>We begin by understanding your current situation, challenges, and objectives.</p>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>2</div>
                    <h3>Strategy Development</h3>
                    <p>Our team develops a customized strategy tailored to your specific needs.</p>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>3</div>
                    <h3>Implementation</h3>
                    <p>We work with you to execute the strategy and achieve your goals.</p>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>4</div>
                    <h3>Optimization & Support</h3>
                    <p>Continuous monitoring and refinement to ensure sustained success.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2>Ready to Get Started?</h2>
            <p>
              Contact us today to learn more about how {service.title} can benefit your business.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
