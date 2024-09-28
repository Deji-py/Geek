import BlogCard from "@/components/atoms/BlogCard";
import CtaSection from "@/components/molecules/shared/CtaSection";
import LoadingGridSkeletons from "@/components/molecules/shared/LoadingGridSkeletons";
import axios from "axios";
import React from "react";

const getData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/blog/`
    );

    return response.data;
  } catch (e) {
    return null;
  }
};

const Blogs = async () => {
  const blog = await getData();

  return (
    <div className=" flex flex-col py-20  relative  justify-center items-center">
      <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute top-40 right-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className=" px-3 lg:px-0 w-full max-w-6xl">
        <div className=" text-center">
          <h3 className=" text-2xl text-center lg:text-4xl">
            Latest Blog posts
          </h3>
          <p className=" text-gray-400 text-base px-5 mt-2 lg:px-0 lg:text-xl ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat cum
            tenetur eligendi magnam
          </p>
        </div>
        {!blog ? (
          <div className="mt-10">
            <LoadingGridSkeletons height={"400px"} />
          </div>
        ) : (
          <div className=" mt-10 gap-4 grid lg:grid-cols-3">
            {blog.map((item, key) => (
              <BlogCard item={item} key={key} />
            ))}
          </div>
        )}
      </div>
      <CtaSection />
    </div>
  );
};

export default Blogs;
