import React from "react";
import styles from "./about.module.css";

const About = () => {
  return (
    <>
      {/* <Title
        text="ABOUT US"
        img="https://www.researchers.me/wp-content/uploads/2023/06/pexels-aleksandar-pasaric-2603464.png"
      /> */}
      <div className={styles.about__main}>
        <div className={styles.container}>
          <div className={styles.about__wrapper}>
            <div>
              <h2 className={styles.page_banner__title}>WHAT DO WE DO?</h2>
              <p style={{ mt: "4" }}>
                We provide a wide range of solutions to investors, business
                startups seeking to establish a company with a talented team and
                a smooth operation, existing businesses looking to make a
                positive change in their business, or those willing to conduct
                market research and competitor analysis. Your sure partner is
                the researcher.
              </p>
              <p>
                We provide services ranging from business setup and consulting
                to qualitative and quantitative market surveys, customer
                experience and happiness analysis, business intelligence,
                loyalty and data analytics, integration, and management.
              </p>
              <button>Read More</button>
            </div>
            <div>
              <img
                src="https://go.forrester.com/wp-content/uploads/2020/09/BoldAtWork-Hero.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.our__uniqueness}>
        <div className={styles.container}>
          <div className={styles.uniqueness}>
            <div>
              <h2>Our Uniqueness</h2>
              <p>
                As researchers, we explore novel and creative ways to analyze
                and present data in order to spot unnoticed trends.
              </p>
            </div>
            <div></div>
          </div>
          <div className={styles.about__services}>
            <div>
              <h3>Customer satisfaction and transparency</h3>
              <p>
                Every aspect of our business revolves around client
                satisfaction. We aim to build lifelong partnerships with our
                clients. Market research is about producing insights and
                building and maintaining human relationships and partnerships.
              </p>
            </div>
            <div>
              <h3>Innovation and creativity</h3>
              <p>
                We employ cutting-edge technology and a flexible strategy to
                conduct our study. We pay close attention to our process and
                make sure it serves the objectives of our clients.
              </p>
            </div>
            <div>
              <h3>Effective management skills</h3>
              <p>
                Market research involves working with different types of people:
                the client, respondents, employees, and customers. Hence, it
                requires top-notch managerial ability. As researchers, we pride
                ourselves on our steadfast organizational skills.
              </p>
            </div>
          </div>
          <div className={`${styles.uniqueness} ${styles.second}`}>
            <div>
              <h2>Our Approach To Work</h2>
              <p>
                We follow a definitive process of evaluating the feasibility of
                understanding or examining the market associated with a new
                product or service. We meet directly with potential consumers by
                deploying surveys, interacting with a group of people, and
                conducting interviews. We always aim to achieve customer
                satisfaction, reduce customer churn, and make informed
                decisions. We do these by following the below-listed steps.
              </p>
            </div>
            <div></div>
          </div>
          <div className={styles.about__options}>
          <h5><span>Ask questions</span></h5>
          <h5><span>Identify the problem.</span></h5>
          <h5><span>Define the sample.</span></h5>
          <h5><span>Develop a research plan.</span></h5>
          <h5><span>Conduct the research.</span></h5>
          <h5><span>Perform data collection</span></h5>
          <h5><span>Analyze the result.</span></h5>
          <h5><span>Report presentation</span></h5>
          <h5><span>Decision making</span></h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
