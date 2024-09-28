import ExploreHero from "@/components/molecules/explore/ExploreDashboard";
import ExploreResult from "@/components/molecules/explore/Explore_Result";
import CategoriesSection from "@/components/molecules/homepage/CategoriesSection";
import CtaSection from "@/components/molecules/shared/CtaSection";
import React from "react";

function Explore() {
  return (
    <div className="w-full flex pb-20 flex-col justify-center items-center">
      <ExploreHero />
      <div className="w-full overflow-hidden">
        <CategoriesSection />
      </div>
      <ExploreResult />
      <CtaSection />
    </div>
  );
}

export default Explore;
