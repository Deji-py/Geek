"use client";
import React, { useEffect, useState } from "react";
import Pricing from "../shared/Pricing_Plan";
import axios from "axios";
import { useRouter } from "next/navigation";

function PricingList({ products, loading }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [plans, setPlans] = useState([
    {
      title: "Basic Listing",
      list: ["Get listed on geek.tool", "Get featured on Geek.tools badge."],
      isDark: true,
      price: "0",
      isSelected: true,
      timeline: "Free",
    },
    {
      title: "Featured Listing",
      list: [
        "Appeared in Listing and Just Launched within 48 hours, no queue.",
        "Featured on the homepage for 7 days.",
        "Get dofollow links and boost your SEO",
        "Listing & Traffic Forever.",
        "Verified check mark",
        "Top position in the category page (below sponsored)",
        "Add your social media links",
        "Can apply for weekly newsletter",
        "Get “Featured on Geek.tools” badge",
      ],
      timeline: "one time",
      former_price: "199",
      price: "...",
      isSelected: false,
    },
  ]);

  const checkoutToStripe = async () => {
    setRedirecting(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        try {
          const response = await axios.post("/api/checkout_session/", {
            email: parsedUser?.email,
            name: currentProduct?.name,
            price: currentProduct?.prices[0]?.id,
            user_id: parsedUser?.user_id,
          });

          if (response) {
            window.location.replace(response.data.session);
          } else {
            console.error("No session data in response");
          }
        } catch (error) {
          console.error("Error fetching checkout session:", error);
        }
      } else {
        router.push("/login");
      }
    }
    setRedirecting(false);
  };

  useEffect(() => {
    if (!loading && products) {
      const product = products.find((product) =>
        product.name.includes("Premium")
      );
      setCurrentProduct(product);
      setPlans((prevPlans) => {
        const updatedPlans = [...prevPlans];
        updatedPlans[1].price = product?.prices[0]?.unit_amount / 100 || "...";
        return updatedPlans;
      });
    }
  }, [loading, products]);

  const handleSetSelected = (index) => {
    const updatedPlans = plans.map((plan, i) => {
      if (i === index) {
        return { ...plan, isSelected: true };
      } else {
        return { ...plan, isSelected: false };
      }
    });
    setPlans(updatedPlans);
  };

  return (
    <div className="w-full max-w-2xl px-5 lg:px-0 pb-20 justify-center items-center flex flex-col">
      <h3 className="text-xl text-center lg:text-4xl">Pricing Plan</h3>
      <div className="w-full lg:flex-row flex-col flex gap-5 lg:gap-0 lg:mt-16 items-start justify-center">
        {plans.map((item, index) => (
          <div
            key={index}
            className="flex-1 w-full"
            style={{ marginTop: index === 0 ? 60 : 0 }}
          >
            <Pricing
              className={index === 0 && "lg:!rounded-r-none"}
              title={item?.title}
              price={
                index === 1 && currentProduct
                  ? currentProduct?.prices[0]?.unit_amount / 100
                  : item?.price
              }
              isSelected={item?.isSelected}
              isDark={item?.isDark}
              former_price={item?.former_price}
              timeline={item?.timeline}
              list={item?.list}
              loading={index === 1 ? redirecting : false}
              onClick={
                index === 1 && currentProduct ? checkoutToStripe : () => {}
              }
              selectThis={() => handleSetSelected(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingList;
