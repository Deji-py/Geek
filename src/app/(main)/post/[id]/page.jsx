import BlogCard from "@/components/atoms/BlogCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import tools from "../../../../../public/images/png/tools.png";
import noImage from "../../../../../public/images/png/no_img.png";
import axios from "axios";
import moment from "moment";
import readingDuration from "reading-duration";

const Popular = ({ post }) => {
  const content = post?.content.replace(/<[^>]+>/g, "");
  return (
    <article className="relative p-2  isolate flex w-full h-[110px] !rounded-md glassmorphism  gap-4 flex-row">
      <div className="relative flex-none rounded-xl overflow-hidden aspect-square h-full">
        <Image
          width={500}
          height={500}
          className="w-full  group-hover:scale-[1.05] transition-all h-full object-cover"
          src={post?.image ? `${post.image}` : noImage}
          alt={post?.title}
        />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <Badge className="font-light text-sm cursor-pointer px-5 text-[#cddbff] bg-[hsl(223,38%,20%)] rounded-full">
            {post.blog_category.name}
          </Badge>
        </div>
        <div className="group mt-3 relative max-w-xl">
          <a href={`/post/${post.id}`}>{content.slice(0, 60)}</a>
        </div>
      </div>
    </article>
  );
};

const fetchPost = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/blog-detail/${id}/`
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

const fetchRelatedPost = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/similar_blog/${id}/`
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

const fetchPopularPost = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/popular-posts/`
    );

    if (response && response.data.length > 0) {
      const popularPostDetails = await Promise.all(
        response.data.map(async (post) => {
          const postDetailResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogpost/blog-detail/${post.post}/`
          );
          return postDetailResponse?.data;
        })
      );
      return popularPostDetails;
    }

    return [];
  } catch (error) {
    return [];
  }
};

const PostDetail = async ({ params }) => {
  const data = await fetchPost(params.id);
  const related = await fetchRelatedPost(data?.blog_category?.id);
  const popular = await fetchPopularPost();
  const duration = data && readingDuration(data?.content);

  if (!data) {
    return null;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-6xl mt-14 lg:mt-20 w-full">
        <header className="mb-4 lg:mb-6 not-format">
          <div className="px-3 lg:px-0">
            <Badge className="font-light cursor-pointer px-5 py-0.5 mb-4 text-white !h-6 bg-cyan-600 text-sm lg:text-base rounded-full">
              {data?.blog_category?.name}
            </Badge>
            <h1 className="mb-4 text-2xl font-bold leading-tight max-w-4xl text-white lg:mb-6 lg:text-4xl">
              {data?.title}
            </h1>
            <div className="flex items-center gap-4">
              <span>Published {moment(data?.updated_on).format("ll")}</span>
              <span>|</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className="aspect-video">
            <Image
              width={500}
              height={500}
              className="w-full mt-3 group-hover:scale-[1.05] transition-all h-full object-cover"
              src={data?.image ? `${data.image}` : noImage}
              alt="Image Description"
            />
          </div>
        </header>

        <div className="flex flex-row-reverse justify-center items-start w-full    gap-10">
          <div className="w-[400px] hidden lg:block flex-none h-fit">
            <div>
              {popular && popular.length > 0 && (
                <h3 className="uppercase text-lg">Popular Posts</h3>
              )}
              <div className="mt-4 flex flex-col gap-4">
                {popular.map((post, index) => (
                  <Popular key={index} post={post} />
                ))}
              </div>

              <div className="mt-8 w-full flex justify-center items-center">
                <section className="w-full relative max-w-6xl h-[260px] lg:h-[300px] rounded-xl overflow-hidden bg-[#0A50FF] flex flex-col justify-center items-center to-greeny">
                  <Image
                    alt="tools"
                    src={tools}
                    className="w-40 -right-3 absolute bottom-0"
                  />
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent absolute top-0 left-0 to-[#0A50FF]"></div>
                  <div className="items-center px-5 lg:px-0 relative text-center w-full flex-col justify-center flex">
                    <h3 className="text-4xl font-semibold">
                      Elevate your tool&apos;s visibility!
                    </h3>
                    <p className="mt-3 text-sm px-8 lg:text-base">
                      Showcase your tool to a global audience on Geektools
                    </p>

                    <Button className="mt-10 hover:bg-black hover:text-white w-fit h-11 gap-2 lg:px-8 px-4 font-medium shadow-[rgba(0,0,0,0.08)] hover:shadow-xl transition-all text-primary bg-white text-base lg:text-lg">
                      Submit a Tool
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <main className="pb-16 px-4 text-wrap w-full   break-all flex-1 lg:pb-24 prose prose-invert antialiased">
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </main>
        </div>

        <aside aria-label="Related articles" className="py-8 lg:pt-5 lg:pb-20">
          {related?.length > 0 && (
            <div className="px-4 w-full  max-w-6xl">
              <h2 className="mb-8 text-2xl font-bold text-white">
                {related.length > 0 &&
                  related[0].id !== data.id &&
                  "Related articles"}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related
                  ?.filter((item) => item?.id !== data.id)
                  .slice(0, 3)
                  .map((item, key) => (
                    <div key={key}>
                      <BlogCard item={item} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </aside>
        <div className="lg:w-[400px] w-full px-3 pb-20 pt-10 lg:hidden  block flex-none h-fit">
          <div>
            {popular && popular.length > 0 && (
              <h3 className="uppercase text-lg">Popular Posts</h3>
            )}
            <div className="mt-4 flex flex-col gap-4">
              {popular &&
                popular?.map((post, index) => (
                  <Popular key={index} post={post} />
                ))}
            </div>

            <div className="mt-8 w-full flex justify-center items-center">
              <section className="w-full relative max-w-6xl h-[260px] lg:h-[300px] rounded-xl overflow-hidden bg-[#0A50FF] flex flex-col justify-center items-center to-greeny">
                <Image
                  alt="tools"
                  src={tools}
                  className="w-40 -right-3 absolute bottom-0"
                />
                <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent absolute top-0 left-0 to-[#0A50FF]"></div>
                <div className="items-center px-5 lg:px-0 relative text-center w-full flex-col justify-center flex">
                  <h3 className="text-4xl font-semibold">
                    Elevate your tool&apos;s visibility!
                  </h3>
                  <p className="mt-3 text-sm px-8 lg:text-base">
                    Showcase your tool to a global audience on Geektools
                  </p>
                  <a href="/login">
                    <Button className="mt-10 hover:bg-black hover:text-white w-fit h-11 gap-2 lg:px-8 px-4 font-medium shadow-[rgba(0,0,0,0.08)] hover:shadow-xl transition-all text-primary bg-white text-base lg:text-lg">
                      Submit a Tool
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
