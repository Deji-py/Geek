"use client";
import React, { useEffect, useState } from "react";
import checkmail from "../../../../public/images/png/checkMail.png";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

function CheckMail() {
  const [count, setCount] = useState(20);
  const [timer, setTimer] = useState(null);
  const [showResend, setShowResend] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    if (!searchParams || !searchParams.get("email")) {
      replace("/forgot-password");
    }
  }, []);

  const handleSubmitEmail = async () => {
    if (searchParams.get("email").trim() !== "") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password_reset/request/`,
          { email: searchParams.get("email") }
        );
        if (response) {
          toast("Password reset request sent successfully", {
            type: "success",
          });
        }
      } catch (error) {
        if (error?.response?.data) {
          Object.entries(error?.response?.data).forEach(([key, value]) => {
            toast(value[0], { type: "error" });
          });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      }
    }
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timer) {
        stopTimer();
      }
    };
  }, []);

  const formattedCountdown = () => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (count === 0) {
      setShowResend(true);
      stopTimer();
    }
  }, [count]);

  const handleResendClick = () => {
    setCount(60);
    handleSubmitEmail();
    setShowResend(false);
    startTimer();
  };

  return (
    <div className="flex flex-col  px-3 justify-center items-center">
      <img src={checkmail.src} alt="Check Mail" className="w-44" />
      <div className="text-center font-light lg:text-base px-5 lg:px-0 text-sm mt-10 text-gray-200">
        <p>We have sent a mail your email address</p>
        <p>Kindly check your mail to reset your password</p>
      </div>

      <div className="mt-20">
        {showResend ? (
          <Button
            className={
              " bg-secondary border-glassBorder border-[0.5px] text-md hover:bg-glassBorder  font-normal lg:text-lg"
            }
            onClick={handleResendClick}
          >
            Resend
          </Button>
        ) : (
          <p className="py-2.5">
            <span className=" text-gray-200">Resend in </span>
            {formattedCountdown()}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckMail;
