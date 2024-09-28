import Image from "next/image";
import React, { Suspense } from "react";
import logo from "../../../public/images/png/logo.png";

export default function Layout({ children }) {
  return (
    <div className=" w-full flex flex-col justify-center   h-[calc(100vh-50px)] lg:h-screen items-center">
      <div className=" flex-1 w-full   flex flex-col justify-center items-center">
        <Suspense>{children}</Suspense>
      </div>

      <div className="pb-10">
        <Image alt="logo" src={logo} className=" w-32" />
      </div>
    </div>
  );
}
