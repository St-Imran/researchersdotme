const { default: CardMenu } = require("@/Common/CardMenu/CardMenu");
const { servicesCardData } = require("./servicesStaticData/cardsData");

const Services = () => {
  return (
    <CardMenu
      data={servicesCardData}
      pageDescription="Our Services"
      pageTitle="Services"
    />
  );
};

export default Services;
