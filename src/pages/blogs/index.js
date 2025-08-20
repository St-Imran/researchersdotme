import React from "react";
import CardMenu from "@/Common/CardMenu/CardMenu";
import { blogsCardData } from "./blogsStaticData/blogsCardData";

const Blogs = () => {
  return (
    <CardMenu
      data={blogsCardData}
      pageTitle="Our Blogs"
      pageDescription="Researcher's Blogs"
    />
  );
};

export default Blogs;
