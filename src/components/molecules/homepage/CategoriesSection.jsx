import React from "react";
import CategoryItem from "../shared/CategoryItem";
import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/category/`
    );

    if (response) {
      return response.data;
    }
  } catch (err) {
    return null;
  }
};
async function CategoriesSection() {
  const categories = await fetchCategories();

  if (!categories) {
    return null;
  }

  return (
    <div className=" flex-row w-full py-5  overflow-x-scroll  px-3 flex mt-8 hideScroll lg:items-center gap-5 lg:justify-center">
      {categories.map((item, index) => (
        <CategoryItem item={item} key={index} />
      ))}
    </div>
  );
}

export default CategoriesSection;
