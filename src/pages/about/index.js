import React from "react";
import styles from "./about.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const About = () => {
  const router = useRouter();
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
            </div>
          </div>
        </div>
      </div>
      <div className={styles.our__uniqueness}>
        <div className={styles.container}>
          <div className={styles.uniqueness}>
            <div className="text-justify h5">
              <p style={{ mt: "4" }}>
                We provide a wide range of solutions to investors, business startups seeking to establish a company with a talented team and a smooth operation, existing businesses looking to make a positive change in their business, or those willing to conduct market research and competitor analysis. Your sure partner is the researcher.
              </p>
              <p>
                We provide services ranging from business setup and consulting to qualitative and quantitative market surveys, customer experience and happiness analysis, business intelligence, loyalty and data analytics, integration, and management.
              </p>
            </div>

            <div>
              <h2>OUR UNIQUENESS</h2>
            </div>
            <div className={styles.cards}>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className={styles.card}>
                    <Image
                      src="/feature-1.jpg"
                      width={363}
                      height={363}
                      alt="bottleneck image"
                    />
                    <p>As researchers, we explore novel and creative ways to analyze and present data in order to spot unnoticed trends.</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.card}>
                    <Image
                      src="/feature-2.jpg"
                      width={363}
                      height={363}
                      alt="bottleneck image"
                    />
                    <p>We ask questions, design studies, manage projects, analyze data, and dialogue with clients about our findings.</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.card}>
                    <Image
                      src="/feature-3.jpg"
                      width={363}
                      height={363}
                      alt="bottleneck image"
                    />
                    <p>We transform data into practical growth and revenue-generating plans for your company. </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={styles.card}>
                    <Image
                      src="/feature-1.jpg"
                      width={363}
                      height={363}
                      alt="bottleneck image"
                    />
                    <p>We provide our clients with the tools they need to make informed business decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.about__services}>
            <div>
              <h3>Customer satisfaction and transparency</h3>
              <p>
                Every aspect of our business revolves around client satisfaction. We aim to build lifelong partnerships with our clients. Market research is about producing insights and building and maintaining human relationships and partnerships.
              </p>
            </div>
            <div>
              <h3>Innovation and <br /> creativity</h3>
              <p>
                We employ cutting-edge technology and a flexible strategy to conduct our study. We pay close attention to our process and make sure it serves the objectives of our clients.
              </p>
            </div>
            <div>
              <h3>In-depth presentation and reporting skills</h3>
              <p>
                We don't just interpret and analyze data; we gather insight, spot patterns and trends through the analysis, and turn it into an actionable plan. We don't just leave our client; we do a follow-up to act as a guiding light.
              </p>
            </div>
            <div>
              <h3>Skills  <br /> in  <br />management</h3>
              <p>Market research involves working with different types of people: the client, respondents, employees, and customers. Hence, it requires top-notch managerial ability. As researchers, we pride ourselves on our steadfast organizational skills.</p>
            </div>
          </div>
          <div className={`${styles.uniqueness} ${styles.second}`}>
            <div>
              <h2>Our Approach To Work</h2>
              <p>
                We follow a definitive process of evaluating the feasibility of understanding or examining the market associated with a new product or service. We meet directly with potential consumers by deploying surveys, interacting with a group of people, and conducting interviews. We always aim to achieve customer satisfaction, reduce customer churn, and make informed decisions. We do these by following the below-listed steps.
              </p>
            </div>
            <div></div>
          </div>
          <div className={styles.about__options}>
            <h5><span>1.	Ask questions</span></h5>
            <h5><span>2.	Identify the problem.</span></h5>
            <h5><span>3.	Define the sample.</span></h5>
            <h5><span>4.	Develop a research plan.</span></h5>
            <h5><span>5.	Conduct the research.</span></h5>
            <h5><span>6.	Perform data collection.</span></h5>
            <h5><span>7.	Analyze the result.</span></h5>
            <h5><span>8.	Report presentation.</span></h5>
            <h5><span>9.	Decision making</span></h5>
          </div>
        </div>
      </div>
      <div className={styles.about__cta}>
        <h2>Enjoy the development of innovative products that resonate with your customers. </h2>
        <p>Let us assist you optimize marketing campaigns by leveraging consumer insights and savor higher conversion rates and ROI</p>
        <button onClick={() => router.push('/contact')}>BECOME A CLIENT</button>
      </div>
    </>
  );
};

export default About;
