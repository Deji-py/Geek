"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "@/redux/user/userSlice";
import setCookie from "@/utils/setCookie";
import { toast } from "react-toastify";

const CallBackGoogle = () => {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const setupUser = async (accessToken, result) => {
    // if user is verifiied login no uissue
    const profile = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_profile/${result.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (profile) {
      dispatch(
        signInUser({
          ...profile.data,
          userId: result.id,
          access: result.access_token,
          refresh: result.refresh_token,
          email: profile.data?.email,
          profilepic: profile.data?.profile_picture,
        })
      );

      setCookie(accessToken);
      typeof window !== "undefined" &&
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...profile.data,
            access: result.access_token,
            refresh: result.refresh_token,
            user_id: result.id,
            email: profile.data?.email,
            profilepic: profile?.data.profile_picture,
          })
        );
      toast("Logged in Successfully", {
        type: "success",
      });

      router.replace("/dashboard/my-tools");
    }
  };

  useEffect(() => {
    if (!params.get("access_token")) {
      router.replace("/login");
    } else {
      const obj = {};
      const entries = params.entries();
      for (const [key, value] of entries) {
        obj[key] = value;
      }
      setupUser(obj.access_token, obj);
    }
  }, [params, router]);

  return (
    <div className="w-full h-[90vh] lg:h-screen flex flex-col justify-center items-center">
      <div className="glassmorphism p-3 flex flex-col justify-center items-center">
        <div className="loader mb-2"></div>
        <p>Authenticating</p>
      </div>
    </div>
  );
};

export default CallBackGoogle;
