"use client";
import DashHeader from "@/components/molecules/dashboard/DashHeader";
import BotomNavMobile from "@/components/molecules/dashboard/dashboard_tabs/BotomNavMobile";

export default function Layout({ children }) {
  return (
    <div className=" flex flex-col pb-[150px] lg:h-screen w-screen">
      <DashHeader />
      {children}
      <BotomNavMobile />
    </div>
  );
}
