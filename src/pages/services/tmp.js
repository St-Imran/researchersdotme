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
            <div className="col text-center mb-5">
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
                      <Link className="text-dark" href="/feasibilityStudies">
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
                      <a href="" className="media-body">
                        <h6 className="my-0 text-dark d-block">
                          View In Details
                          <Image src="/link.svg" height={20} width={22} />
                        </h6>
                        <small>Our Services</small>
                      </a>
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
