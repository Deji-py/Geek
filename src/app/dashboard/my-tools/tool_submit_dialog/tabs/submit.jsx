import Pricing_Plan_Card from "@/components/molecules/shared/Pricing_Plan";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import success from "../../../../../../public/images/png/success.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const freeplan = [
  "Get listed on geek.tool",
  "Get featured on Geek.tools badge.",
];
const premium = [
  "Appeared in Listing and Just Launched within 48 hours, no queue.",
  "Get dofollow links and boost your SEO",
  "Listing & Traffic Forever",
  "Get featured on Geek.tools badge.",
];
function SubmitTool() {
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(1);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed.is_premium) {
          setCompleted(true);
        } else {
          setCompleted(false);
        }
        setChecking(false);
      }
    }
  }, []);

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

  const product =
    products && products.find((product) => product.name.includes("Premium"));

  const checkoutToStripe = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        try {
          const response = await axios.post("/api/checkout_session/", {
            email: parsedUser?.email,
            name: product?.name,
            price: product?.prices[0]?.id,
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
      }
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className=" w-full h-[80vh] lg:h-screen  flex flex-col justify-center items-center">
        <div className=" loader !w-10" />
      </div>
    );
  }

  return (
    <div className=" h-full w-full flex flex-col pb-10  mt-10   justify-center items-center ">
      {completed ? (
        <div className=" w-full h-full flex flex-col  justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 0 }}
          >
            <Image src={success} className="  w-24" />
          </motion.div>
          <h3 className=" text-lg mt-6  lg:text-xl">
            Your tool has successfully being uploaded
          </h3>
          <Button
            onClick={() => location.reload()}
            className="font-normal self-center mt-5 flex-wrap right-1 h-11 lg:h-10 gap-2  px-5 primary_btn border-[0.5px] border-[#0A50FF] leading-none bg-primary text-base  "
          >
            Finish
          </Button>
        </div>
      ) : (
        <>
          <h1 className="py-5 text-lg lg:text-xl ">Choose a Pricing Plan</h1>
          <div className="  w-full lg:w-[600px]    h-full grid lg:grid-cols-2 gap-3 ">
            <Pricing_Plan_Card
              isSelected={selectedPricingIndex === 0}
              isDark
              title={"Free Plan"}
              price={0}
              list={freeplan}
              onClick={() => setCompleted(true)}
              selectThis={() => setSelectedPricingIndex(0)}
            />
            <Pricing_Plan_Card
              selectThis={() => setSelectedPricingIndex(1)}
              isSelected={selectedPricingIndex === 1}
              recommended
              loading={loading}
              title={"Premium Plan"}
              price={product ? product?.prices[0]?.unit_amount / 100 : "..."}
              list={premium}
              onClick={product ? checkoutToStripe : () => {}}
              timeline={"One time"}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SubmitTool;
