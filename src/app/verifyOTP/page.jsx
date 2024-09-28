"use client";
import React, { useEffect, useState } from "react";
import checkmail from "../../../public/images/png/checkMail.png";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowRight, LogOutIcon } from "lucide-react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseClient } from "@/utils/supabase";

function VerifyOTP() {
  const [count, setCount] = useState(20);
  const [timer, setTimer] = useState(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const route = useRouter();

  useEffect(() => {
    if (!email) {
      route.replace("/login");
    }
  }, []);

  const handleSendOTP = async () => {
    if (email) {
      const { error } = await supabaseClient.auth.resend({
        email,
        type: "signup",
      });
      if (error) {
        toast(`Something went wrong: ${error.message}`, { type: "error" });
        console.log(error.stack);
      } else {
        toast(`We have sent an OTP to ${email}`, {
          type: "success",
        });
        setValue("");
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
    handleSendOTP();
    setShowResend(false);
    startTimer();
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Check if the value length is exactly 6
    if (value.length === 6) {
      try {
        // Assuming your Supabase function for OTP verification is named "verify_otp"
        const { data, error } = await supabaseClient.auth.verifyOtp({
          token: value,
          type: "signup",
          email: email,
        }); // Call your Supabase function

        if (error) {
          throw new Error(error.message);
        }

        // If OTP verification is successful
        if (data) {
          toast("OTP Verification successful", { type: "success" });
          toast("Login to your account", { type: "info" });
          route.replace("/login");
        }
      } catch (e) {
        // Handle errors properly
        const errorMessage = e.message || "An error occurred.";
        toast(errorMessage, { type: "error" });
      }
    } else {
      toast("Please enter a valid 6-digit code.", { type: "warning" });
    }

    setLoading(false);
  };

  return (
    <div className="flex   flex-col w-full pt-16 px-3 justify-center items-center">
      <div className=" p-5 rounded-xl w-full max-w-[400px]  flex flex-col justify-center items-center glassmorphism">
        <img src={checkmail.src} alt="Check Mail" className="w-48" />
        <div className="text-center font-light lg:text-base px-5 lg:px-0 text-sm mt-10 text-gray-200">
          <p>
            We have sent an OTP to <br />
            {email}
          </p>
        </div>
        <div className="space-y-2">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            <>Enter your one-time password.</>
          </div>
          <div className=" relative !mt-5 flex flex-col  justify-center items-center">
            {loading && <div className=" z-10 loader absolute  " />}
            <Button
              onClick={handleSubmit}
              disabled={loading || value.length < 6}
              type="submit"
              className="w-full primary_btn  relative gap-5 font-normal text-md lg:text-lg "
            >
              Verify Email Address
            </Button>
          </div>
        </div>
        <div className="mt-5">
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
      <a
        className=" flex items-center  text-gray-400 hover:text-white group mt-2 gap-1"
        href="/"
      >
        Go to home page
        <ArrowRight
          className=" group-hover:translate-x-1 duration-300 translate-x-0"
          size={16}
        />
      </a>
    </div>
  );
}

export default VerifyOTP;
