"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import Image from "next/image";
import axios from "axios";

const SearchItem = ({ item }) => {
  return (
    <a
      href={`/search?query=${item.name}`}
      className="swiper-slide  !w-fit  transition-all rounded-md p-2 group cursor-pointer  font-normal lg:text-lg border-[0.5px] border-glassBorder flex-none !flex items-center gap-4 bg-secondary"
    >
      <div className="w-10 rounded-md h-10 bg-glassBorder  group-hover:rotate-12 transition-all overflow-hidden">
        <Image
          width={200}
          height={200}
          src={`${item.image}`}
          alt="image"
          className="w-full  h-full object-cover"
        />
      </div>
      <div className=" group-hover:scale-[1.03] transition-all">
        {item?.name}
      </div>
      <ArrowRight className="group-hover:translate-x-1 transition-all" />
    </a>
  );
};

function TopSearches() {
  const swiperRef = useRef(null);

  const [popular, setPopular] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/popular-searches/`
      );

      setPopular(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Initialize Swiper
    const swiperInstance = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 16,
      direction: "horizontal",
    });

    swiperRef.current = swiperInstance;

    return () => {
      // Clean up Swiper instance
      if (swiperRef.current) {
        swiperRef.current?.destroy();
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
    <section className="w-full pl-3 py-5  overflow-hidden max-w-7xl border-green-400">
      <div className=" flex items-center pr-3 justify-between">
        <h3 className="lg:text-2xl text-xl relative w-fit flex items-center gap-2 py-3 font-semibold">
          Top Searches
        </h3>
        <div className=" flex items-center  right-0 top-0 gap-3">
          <div
            onClick={goToPrevSlide}
            className="p-2 cursor-pointer  border-[0.2px]  hover:scale-[0.9] text-[#67738c]  hover:text-white transition-all border-[#1d212c]    bg-secondary"
          >
            <ChevronLeft className="w-4 h-4" />
          </div>
          <div
            onClick={goToNextSlide}
            className="p-2 border-[#1d212c] group cursor-pointer text-[#67738c] hover:text-white hover:scale-[0.9] transition-all  bg-secondary border-[0.2px]"
          >
            <ChevronRight className="w-4 h-4 " />
          </div>
        </div>
      </div>

      <div className="swiper-container mt-3  ">
        <div className="swiper-wrapper">
          {popular?.map((item, index) => (
            <SearchItem item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSearches;
