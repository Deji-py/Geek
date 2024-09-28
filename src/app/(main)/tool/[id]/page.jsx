import NewsLetterCard from "@/components/molecules/shared/NewsLetterCard";
import SimilarListing from "@/components/molecules/shared/SimilarListing";
import PricingPlanList from "@/components/molecules/tool_detail/PricingPlanList";
import ToolDescripion from "@/components/molecules/tool_detail/ToolDescripion";
import ToolDetailHero from "@/components/molecules/tool_detail/ToolDetailHero";
import axios from "axios";
import React from "react";

const getData = async (param, type) => {
  try {
    const response = await axios.get(
      type === "user" || type === "premium_user"
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/single-combined-tool/${param.id}/`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/single-csv/${param.id}/`
    );

    return response?.data;
  } catch (e) {
    return null;
  }
};

async function page({ params, searchParams }) {
  const data = await getData(params, searchParams?.type);

  if (!data) {
    return <div>Tool not found, </div>;
  }

  if (data) {
    return (
      <section className=" w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-7xl">
          <ToolDetailHero
            toolId={params?.id}
            data={data}
            type={searchParams?.type}
          />
          <ToolDescripion data={data} type={searchParams?.type} />
          {searchParams?.type === "user" && data?.setup && (
            <PricingPlanList data={data?.setup} type={searchParams?.type} />
          )}
          <SimilarListing
            category={data?.user_tool?.category?.name}
            id={params?.id}
          />
          <div className="py-10  flex flex-col justify-center  items-center w-full">
            <NewsLetterCard />
          </div>
        </div>
      </section>
    );
  }
}

export default page;
