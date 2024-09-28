import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export async function getSearchResult(query) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-user-tool/`,
      { params: { name: query } }
    );

    if (response.data.length > 0) {
      return response.data;
    } else {
      const introResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-user-tool/`,
        { params: { intro: query } }
      );
      if (introResponse.data.length > 0) {
        return introResponse.data;
      } else {
        const categoryResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-user-tool/`,
          { params: { category: query } }
        );
        return categoryResponse.data;
      }
    }
  } catch (err) {
    console.error("Error fetching search results:", err);
    return [];
  }
}

export async function getSearchCSVResult(query) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-csv-tools/`,
      { params: { name: query } }
    );

    if (response.data.length > 0) {
      return response.data;
    } else {
      const introResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-csv-tools/`,
        { params: { intro: query } }
      );
      if (introResponse.data.length > 0) {
        return introResponse.data;
      } else {
        const categoryResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/search-csv-tools/`,
          { params: { category: query } }
        );
        return categoryResponse.data;
      }
    }
  } catch (err) {
    console.error("Error fetching search results:", err);
    return [];
  }
}

function SearchText({ setResult }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const router = useRouter();

  useEffect(() => {
    setResult(null);
    if (!searchQuery) {
      router.push("/");
    } else {
      (async () => {
        try {
          const searchResult = await getSearchResult(searchQuery);
          const csvSearchResult = await getSearchCSVResult(searchQuery);
          if (searchResult && csvSearchResult) {
            const result = [...searchResult, ...csvSearchResult];

            setResult(result);
          }
        } catch (err) {
          setResult([]);
        }
      })();
    }
  }, [searchQuery]);

  return (
    <h1 className=" text-center mb-8  text-2xl px-10  lg:text-4xl   font-semibold ">
      {` Showing search result for "`}
      {searchQuery?.length > 30
        ? searchQuery.slice(0, 30) + "..."
        : searchQuery}
      {`"`}
    </h1>
  );
}

export default SearchText;
