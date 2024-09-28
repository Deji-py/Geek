import React from "react";
import ToolCard from "../shared/ToolCard";
import LoadingGridSkeletons from "../shared/LoadingGridSkeletons";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

const getData = async () => {
  noStore();
  const itemsPerPage = 12;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/all-tools/`
    );

    let csvTools = Array.isArray(response?.data?.csvtools)
      ? [...response?.data?.csvtools]
      : [];
    let combinedTools = Array.isArray(response?.data?.combined_tools)
      ? [...response?.data?.combined_tools]
      : [];

    // Sort the csvTools to have items with logo starting with "https://ucarecdn.com" come last
    const sortedCSVTools = csvTools.filter((items) => {
      return !items.logo.startsWith("https://ucarecdn.com");
    });
    const otherCSVTools = csvTools.filter((items) => {
      return items.logo.startsWith("https://ucarecdn.com");
    });

    const latest = [...combinedTools, ...sortedCSVTools, ...otherCSVTools];
    return latest.slice(0, itemsPerPage);
  } catch (e) {
    return null;
  }
};

async function NewListing() {
  const latest = await getData();

  if (!latest) {
    return (
      <section className="w-full max-w-7xl relative py-3 lg:py-8 px-3">
        <LoadingGridSkeletons columns={"lg:grid-cols-4"} count={12} />
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl py-3 lg:py-8 px-3">
      <h3 className=" lg:text-2xl text-xl relative w-fit flex items-center gap-2 py-3 font-semibold">
        New Listings
        <div className="absolute -right-4 -mt-7  rotate-12 ">
          <div className="text-[#E86506] bg-[#FFF7CC] h-4 flex items-center justify-center z-[1000] px-2 rounded-full text-[10px] font-medium">
            <p> Latest</p>
          </div>
        </div>
      </h3>
      <div className=" grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {latest?.map((item, index) => (
          <ToolCard
            item={item}
            type={item?.created_by}
            key={index}
            toolId={item.id}
            pricing={
              item?.created_by === "user" || item?.created_by === "premium_user"
                ? item?.user_tool?.pricing
                : item?.pricing
            }
          />
        ))}
      </div>
    </section>
  );
}

export default NewListing;
