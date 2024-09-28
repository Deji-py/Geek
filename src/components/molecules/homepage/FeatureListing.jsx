import React from "react";
import ToolCard from "../shared/ToolCard";
import star from "../../../../public/images/svg/star.svg";
import Image from "next/image";
import LoadingGridSkeletons from "../shared/LoadingGridSkeletons";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

const getData = async () => {
  noStore();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/premium-tools/`
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

async function FeatureListing() {
  const featured = await getData();

  if (!featured) {
    return (
      <section className="w-full max-w-7xl relative py-3 lg:py-8 px-3">
        <LoadingGridSkeletons columns={"lg:grid-cols-4"} count={8} />
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl relative py-3 lg:py-8 px-3">
      <h3 className=" text-2xl flex items-center gap-2 py-3 font-semibold">
        Featured Listing <Image src={star} alt="star" />
      </h3>

      <div className=" grid gap-6 sm:grid-cols-3   relative lg:grid-cols-4">
        {featured?.map((item, index) => (
          <ToolCard
            isFeatured
            item={item}
            key={index}
            type={item?.created_by}
            toolId={item.id}
            pricing={item?.user_tool?.pricing}
          />
        ))}
      </div>
    </section>
  );
}

export default FeatureListing;
