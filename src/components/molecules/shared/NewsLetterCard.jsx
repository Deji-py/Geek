"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import newsletter from "../../../../public/images/svg/newsletter2.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

function NewsLetterCard() {
  const [typing, setTyping] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/subcription/`,
        { email }
      );
      if (response.data) {
        toast("Thanks for Subscribing to our newsletter", { type: "success" });
      }
    } catch (e) {
      if (e.response?.data?.email) {
        toast(e.response.data.email[0], { type: "error" });
      } else {
        toast("Unable to subscribe", { type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="px-3 flex flex-col justify-center items-center
     w-full sm:px-0 my-10 relative"
    >
      <div className=" relative">
        <div className=" lg:h-[7rem] rounded-full  bg-gradient-to-r left-0 w-[6rem] h-[6rem] lg:w-[7rem] absolute  from-primary to-[#0AD9BE] blur-3xl lg:blur-[100px]"></div>
        <section className="w-full flex-col sm:flex-row relative flex overflow-hidden p-5 gap-10 rounded-xl max-w-4xl border border-[#1d212a] h-fit  glassmorphism backdrop-blur-sm">
          <div className="sm:w-[40%] w-full sm:h-[200px]">
            <Image
              src={newsletter}
              className="z-[10] absolute w-[30rem] -top-44 sm:-top-16 lg:-left-20 -left-8"
              alt="Newsletter"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <h2 className="text-4xl flex-1 sm:mt-0 mt-6">
              Subscribe to our Newsletter
              <p className="text-[#808080] text-base">
                {`Get our latest articles and business updates that you need to know, you’ll even get special recommendations weekly.`}
              </p>
            </h2>

            <div
              className={cn(
                "relative h-12 border rounded-full border-glassBorder mt-3 bg-[hsl(212,28%,8%)] px-1 flex items-center",
                typing ? "border-primary" : "border-glassBorder"
              )}
            >
              <Mail className="w-5 flex-none h-5 ml-2 text-[#9296A0]" />
              <Input
                className="flex-1 h-8 focus-visible:ring-0 placeholder:text-[#51606f] sm:text-lg border-none focus:ring-0 outline-none focus:outline-none focus:border-none focus:bg-transparent"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTyping(false)}
                onFocus={() => setTyping(true)}
                placeholder="Email Address"
              />
              <Button
                onClick={handleSubmit}
                className="font-normal right-1 h-10 gap-2 lg:px-8 px-4 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-base lg:text-lg"
              >
                {loading ? "Please wait..." : "Subscribe"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewsLetterCard;
