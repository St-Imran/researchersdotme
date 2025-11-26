import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ title, subtitle, description, bg, link }) => (
  <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
    <Link href={link} className="text-dark">
      <div
        className="card text-dark card-has-bg click-col"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="card-img-overlay d-flex flex-column">
          <div className="card-body">
            <small className="card-meta mb-2">{subtitle}</small>
            <h4 className="h2 card-title mt-0">{title}</h4>
            <small className="card-meta">{description}</small>
          </div>
          <div className="card-footer">
            <div className="media">
              <h6 className="h2 my-0 text-dark d-block">
                View In Details
                <Image src="/link.svg" height={20} width={22} alt="link icon" />
              </h6>
              <small className="text-dark">{title}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const CardMenu = ({ data, pageDescription, pageTitle }) => (
  <div style={{ minHeight: "95vh" }}>
    <div className="container">
      <div className="row">
        <div className="col text-center my-5">
          <h1 className="display-4 font-weight-bolder">{pageTitle}</h1>
          <p className="lead">{pageDescription}</p>
        </div>
      </div>
      <div className="row justify-content-center">
        {data.map((service, index) => (
          <Card key={index} {...service} />
        ))}
      </div>
    </div>
  </div>
);

export default CardMenu;
