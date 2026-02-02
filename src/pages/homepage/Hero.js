import style from "./Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();
  
  return (
    <>
      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className="container">
          <div className={style.heroContent}>
            <div className={style.heroText}>
              <h1 className={style.heroTitle}>
                Data-Driven Insights for Strategic Business Growth
              </h1>
              <p className={style.heroDescription}>
                Transform your business decisions with comprehensive market research, 
                advanced analytics, and strategic consulting services tailored for the UAE and beyond.
              </p>
              <div className={style.heroButtons}>
                <button 
                  className={style.primaryBtn}
                  onClick={() => router.push("/contact-us")}
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                  </svg>
                </button>
                <button 
                  className={style.secondaryBtn}
                  onClick={() => router.push("/services")}
                >
                  Explore Services
                </button>
              </div>
            </div>
            <div className={style.heroImage}>
              <div className={style.imageWrapper}>
                <Image
                  src="/frame-boy.png"
                  width={500}
                  height={500}
                  alt="Research Analytics"
                  className={style.floatingImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={style.statsSection}>
        <div className="container">
          <div className={style.statsGrid}>
            <div className={style.statCard}>
              <div className={style.statNumber}>500+</div>
              <div className={style.statLabel}>Projects Completed</div>
            </div>
            <div className={style.statCard}>
              <div className={style.statNumber}>200+</div>
              <div className={style.statLabel}>Happy Clients</div>
            </div>
            <div className={style.statCard}>
              <div className={style.statNumber}>15+</div>
              <div className={style.statLabel}>Years Experience</div>
            </div>
            <div className={style.statCard}>
              <div className={style.statNumber}>98%</div>
              <div className={style.statLabel}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={style.whatWeDoSection}>
        <div className="container">
          <div className={style.sectionHeader}>
            <h2 className={style.sectionTitle}>What We Do</h2>
            <p className={style.sectionDescription}>
              Empowering businesses with data-driven insights and strategic solutions
            </p>
          </div>
          <div className={style.servicesGrid}>
            <div className={style.serviceCard}>
              <div className={style.serviceIcon}>📊</div>
              <h3 className={style.serviceTitle}>Market Research</h3>
              <p className={style.serviceDescription}>
                Comprehensive market analysis, feasibility studies, and competitive intelligence 
                to guide your business decisions.
              </p>
              <Link href="/services" className={style.serviceLink}>
                Learn More →
              </Link>
            </div>
            <div className={style.serviceCard}>
              <div className={style.serviceIcon}>💼</div>
              <h3 className={style.serviceTitle}>Business Consulting</h3>
              <p className={style.serviceDescription}>
                Strategic planning, process optimization, and growth strategies 
                tailored to your unique business needs.
              </p>
              <Link href="/services" className={style.serviceLink}>
                Learn More →
              </Link>
            </div>
            <div className={style.serviceCard}>
              <div className={style.serviceIcon}>📈</div>
              <h3 className={style.serviceTitle}>Data Analytics</h3>
              <p className={style.serviceDescription}>
                Advanced analytics, business intelligence, and data visualization 
                to unlock actionable insights from your data.
              </p>
              <Link href="/services" className={style.serviceLink}>
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={style.whyChooseSection}>
        <div className="container">
          <div className={style.sectionHeader}>
            <h2 className={style.sectionTitle}>Why Choose Researchers</h2>
            <p className={style.sectionDescription}>
              Your trusted partner for data-driven business transformation
            </p>
          </div>
          <div className={style.benefitsGrid}>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>🎯</div>
              <h3>Tailored Solutions</h3>
              <p>Customized research and consulting services designed specifically for your business objectives.</p>
            </div>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>🔬</div>
              <h3>Expert Team</h3>
              <p>Seasoned professionals with deep expertise across industries and research methodologies.</p>
            </div>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>⚡</div>
              <h3>Rapid Delivery</h3>
              <p>Fast turnaround times without compromising on quality or accuracy of insights.</p>
            </div>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>🌍</div>
              <h3>Global Reach</h3>
              <p>Local expertise in the UAE with capabilities to support projects worldwide.</p>
            </div>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>💡</div>
              <h3>Actionable Insights</h3>
              <p>Clear, practical recommendations that drive measurable business results.</p>
            </div>
            <div className={style.benefitCard}>
              <div className={style.benefitIcon}>🤝</div>
              <h3>Partnership Approach</h3>
              <p>Collaborative engagement ensuring alignment with your strategic goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={style.ctaSection}>
        <div className="container">
          <div className={style.ctaContent}>
            <h2 className={style.ctaTitle}>Ready to Transform Your Business?</h2>
            <p className={style.ctaDescription}>
              Let's discuss how our research and consulting services can help you achieve your goals. 
              Schedule a free consultation today.
            </p>
            <button 
              className={style.ctaButton}
              onClick={() => router.push("/contact-us")}
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
