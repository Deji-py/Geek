"use client";
import React, { useEffect, useState } from "react";
import accept from "../../../../public/images/png/accept.png";
import reject from "../../../../public/images/png/reject.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";


const PayedForPremiumUser = () => {
  return (
    <div className="w-full font-league flex flex-col pt-20 items-center text-center justify-center h-full">
      <Image src={accept} className="w-24" alt="Payment Successful" />
      <h1 className="text-2xl font-bold mt-4">Payment Successful</h1>
      <h3 className="mt-1 text-gray-400">
        Congratulations, Your payment was successful
      </h3>
    </div>
  );
};

const PaymentError = () => {
  return (
    <div className="w-full font-league flex flex-col pt-20 items-center text-center justify-center h-full">
      <Image src={reject} className="w-24" alt="Payment Failed" />
      <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
      <h3 className="mt-1 text-gray-400">Your Payment failed, try again</h3>
    </div>
  );
};

const Payment = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleChecking = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user && searchParams) {
        const parsedUser = JSON.parse(user);
        const userId = parsedUser.user_id;
        const queryUserId = parseInt(searchParams.get("user"));

        if (userId === queryUserId) {
          const paymentSuccess = searchParams.get("success") === "true";
          setStatus(paymentSuccess);
        } else {
          router.replace("/");
        }
      }
    }
  };

  useEffect(() => {
    handleChecking();
  }, [searchParams]);

  const handleFetchProfile = async () => {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);

        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...parsedUser, is_premium: status })
        );
        setTimeout(() => {
          router.replace("/dashboard/my-tools");
        }, 1000);
      } else {
        setTimeout(() => {
          router.replace("/dashboard/my-tools");
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (searchParams && status) {
      handleFetchProfile();
    }
  }, [searchParams, status]);

  if (status === null) {
    return null; // Loading or fallback component can be returned here
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {status ? <PayedForPremiumUser /> : <PaymentError />}
      <a href="/dashboard/my-tools">
        <Button
          className={
            "bg-secondary border-glassBorder mt-4 border-[0.5px] text-md hover:bg-glassBorder font-normal lg:text-lg"
          }
        >
          Go Back
        </Button>
      </a>
      <div className="  text-xs mt-3 text-gray-400">Redirecting in 1sec...</div>
    </div>
  );
};

export default Payment;
