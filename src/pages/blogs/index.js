import { blogsCardData } from "./blogsStaticData/blogsCardData";
const { default: CardMenu } = require("@/Common/CardMenu/CardMenu");

const Blogs = () => {
  return (
    <CardMenu
      data={blogsCardData}
      pageDescription="Our Blogs"
      pageTitle="Blogs"
    />
  );
};

export default Blogs;
