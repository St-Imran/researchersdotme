import React from "react";
import FeasibilityStudies from "./innerPages/feasibilityStudies";
import DataStoryTelling from "./innerPages/dataStoryTelling";
import MarketResearchAndMeasureMent from "./innerPages/marketResearchAndmeasurement";
import Analytics from "./innerPages/analytics";
import BusinessIntelligence from "./businessIntelligence";
import BusinessAnalysis from "./innerPages/BusinessAnalysis.";
import Loyality from "./innerPages/loyality";
import Technology from "./innerPages/technology";

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
      <FeasibilityStudies />
      <DataStoryTelling />
      <MarketResearchAndMeasureMent />
      <Analytics />
      <BusinessIntelligence />
      <BusinessAnalysis />
      <Technology />
      <Loyality />
    </>
  );
};

export default Services;
