"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const FAQItem = ({ faq, isOpen, toggleItem }) => {
  const { id, question, answer } = faq;

  return (
    <div
      className={` mb-2 p-4 max-w-4xl rounded-md ${
        isOpen ? " bg-primary text-white" : " glassmorphism !rounded-md"
      }  lg:p-4`}
      id={`basic-heading-${id}-with-icon`}
    >
      <button
        className={cn(
          "accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8  w-full transition  duration-300 hover:text-primary accordion-active:font-medium accordion-active:text-primary",
          isOpen
            ? "text-white hover:text-white mb-2 "
            : "text-white hover:text-primary"
        )}
        aria-controls={`basic-collapse-${id}-with-icon`}
        onClick={() => toggleItem(id)}
      >
        <div className=" flex items-center gap-5">
          <div
            className={cn(
              " lg:text-4xl text-xl",
              isOpen
                ? "text-white  "
                : "text-[#3c4961] group-hover:text-primary"
            )}
          >
            0{id}
          </div>
          <h5 className=" text-sm lg:text-xl">{question}</h5>
        </div>
        <svg
          className={`w-6 h-6  transition accordion-active:text-primary accordion-active:hidden group-hover:text-primary duration-300 ${
            isOpen ? "block  group-hover:text-white" : "hidden"
          } `}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18M12 18V6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <svg
          className={`w-6 h-6 transition  duration-300 ${
            isOpen ? "hidden" : "block hover:text-white"
          } accordion-active:text-primary accordion-active:block group-hover:text-primary`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <div
        className="accordion-content transition-all   duration-300  w-full overflow-hidden lg:pr-4"
        aria-labelledby={`basic-heading-${id}`}
        style={{ maxHeight: isOpen ? "250px " : 0 }}
      >
        <p className="lg:text-base text-sm font-normal leading-5">{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  // Define the list of FAQ items
  const faqs = [
    {
      id: 1,
      question: "How can I reset my password?",
      answer:
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto at, praesentium nesciunt consequuntur repellendus quaerat blanditiis obcaecati voluptates excepturi dolores impedit id eligendi porro, voluptatibus, dolore quia labore beatae perferendis!,",
    },
    {
      id: 2,
      question: "How do I update my billing information?",
      answer:
        "To update your billing information, you can go to the billing settings page and update your information there.",
    },
    {
      id: 3,
      question: "How can I contact customer support?",
      answer:
        "You can contact customer support by sending an email to support@example.com or by calling our toll-free number.",
    },
    {
      id: 4,
      question: "How do I delete my account?",
      answer:
        "To delete your account, you can go to the account settings page and follow the instructions to delete your account permanently.",
    },
  ];

  // State to keep track of the open FAQ item
  const [openItemId, setOpenItemId] = useState(1);

  // Function to toggle the open/closed state of an FAQ item
  const toggleItem = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h3 className=" text-xl text-center lg:text-4xl">
            Frequently asked questions
          </h3>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          {/* Map over the list of FAQ items */}
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItemId === faq.id}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
