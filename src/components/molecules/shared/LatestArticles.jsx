import BlogCard from "@/components/atoms/BlogCard";
import axios from "axios";
import React from "react";
import LoadingGridSkeletons from "./LoadingGridSkeletons";
import { unstable_noStore as noStore } from "next/cache";

const getData = async () => {
  noStore();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/blog/`
    );

    return response.data;
  } catch (e) {
    return null;
  }
};
async function LatestArticles() {
  const blog = await getData();

  return (
    <div className="max-w-6xl  mt-16 lg:mt-5  px-3  pb-16 sm:px-6 lg:px-8 w-full lg:py-14 mx-auto">
      <div className="flex lg:flex-row py-10 lg:px-0 px- 10  flex-col lg:justify-between items-center   justify-center lg:text-start text-center">
        <h3 className="  leading-[2rem] text-[1.8rem] lg:text-4xl font-medium ">
          Top Tools Selections by Category
        </h3>
        <a href="/blog" className=" underline mt-7 lg:mt-0 hover:text-primary ">
          {" "}
          Read All Posts
        </a>
      </div>
      {!blog ? (
        <LoadingGridSkeletons height={"350px"} count={3} />
      ) : (
        <div className=" mt-10 gap-4 grid lg:grid-cols-3">
          {blog?.slice(0, 3).map((item, key) => (
            <BlogCard item={item} key={key} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestArticles;
