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
              <Link href="/services/innerPages/feasibilityStudies" >
                <div className="card text-dark card-has-bg click-col" style={styles.bg} >
                  <div className="card-img-overlay d-flex flex-column">
                    <div className="card-body">
                      <small className="card-meta mb-2">
                        Unraveling practicality
                      </small>
                      <h4 className="h1 card-title mt-0 ">
                        FEASIBILITY STUDIES
                      </h4>
                      <small className="card-meta">
                        <i className="far fa-clock"></i>Ever wondered how ideas
                        transform into successful business projects?
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">FEASIBILITY STUDIES</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link
                className="text-dark"
                href="/services/innerPages/dataStoryTelling"
              >
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
                      <h4 className="h1 card-title mt-0 ">
                        Data Story Telling
                      </h4>
                      <small className="card-meta">
                        <i className="far fa-clock"></i> The key to turning raw
                        data into a compelling narrative
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Data Story Telling</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link
                className="text-dark"
                href="/services/marketResearchAndMeasurement"
              >
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
                      <h4 className="h1 card-title mt-0 ">
                        Market Research And Measurement
                      </h4>
                      <small className="card-meta">Customer Experience And Happiness</small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Market Research And Measurement
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link className="text-dark" href="/services/analytics">
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
                      <h4 className="h1 card-title mt-0 ">
                        Analytics
                      </h4>
                      <small className="card-meta">Performance monitoring</small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Analytics</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link
                className="text-dark"
                href="/services/businessIntelligence"
              >
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
                      <h4 className="h1 card-title mt-0 ">
                        Business Intelligence
                      </h4>
                      <small className="card-meta">
                        The collection and analysis of business information
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Business Intelligence
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link
                className="text-dark"
                href="/services/businessAnalytics"
              >
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
                      <h4 className="h1 card-title mt-0 ">
                        Business Analysis
                      </h4>
                      <small className="card-meta">
                        Insights to facilitate informed decision-making
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Business Analysis</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link className="text-dark" href="/services/technology">
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
                      <h4 className="h1 card-title mt-0 ">
                        Technology
                      </h4>
                      <small className="card-meta">
                        A strategic approach to leverage its full potential
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Technology</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <Link
                className="text-dark"
                href="/services/innerPages/designingAndImplementationOfLoyaltyAndRewardsProgram"
              >
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
                      <h4 className="h1 card-title mt-0 ">
                        Designing & Implementation of Loyalty & Rewards program
                      </h4>
                      <small className="card-meta">
                        <i className="far fa-clock"></i> October 15, 2020
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <h6 className="h2 my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Designing & Implementation of Loyalty & Rewards
                          program
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
