"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function SearchFilter({
  result,
  setDisplayedItems,
  itemsPerPage,
  setFilteredItems,
  setFirst,
  setDialogOpen,
}) {
  const params = useSearchParams();

  // Local state for temporary filter values
  const [selectedCategory, setSelectedCategory] = useState(
    params?.get("category") || ""
  );
  const [selectedPricing, setSelectedPricing] = useState(
    params?.get("pricing") || ""
  );
  const [selectedTag, setSelectedTag] = useState(params?.get("tag") || "");

  const mergeAndFilterResults = (results, filters) => {
    return results.filter((item) => {
      const categoryMatch = filters.category
        ? item.category?.name === filters.category ||
          item.category === filters.category
        : true;
      const subcategoryMatch = filters.subcategory
        ? item.subcategory?.name === filters.subcategory ||
          item.subcategory === filters.subcategory
        : true;
      const pricingMatch = filters.pricing
        ? item.pricing === filters.pricing
        : true;
      const tagMatch = filters.tag
        ? item.hashtag?.some(
            (tag) =>
              tag?.includes(filters.tag) || tag.term?.includes(filters.tag)
          )
        : true;

      return categoryMatch && pricingMatch && tagMatch && subcategoryMatch;
    });
  };

  const applyFilter = () => {
    const filters = {
      category: selectedCategory || "",
      pricing: selectedPricing || "",
      tag: selectedTag || "",
    };

    if (result) {
      const filteredResults = mergeAndFilterResults(result, filters);
      setDisplayedItems(filteredResults.slice(0, itemsPerPage));
      setFilteredItems(filteredResults);
      setFirst(0);

      const url = new URL(window.location.href);
      url.searchParams.set("category", filters.category);
      url.searchParams.set("pricing", filters.pricing);
      url.searchParams.set("tag", filters.tag);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const getCategories = (results) => {
    const categories = new Set();
    const subcategories = new Set();

    results.forEach((item) => {
      if (item.category) categories.add(item.category);
      // if (item.subcategory) subcategories.add(item.subcategory);
    });

    return {
      categories: Array.from(categories),
      subcategories: Array.from(subcategories),
    };
  };

  const getHashtags = (results) => {
    const hashtags = new Set();

    results.forEach((item) => {
      if (item.hashtag) {
        item.hashtag.forEach((tag) => {
          hashtags.add(tag || tag.term);
        });
      }
    });

    return Array.from(hashtags);
  };

  const getPricingOptions = (results) => {
    const pricingOptions = new Set();

    results.forEach((item) => {
      if (item.pricing) {
        pricingOptions.add(item.pricing);
      }
    });

    return Array.from(pricingOptions);
  };

  useEffect(() => {
    applyFilter();
  }, [params, result]);

  const { categories } = getCategories(result || []);
  const hashtags = getHashtags(result || []);
  const pricingOptions = getPricingOptions(result || []);

  return (
    <>
      <div className=" !text-white font-league">
        <p className="text-base mb-1 lg:text-lg">Categories</p>
        <div className="w-full glassmorphism pl-2 py-3 flex flex-col gap-2 !rounded-md overflow-y-scroll h-fit max-h-[150px]">
          <RadioGroup
            defaultValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((item, index) => (
              <div className="flex !text-white items-center gap-3" key={index}>
                <RadioGroupItem className="-mt-1" id={index} value={item} />
                {item}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 !text-white ">
        <p className="text-base mb-1 lg:text-lg">Pricing Type</p>
        <div className="w-full glassmorphism pl-2 py-3 flex flex-col gap-2 !rounded-md h-fit">
          <RadioGroup
            defaultValue={selectedPricing}
            onValueChange={(value) => setSelectedPricing(value)}
          >
            {pricingOptions.map((price, index) => (
              <div className="flex !text-white items-center gap-3" key={index}>
                <RadioGroupItem className="-mt-1" id={index} value={price} />
                {price}
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 !text-white ">
        <p className="text-base mb-1 lg:text-lg">Filter by Tags</p>
        <div className="flex items-center flex-wrap gap-2">
          {hashtags.slice(0, 20).map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTag(item)}
              className={`font-light text-xs px-3 h-5 lg:h-6 flex justify-center items-center cursor-pointer border-[0.5px] border-[#253241] text-[#EBF0FF] bg-glassBorder hover:bg-[#253241] rounded-full ${
                selectedTag === item && "bg-primary"
              }`}
            >
              <div className="lg:mt-0.5">{item}</div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          applyFilter();
          if (setDialogOpen) {
            setDialogOpen(false);
          }
        }}
        className="mt-5 font-normal w-full text-md primary_btn border border-primary"
      >
        Apply Filter
      </Button>

      <Button
        onClick={() => {
          setSelectedCategory("");
          setSelectedPricing("");
          setSelectedTag("");
          const url = new URL(window.location.href);
          url.searchParams.delete("category");
          url.searchParams.delete("pricing");
          url.searchParams.delete("tag");
          window.location.href = url.toString();
        }}
        className="mt-5 font-normal w-full text-md bg-white border  hover:bg-blue-100 border-white text-primary"
      >
        Clear Filter
      </Button>
    </>
  );
}

export default SearchFilter;
