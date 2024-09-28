"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";

const ToolInUseCarousel = ({ images, type }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    const swiperInstance = new Swiper(".swiper-container", {
      slidesPerView: 1,
      direction: "horizontal",
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      modules: [Pagination],
    });

    swiperRef.current = swiperInstance;

    return () => {
      // Clean up Swiper instance
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="flex-1 flex flex-col relative justify-center items-center   ">
      {/* Swiper container */}
      <div className=" swiper swiper-container bg-glassBorder relative overflow-hidden w-full  rounded-[10px] h-[15rem] lg:h-[20rem] ">
        {/* Additional required wrapper */}
        <div className="swiper-wrapper  ">
          {/* Slides */}
          {images?.image1 && (
            <div className="swiper-slide !w-full ">
              <img
                width={500}
                height={500}
                src={type === "user" ? `${images?.image1}` : images?.image1}
                className=" w-full h-full object-cover"
              />
            </div>
          )}
          {images?.image2 && (
            <div className="swiper-slide !w-full ">
              <img
                width={500}
                height={500}
                src={`${images?.image2}`}
                className=" w-full h-full object-cover"
              />
            </div>
          )}
          {images?.image3 && (
            <div className="swiper-slide !w-full ">
              <img
                width={500}
                height={500}
                src={`${images?.image3}`}
                className=" w-full h-full object-cover"
              />
            </div>
          )}

          {/* Add more slides here if needed */}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="  items-center hidden lg:flex justify-between px-3 w-full  absolute  z-[1000]   gap-3">
        <div
          onClick={goToPrevSlide}
          className="p-2 cursor-pointer rounded-full  border-[0.2px]  hover:scale-[0.9] text-[#67738c]  hover:text-white transition-all border-[#1d212c]    bg-secondary"
        >
          <ChevronLeft className="w-4 h-4" />
        </div>
        <div
          onClick={goToNextSlide}
          className="p-2 border-[#1d212c] group cursor-pointer  rounded-full text-[#67738c] hover:text-white hover:scale-[0.9] transition-all  bg-secondary border-[0.2px]"
        >
          <ChevronRight className="w-4 h-4 " />
        </div>
      </div>

      <div className="  w-full flex translate-y-7 justify-center  items-center">
        <div className="swiper-pagination  "></div>
      </div>
    </div>
  );
};

export default ToolInUseCarousel;
