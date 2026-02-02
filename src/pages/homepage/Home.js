import Image from "next/image";
import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Empower Your Business With Data-Driven Insights
          </h1>
          <p className={styles.heroDescription}>
            Our research experts guide you to make informed decisions that help
            you stay ahead of the competition.
          </p>
          <Link href="/contact-us">
            <button className={styles.heroButton}>Get Started</button>
          </Link>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/hero-image.png"
            alt="Hero Image"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.serviceList}>
          <div className={styles.serviceItem}>
            <h3>Market Research</h3>
            <p>
              We conduct comprehensive market research to identify customer
              needs, preferences, and trends.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Customer Insights</h3>
            <p>
              Understanding your customers is key to success. Our team provides
              actionable insights.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Competitor Analysis</h3>
            <p>
              Analyze your competitors' strengths and weaknesses to craft a
              winning strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials or Client Logos Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <div className={styles.testimonialList}>
          <div className={styles.testimonialItem}>
            <p>
              "Researchers.me provided us with incredible insights that helped
              drive our growth."
            </p>
            <span>- Client A</span>
          </div>
          <div className={styles.testimonialItem}>
            <p>
              "The data we received from the research team was top-notch and
              truly game-changing."
            </p>
            <span>- Client B</span>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.caseStudies}>
        <h2 className={styles.sectionTitle}>Case Studies</h2>
        <div className={styles.caseStudyList}>
          <div className={styles.caseStudyItem}>
            <Image
              src="/case1.jpg"
              width={300}
              height={200}
              alt="Case Study 1"
            />
            <h3>Case Study 1</h3>
            <p>
              A comprehensive research project that provided crucial insights
              into customer behavior.
            </p>
          </div>
          <div className={styles.caseStudyItem}>
            <Image
              src="/case2.jpg"
              width={300}
              height={200}
              alt="Case Study 2"
            />
            <h3>Case Study 2</h3>
            <p>
              We helped a client successfully launch a new product based on
              in-depth market research.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.contactText}>
          Ready to unlock your business potential? Reach out to our team to
          discuss how we can help you.
        </p>
        <Link href="/contact-us">
          <button className={styles.contactButton}>Contact Us</button>
        </Link>
      </section>
    </main>
  );
}
