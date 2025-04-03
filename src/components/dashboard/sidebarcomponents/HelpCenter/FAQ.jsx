"use client";

import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosHelpCircleOutline,
} from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create and upload a design?",
      answer:
        "",
    },
    {
      question: "What happens if my design is rejected?",
      answer: "",
    },
    {
      question: "How do I earn money from my designs?",
      answer: "",
    },
    {
      question: "Can I control who sees my products?",
      answer: "You earn a percentage of the revenue from every sale of your products. Your earnings are tracked in the Earnings Dashboard, and you can withdraw funds through various payout methods like bank transfer or PayPal.",
    },
  ];

  return (
    <div className="px-2 lg:px-16">
      <div className="space-y-2">
        {faqs.map((faq, index) => (
            <div className="">
          <div key={index} className="border rounded-md ">
            <button
              className="w-full text-left p-4 font-medium flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>
                {openIndex === index ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
            </button>
           
          </div>
          <div className="py-1">
          {openIndex === index && faq.answer && (
              <div className="rounded-md border border-[#016FDE33] max-w-4xl ml-auto ">
                <div className=" p-4 bg-[#016FDE1A] text-graycolor ">
                  {faq.answer}
                </div>
              </div>
            )}
            </div>
            </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-6 grid-cols-1  text-left text-gray-600 gap-6">
        <div className="flex flex-col items-start opacity-[0.44] ">
        <img src="/dashboard/comment-01.svg"/>
          <p className="text-sm font-medium">Need Help? Chat With Us!</p>
          <p className="text-xs">
            Click the Live Chat button to start a conversation with us now. 😊
          </p>
        </div>
        <div className="flex flex-col items-start">
          <img src="/dashboard/news-01.svg"/>
          <p className="text-sm font-medium">Blog</p>
          <p className="text-xs">
            Explore tips, guides, and the latest updates on our platform.
          </p>
        </div>
        <div className="flex flex-col items-start">
        <img src="/dashboard/paint-board.svg"/>
          <p className="text-sm font-medium">Creator Resources</p>
          <p className="text-xs">
            Get guides and tutorials on how to create compelling designs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
