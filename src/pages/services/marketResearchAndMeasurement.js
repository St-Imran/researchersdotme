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
const MarketResearchAndMeasurement = () => {
  return (
    <>
      <div style={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col text-center my-5">
              <h1 className="display-4 font-weight-bolder">
                Market Research And Measurement
              </h1>
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
                    <small className="card-meta mb-2">Mystery Shopping</small>
                    <h4 className="card-title mt-0 ">
                      <Link
                        className="text-dark"
                        href="/services/innerPages/mystreyShopping"
                      >
                        Mystery Shopping
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
                        href="/services/innerPages/mystreyShopping"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Mystery Shopping</small>
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
                        href="/services/innerPages/customerExperienceAndHappiness"
                      >
                        Customers Experience And Happiness
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
                        href="/services/innerPages/customerExperienceAndHappiness"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Customers Experience And Happiness
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
                        href="/services/innerPages/employeeEngagementAndSatisfaction"
                      >
                        EMPLOYEE SATISFACTION AND ENGAGEMENT
                      </Link>
                    </h4>
                    <small>Customer Experience And Happiness</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/employeeEngagementAndSatisfaction"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          EMPLOYEE SATISFACTION AND ENGAGEMENT
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
                      <Link
                        className="text-dark"
                        href="/services/innerPages/qAnalysis"
                      >
                        QUАNTІTАTІVЕ АND QUАLІTАTІVЕ АNАLУЅІЅ
                      </Link>
                    </h4>
                    <small>Performance monitoring</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/qAnalysis"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          QUАNTІTАTІVЕ АND QUАLІTАTІVЕ АNАLУЅІЅ
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
                        href="/services/innerPages/brandPositioningAndBenchmarking"
                      >
                        BRAND POSITIONING AND BENCHMARKING
                      </Link>
                    </h4>
                    <small>
                      The collection and analysis of business information
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/brandPositioningAndBenchmarking"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          BRAND POSITIONING AND BENCHMARKING
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
                        href="/services/innerPages/competitorAnalysis"
                      >
                        СОMРЕTІTОR АNАLУЅІЅ
                      </Link>
                    </h4>
                    <small>
                      Insights to facilitate informed decision-making
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/competitorAnalysis"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">СОMРЕTІTОR АNАLУЅІЅ</small>
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
                      <Link
                        className="text-dark"
                        href="/services/innerPages/marketingConsulting"
                      >
                        MАRKЕTІNG СОNЅULTІNG
                      </Link>
                    </h4>
                    <small>
                      A strategic approach to leverage its full potential
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/marketingConsulting"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          MАRKЕTІNG СОNЅULTІNG
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

export default MarketResearchAndMeasurement;
