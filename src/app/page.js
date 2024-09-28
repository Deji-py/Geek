import CategoriesSection from "@/components/molecules/homepage/CategoriesSection";
import FeatureListing from "@/components/molecules/homepage/FeatureListing";
import HeroSection from "@/components/molecules/homepage/HeroSection";
import NewListing from "@/components/molecules/homepage/NewListing";
import TopSearches from "@/components/molecules/homepage/TopSearches";
import CtaSection from "@/components/molecules/shared/CtaSection";
import Footer from "@/components/molecules/shared/Footer";
import Header from "@/components/molecules/shared/Header";
import LatestArticles from "@/components/molecules/shared/LatestArticles";
import NewsLetterCard from "@/components/molecules/shared/NewsLetterCard";
import React from "react";

function HomePage() {
  return (
    <>
      <Header />
      <main className=" flex flex-col justify-center items-center w-full">
        <HeroSection />
        <CategoriesSection />
        <FeatureListing />
        <TopSearches />
        <NewListing />
        <CtaSection />
        <LatestArticles />
        <NewsLetterCard />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
