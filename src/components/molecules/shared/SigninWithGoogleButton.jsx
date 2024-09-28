"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SigninWithGoogleButton() {
  const handleClick = () => {
    const clientId =
      "556413704000-j5lni8ru7gu7ce188tobbnnkti72duet.apps.googleusercontent.com";
    const redirectUri = `https://geek.tools/google-login/`;
    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");
    const responseType = "code";
    const accessType = "offline";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=select_account`;

    window.location.href = authUrl;
  };

  return (
    <Button
      className="signin w-full  bg-glassBorder/50  text-md hover:bg-glassBorder/60 mt-4 py-6 font-league lg:text-lg"
      onClick={handleClick}
    >
      <FcGoogle className="mr-4" size={24} />
      Continue with Google
    </Button>
  );
}

export default SigninWithGoogleButton;
