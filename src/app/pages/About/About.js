import React from "react";
import Title from "../../Common/Title/Title";
import './About.css'

const About = () => {
  return (
    <>
      <Title
        text="ABOUT US"
        img="https://www.researchers.me/wp-content/uploads/2023/06/pexels-aleksandar-pasaric-2603464.png"
      />
      <div>
        <h2>WHAT DO WE DO?</h2>
        <p style={{ mt: "4" }}>
          We provide a wide range of solutions to investors, business startups
          seeking to establish a company with a talented team and a smooth
          operation, existing businesses looking to make a positive change in
          their business, or those willing to conduct market research and
          competitor analysis. Your sure partner is the researcher.
        </p>
        <p>
          We provide services ranging from business setup and consulting to
          qualitative and quantitative market surveys, customer experience and
          happiness analysis, business intelligence, loyalty and data analytics,
          integration, and management.
        </p>
        <button>Read More</button>
      </div>
    </>
  );
};

export default About;
