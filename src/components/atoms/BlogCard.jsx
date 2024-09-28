import React from "react";
import { Badge } from "../ui/badge";
import moment from "moment/moment";
import readingDuration from "reading-duration";
import noImage from "../../../public/images/png/no_img.png";
import Image from "next/image";


// Utility function to strip HTML tags

function BlogCard({ item }) {
  const duration = item && readingDuration(item?.content);
  const content = item?.content.replace(/<[^>]+>/g, "");

  return (
    <article>
      <a
        className="group flex bg-secondary flex-col h-full border border-glassBorder hover:shadow-lg transition-all duration-300 rounded-xl p-3 text-white"
        href={`/post/${item?.id}`}
      >
        <div className="aspect-w-16 h-[250px] overflow-hidden bg-secondary rounded-xl">
          <Image
            width={150}
            height={150}
            className="w-full group-hover:scale-[1.05] transition-all h-full object-cover"
            src={item?.image ? `${item.image}` : noImage}
            alt="Image Description"
          />
        </div>
        <div className="my-6">
          <h3 className="text-xl font-normal">
            <span className="bg-gradient-to-b text-white font-medium text-xl from-transparent to-primary bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_5px]">
              {item?.title}
            </span>
          </h3>
          <p className="text-sm font-light mt-2 text-gray-300">
            {content.length > 200 ? content.slice(0, 100) : content}
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="mt-auto flex items-center font-light gap-x-3">
            <div>
              <h5 className="text-sm dark:text-neutral-200">
                {moment(item?.updated_on).format("ll")}
              </h5>
            </div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div>
              <h5 className="text-sm dark:text-neutral-200">{duration}</h5>
            </div>
          </div>
          <Badge className="font-light cursor-pointer text-[#cddbff] bg-[hsl(223,38%,20%)] rounded-full">
            {item?.blog_category?.name}
          </Badge>
        </div>
      </a>
    </article>
  );
}

export default BlogCard;
