"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TextInput from "@/components/atoms/TextInput";
import { Button } from "@/components/ui/button";
import resetpass from "../../../../public/images/png/rotate.png";
import axios from "axios";
import { toast } from "react-toastify";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!searchParams || !token) {
      replace("/forgot-password");
    }
  }, [searchParams, token, replace]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password_reset/confirm/`,
        { password: password, token: token }
      );
      if (response) {
        toast("Password reset successfully", {
          type: "success",
        });
        replace("/login");
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
    setLoading(false);
  };

  return (
    <div className="w-full px-3 lg:px-0 h-full relative flex flex-col justify-center items-center">
      <div className="lg:h-[10rem] w-[6rem] h-[6rem] bg-gradient-to-r lg:w-[10rem] absolute mb-[300px] lg:mb-40 from-primary to-[#0AD9BE] blur-[80px] lg:blur-[100px]"></div>
      <Image
        src={resetpass}
        className="w-24 absolute mb-[350px] lg:mb-[300px]"
        alt="Reset Password"
      />
      <div className="p-5 mt-40 relative border-glassBorder border z-[1000] rounded-xl w-full max-w-[30rem] bg-secondary">
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold">Reset Password,</h3>
          <p className="text-gray-400 mb-8 text-sm">
            Kindly change your password below
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            isRequired
            title={"Password"}
            type={"password"}
            field={{
              onChange: (e) => setPassword(e.target.value),
              value: password,
            }}
          />
          <TextInput
            isRequired
            title={"Confirm password"}
            type={"password"}
            field={{
              onChange: (e) => setConfirmPassword(e.target.value),
              value: confirmPassword,
            }}
          />
          <Button
            className={"w-full primary_btn mt-5 font-normal text-md lg:text-lg"}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
