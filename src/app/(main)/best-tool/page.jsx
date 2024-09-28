import BestToolDetailHero from "@/components/molecules/best-tool/BestToolDetailHero";
import BestToolReslt from "@/components/molecules/best-tool/BestToolResult";
import CtaSection from "@/components/molecules/shared/CtaSection";
import NewsLetterCard from "@/components/molecules/shared/NewsLetterCard";
import React from "react";

const page = () => {
  return (
    <main className=" w-full flex flex-col justify-center items-center">
      <BestToolDetailHero />
      <BestToolReslt />
      <CtaSection />
      <NewsLetterCard />
    </main>
  );
};

export default page;
