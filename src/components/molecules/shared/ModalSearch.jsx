import Transition from "@/utils/Transition";
import axios from "axios";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import {useRouter} from "next/navigation"

function ModalSearch({ id, searchId, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const [popular, setPopular] = useState(null);
  const [featured, setFeatured] = useState(null);
  const router = useRouter()

  const getFeatured = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/premium-tools/`
      );
      setFeatured(response.data);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/popular-searches/`
      );
      setPopular(response.data);
    } catch (e) {}
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && getFeatured();
    modalOpen && getData();
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchInput.current.value;
   router.push(`/search?query=${query}`);
   
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className=" glassmorphism overflow-auto max-w-2xl w-full max-h-full text-white rounded shadow-lg"
        >
          {/* Search form */}
          <form className="border-b  border-glassBorder">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full  bg-secondary/50 border-0 outline-none focus:ring-primary placeholder-slate-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search tool name or use case"
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              {popular && (
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">
                  Top Searches
                </div>
              )}
              <ul className="text-sm">
                {popular &&
                  popular?.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="flex items-center p-2 text-white  hover:text-white hover:bg-primary rounded group"
                        href={`/search?query=${item.name}`}
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        <svg
                          className="w-4 h-4 fill-current text-slate-400 dark:text-slate-500 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                        </svg>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              {featured && (
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">
                  Top Tools
                </div>
              )}
              <ul className="text-sm">
                {featured &&
                  featured?.slice(0, 4).map((item, index) => (
                    <li key={index}>
                      <Link
                        className="flex items-center p-2 text-white  hover:text-white hover:bg-primary rounded group"
                        href={`/search?query=${item?.user_tool.name}`}
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        <div className="w-5 lg:w-7 lg:h-7 mr-3 rounded-sm bg-white h-5">
                          
                        </div>
                        <span>{item?.user_tool.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
