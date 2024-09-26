import React from "react";
import Image from "next/image";
import Link from "next/link";

const styles = {
  main: {
    minHeight: "95vh",
  },
  bg: {
    backgroundImage: "url('/card1.webp')",
  },
  bg2: {
    backgroundImage: "url('/card2.webp')",
  },
  bg3: {
    backgroundImage: "url('/card3.webp')",
  },
  bg4: {
    backgroundImage: "url('/card3.webp')",
  },
  bg5: {
    backgroundImage: "url('/card2.webp')",
  },
  bg6: {
    backgroundImage: "url('/card1.webp')",
  },
  mxWidth: {
    maxWidth: "50px",
  },
};

const data = [
  {
    heading: "Unraveling practicality",
    title: "FEASIBILITY STUDIES",
    subTitle:
      "Ever wondered how ideas transform into successful business projects?",
    url: "/services/innerPages/feasibilityStudies",
  },
  {
    heading: "Marketing approach",
    title: "Data Story Telling",
    subTitle: "The key to turning raw data into a compelling narrative",
    url: "http://localhost:3000/services/innerPages/dataStoryTelling",
  },
  {
    heading: "Employee Satisfaction",
    title: "Market Research And Measurement",
    subTitle: "Customer Experience And Happiness",
    url: "http://localhost:3000/services/marketResearchAndMeasurement",
    subSections: [
      {
        heading: "Mystery Shopping",
        title: "Mystery Shopping",
        subTitle:
          "Ever wondered how ideas transform into successful business projects?",
        url: "http://localhost:3000/services/innerPages/mystreyShopping",
      },
      {
        heading: "Marketing approach",
        title: "Customers Experience And Happiness",
        subTitle: "The key to turning raw data into a compelling narrative",
        url: "http://localhost:3000/services/innerPages/customerExperienceAndHappiness",
      },
      {
        heading: "Employee Satisfaction",
        title: "AEMPLOYEE SATISFACTION AND ENGAGEMENT",
        subTitle: "Customer Experience And Happiness",
        url: "http://localhost:3000/services/innerPages/employeeEngagementAndSatisfaction",
      },
      {
        heading: "Master The Data",
        title: "Quаntіtаtіvе Аnd Quаlіtаtіvе Аnаlуѕіѕ",
        subTitle: "Performance monitoring",
        url: "http://localhost:3000/services/innerPages/qAnalysis",
      },
      {
        heading: "Faster decisions",
        title: "BRAND POSITIONING AND BENCHMARKING",
        subTitle: "The collection and analysis of business information",
        url: "http://localhost:3000/services/innerPages/brandPositioningAndBenchmarking",
      },
      {
        heading: "In-depth process",
        title: "СОMРЕTІTОR АNАLУЅІЅ",
        subTitle: "Insights to facilitate informed decision-making",
        url: "http://localhost:3000/services/innerPages/competitorAnalysis",
      },
      {
        heading: "Digital transformation",
        title: "MАRKЕTІNG СОNЅULTІNG",
        subTitle: "A strategic approach to leverage its full potential",
        url: "http://localhost:3000/services/innerPages/marketingConsulting",
        subSections: [
          {
            heading: "Mystery Shopping",
            title: "Dashboard and Reporting",
            subTitle:
              "Ever wondered how ideas transform into successful business projects?",
            url: "http://localhost:3000/services/innerPages/dashboardAndReporting",
          },
          {
            heading: "Marketing approach",
            title: "Data analytics",
            subTitle: "The key to turning raw data into a compelling narrative",
            url: "http://localhost:3000/services/innerPages/dataAnalytics",
          },
          {
            heading: "Employee Satisfaction",
            title: "Master Data Management (MDM)",
            subTitle: "Customer Experience And Happiness",
            url: "http://localhost:3000/services/innerPages/masterDataManagement",
          },
          {
            heading: "Master The Data",
            title: "QUАNTІTАTІVЕ АND QUАLІTАTІVЕ АNАLУЅІЅ",
            subTitle: "Performance monitoring",
            url: "http://localhost:3000/services/innerPages/%D4%9Bu%D0%B0nt%D1%96t%D0%B0t%D1%96v%D0%B5AndQu%D0%B0l%D1%96t%D0%B0t%D1%96v%D0%B5Analysis",
          },
          {
            heading: "",
            title: "",
            subTitle: "",
            url: "",
          },
        ],
      },
    ],
  },
  {
    heading: "Master The Data",
    title: "Analytics",
    subTitle: "Performance monitoring",
    url: "http://localhost:3000/services/analytics",
  },
  {
    heading: "Faster decisions",
    title: "Business Intelligence",
    subTitle: "The collection and analysis of business information",
    url: "http://localhost:3000/services/businessIntelligence",
  },
  {
    heading: "In-depth process",
    title: "Business Analysis",
    subTitle: "Insights to facilitate informed decision-making",
    url: "http://localhost:3000/services/businessAnalytics",
  },
  {
    heading: "Digital transformation",
    title: "Technology",
    subTitle: "A strategic approach to leverage its full potential",
    url: "http://localhost:3000/services/technology",
  },
  {
    heading: "Thought Leadership",
    title: "Designing & Implementation of Loyalty & Rewards program",
    subTitle: "October 15, 2020",
    url: "http://localhost:3000/services/innerPages/designingAndImplementationOfLoyaltyAndRewardsProgram",
  },
];

const Services = () => {
  return (
    <>
      <div style={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col text-center my-5">
              <h1 className="display-4 font-weight-bolder">Our Services</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet at enim hac integer volutpat maecenas
                pulvinar.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg}
              >
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">
                      Unraveling practicality
                    </small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/innerPages/feasibilityStudies"
                      >
                        FEASIBILITY STUDIES
                      </Link>
                    </h4>
                    <small>
                      <i className="far fa-clock"></i>Ever wondered how ideas
                      transform into successful business projects?
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/feasibilityStudies"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">FEASIBILITY STUDIES</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg2}
              >
                <Image
                  className="card-img d-none"
                  src="/card2.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">Marketing approach</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/innerPages/dataStoryTelling"
                      >
                        Data Story Telling
                      </Link>
                    </h4>
                    <small>
                      <i className="far fa-clock"></i> The key to turning raw
                      data into a compelling narrative
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/dataStoryTelling"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Data Story Telling</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg3}
              >
                <Image
                  className="card-img d-none"
                  src="/card3.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">
                      Employee Satisfaction
                    </small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/marketResearchAndMeasurement"
                      >
                        Market Research And Measurement
                      </Link>
                    </h4>
                    <small>Customer Experience And Happiness</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/marketResearchAndMeasurement"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Market Research And Measurement
                        </small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg4}
              >
                <Image
                  className="card-img d-none"
                  src="/card3.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">Master The Data</small>
                    <h4 className="card-title mt-0 ">
                      <Link className="text-dark" href="/services/analytics">
                        Analytics
                      </Link>
                    </h4>
                    <small>Performance monitoring</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link href="/services/analytics" className="media-body">
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Analytics</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg5}
              >
                <Image
                  className="card-img d-none"
                  src="/card2.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">Faster decisions</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/businessIntelligence"
                      >
                        Business Intelligence
                      </Link>
                    </h4>
                    <small>
                      The collection and analysis of business information
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/businessIntelligence"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Business Intelligence
                        </small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg6}
              >
                <Image
                  className="card-img d-none"
                  src="/card1.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">In-depth process</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/businessAnalytics"
                      >
                        Business Analysis
                      </Link>
                    </h4>
                    <small>
                      Insights to facilitate informed decision-making
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/businessAnalytics"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Business Analysis</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg6}
              >
                <Image
                  className="card-img d-none"
                  src="/card1.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">
                      Digital transformation
                    </small>
                    <h4 className="card-title mt-0 ">
                      <Link className="text-dark" href="/services/technology">
                        Technology
                      </Link>
                    </h4>
                    <small>
                      A strategic approach to leverage its full potential
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link href="/services/technology" className="media-body">
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Technology</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div
                className="card text-dark card-has-bg click-col"
                style={styles.bg6}
              >
                <Image
                  className="card-img d-none"
                  src="/card1.webp"
                  width={600}
                  height={900}
                  alt="Picture"
                />
                <div className="card-img-overlay d-flex flex-column">
                  <div className="card-body">
                    <small className="card-meta mb-2">Thought Leadership</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/innerPages/designingAndImplementationOfLoyaltyAndRewardsProgram"
                      >
                        Designing & Implementation of Loyalty & Rewards program
                      </Link>
                    </h4>
                    <small>
                      <i className="far fa-clock"></i> October 15, 2020
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/designingAndImplementationOfLoyaltyAndRewardsProgram"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Designing & Implementation of Loyalty & Rewards
                          program
                        </small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
