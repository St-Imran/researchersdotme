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

    // Fetch services data from backend API
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        // Find the service from the fetched data
        const findService = () => {
          for (const mainCat of data) {
            if (mainCat.subSections) {
              for (const subCat of mainCat.subSections) {
                // Check if this subcategory matches the slug
                const subCatSlug = subCat.title
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-");

                if (subCatSlug === slug) {
                  return {
                    ...subCat,
                    mainCategory: mainCat.title,
                    mainCategoryHeading: mainCat.heading,
                    level: 2,
                  };
                }

                // Check sub-subcategories
                if (subCat.subSections) {
                  for (const subSubCat of subCat.subSections) {
                    const subSubCatSlug = subSubCat.title
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-");

                    if (subSubCatSlug === slug) {
                      return {
                        ...subSubCat,
                        mainCategory: mainCat.title,
                        mainCategoryHeading: mainCat.heading,
                        subCategory: subCat.title,
                        subCategoryHeading: subCat.heading,
                        level: 3,
                      };
                    }
                  }
                }
              }
            }
          }
          return null;
        };

        const foundService = findService();
        setService(foundService);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load services data");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Error</h1>
          <p>{error}</p>
          <Link href="/services" className={styles.backButton}>
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link href="/services" className={styles.backButton}>
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/services">Services</Link>
        <span className={styles.separator}>›</span>
        <span>{service.mainCategory}</span>
        {service.subCategory && (
          <>
            <span className={styles.separator}>›</span>
            <span>{service.subCategory}</span>
          </>
        )}
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{service.title}</span>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            {service.level === 3 ? "Specialized Service" : "Service Category"}
          </div>
          <h1 className={styles.title}>{service.title}</h1>
          {service.heading && (
            <p className={styles.heading}>{service.heading}</p>
          )}
          {service.subTitle && (
            <p className={styles.subtitle}>{service.subTitle}</p>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Overview</h2>
          <p>
            {service.subTitle ||
              `${service.title} is a comprehensive service designed to help businesses achieve their goals through strategic planning and implementation.`}
          </p>
        </div>

        <div className={styles.section}>
          <h2>Key Benefits</h2>
          <div className={styles.benefits}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Strategic Insights</h3>
              <p>
                Gain actionable insights that drive informed decision-making and
                strategic planning.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Expert Guidance</h3>
              <p>
                Work with experienced professionals who understand your industry
                and challenges.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Measurable Results</h3>
              <p>
                Track progress and measure success with clear metrics and
                reporting.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Tailored Solutions</h3>
              <p>
                Customized approaches designed specifically for your business
                needs.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>How We Help</h2>
          <div className={styles.process}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <h3>Discovery & Assessment</h3>
              <p>
                We begin by understanding your current situation, challenges,
                and objectives.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <h3>Strategy Development</h3>
              <p>
                Our team develops a customized strategy tailored to your
                specific needs.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <h3>Implementation</h3>
              <p>
                We work with you to execute the strategy and achieve your goals.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <h3>Optimization & Support</h3>
              <p>
                Continuous monitoring and refinement to ensure sustained
                success.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Ready to Get Started?</h2>
          <p>
            Contact us today to learn more about how {service.title} can benefit
            your business.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
