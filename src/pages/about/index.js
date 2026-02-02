import React from "react";
import styles from "./about.module.css";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const features = [
    {
      icon: "🔍",
      title: "Creative Analysis",
      description: "We explore novel and creative ways to analyze and present data in order to spot unnoticed trends."
    },
    {
      icon: "💡",
      title: "Strategic Design",
      description: "We ask questions, design studies, manage projects, analyze data, and dialogue with clients about our findings."
    },
    {
      icon: "📊",
      title: "Data Transformation",
      description: "We transform data into practical growth and revenue-generating plans for your company."
    },
    {
      icon: "🎯",
      title: "Informed Decisions",
      description: "We provide our clients with the tools they need to make informed business decisions."
    }
  ];

  const coreValues = [
    {
      title: "Customer Satisfaction & Transparency",
      description: "Every aspect of our business revolves around client satisfaction. We aim to build lifelong partnerships with our clients. Market research is about producing insights and building and maintaining human relationships and partnerships."
    },
    {
      title: "Innovation & Creativity",
      description: "We employ cutting-edge technology and a flexible strategy to conduct our study. We pay close attention to our process and make sure it serves the objectives of our clients."
    },
    {
      title: "In-depth Presentation & Reporting",
      description: "We don't just interpret and analyze data; we gather insight, spot patterns and trends through the analysis, and turn it into an actionable plan. We don't just leave our client; we do a follow-up to act as a guiding light."
    },
    {
      title: "Management Skills",
      description: "Market research involves working with different types of people: the client, respondents, employees, and customers. Hence, it requires top-notch managerial ability. As researchers, we pride ourselves on our steadfast organizational skills."
    }
  ];

  const workflowSteps = [
    "Ask questions",
    "Identify the problem",
    "Define the sample",
    "Develop a research plan",
    "Conduct the research",
    "Perform data collection",
    "Analyze the result",
    "Report presentation",
    "Decision making"
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Researchers.me</h1>
            <p className={styles.heroSubtitle}>
              Empowering businesses with data-driven insights and strategic research solutions
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={styles.whatWeDoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          <div className={styles.introText}>
            <p>
              We provide a wide range of solutions to investors, business startups seeking to establish a company with a talented team and a smooth operation, existing businesses looking to make a positive change in their business, or those willing to conduct market research and competitor analysis. Your sure partner is the researcher.
            </p>
            <p>
              We provide services ranging from business setup and consulting to qualitative and quantitative market surveys, customer experience and happiness analysis, business intelligence, loyalty and data analytics, integration, and management.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Uniqueness</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.coreValuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Core Values & Strengths</h2>
          <div className={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueNumber}>{String(index + 1).padStart(2, '0')}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Approach To Work</h2>
          <p className={styles.workflowIntro}>
            We follow a definitive process of evaluating the feasibility of understanding or examining the market associated with a new product or service. We meet directly with potential consumers by deploying surveys, interacting with a group of people, and conducting interviews. We always aim to achieve customer satisfaction, reduce customer churn, and make informed decisions.
          </p>
          <div className={styles.workflowSteps}>
            {workflowSteps.map((step, index) => (
              <div key={index} className={styles.workflowStep}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepText}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Enjoy the development of innovative products that resonate with your customers
            </h2>
            <p className={styles.ctaDescription}>
              Let us assist you optimize marketing campaigns by leveraging consumer insights and savor higher conversion rates and ROI
            </p>
            <Link href="/contact-us">
              <button className={styles.ctaButton}>Become a Client</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
