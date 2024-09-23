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
const Web30 = () => {
  return (
    <>
      <div style={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col text-center my-5">
              <h1 className="display-4 font-weight-bolder">Web 3.0</h1>
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
                        href="/services/innerPages/web30"
                      >
                        WEB 3.0
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
                        href="/services/innerPages/web30"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">WEB 3.0</small>
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
                        href="/services/innerPages/web30StrategyAndConsultation"
                      >
                        Web 3.0 Strategy & Consultation
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
                        href="/services/innerPages/web30StrategyAndConsultation"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">
                          Web 3.0 Strategy & Consultation
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
                        href="/services/innerPages/ideation"
                      >
                        Ideation
                      </Link>
                    </h4>
                    <small>Customer Experience And Happiness</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/ideation"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Ideation</small>
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
                        href="/services/innerPages/tokenomics"
                      >
                        Tokenomics
                      </Link>
                    </h4>
                    <small>Performance monitoring</small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/tokenomics"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Tokenomics</small>
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
                        href="/services/innerPages/marketMaking"
                      >
                        Market Making
                      </Link>
                    </h4>
                    <small>
                      The collection and analysis of business information
                    </small>
                  </div>
                  <div className="card-footer">
                    <div className="media">
                      <Link
                        href="/services/innerPages/marketMaking"
                        className="media-body"
                      >
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small className="text-dark">Market Making</small>
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

export default Web30;
