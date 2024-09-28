import SearchHero from "@/components/molecules/search/SearchHero";
import CtaSection from "@/components/molecules/shared/CtaSection";
import NewsLetterCard from "@/components/molecules/shared/NewsLetterCard";
import React from "react";

function SearchPage() {
  return (
    <div className="w-full flex-col flex justify-center items-center">
      <SearchHero />
      <CtaSection />
      <NewsLetterCard />
    </div>
  );
}

export default SearchPage;
