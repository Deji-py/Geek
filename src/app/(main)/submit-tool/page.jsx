"use client";
import FaqSection from "@/components/molecules/shared/FaqSection";
import PricingList from "@/components/molecules/submit-tool/PricingList";
import Submit_Tool_Header from "@/components/molecules/submit-tool/Submit_Tool_Header";
import WorldMap from "@/components/molecules/submit-tool/WorldMap";
import axios from "axios";
import React, { useEffect, useState } from "react";

function SubmitTool() {
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
    <main className=" flex flex-col justify-center items-center">
      <Submit_Tool_Header />
      <WorldMap />
      <PricingList products={products} />
      <FaqSection />
    </main>
  );
}

export default SubmitTool;
