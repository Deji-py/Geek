"use client";
import CtaSection from "@/components/molecules/shared/CtaSection";
import NewsLetterCard from "@/components/molecules/shared/NewsLetterCard";
import PricingList from "@/components/molecules/submit-tool/PricingList";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Pricing() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/stripe_pricing/"); // Replace with your actual API endpoint
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full justify-center items-center flex relative flex-col">
      <div className="lg:h-[7rem] rounded-full w-[6rem] h-[6rem] lg:w-[7rem] absolute top-40 right-0 bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className="lg:h-[15rem] rounded-full w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[150px]"></div>
      <div className="h-20"></div>
      <PricingList products={products} />
      <CtaSection />
      <NewsLetterCard />
    </div>
  );
}

export default Pricing;
