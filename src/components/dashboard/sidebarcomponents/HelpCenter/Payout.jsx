"use client";

import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { BiBookOpen } from "react-icons/bi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import React from 'react'

export default function Payout() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const faqs = [
      {
        question: "What payout methods are available?",
        answer:
          "You can withdraw your earnings through bank transfer, PayPal, or cryptocurrency, depending on your preferences and location.",
      },
      {
        question: "Is there a minimum withdrawal amount?",
        answer: "",
      },
      {
        question: "How long does it take to process a payout?",
        answer: "",
      },
      {
        question: "Can I track my payout history?",
        answer: "",
      },
    ];
  return (
    <div className=" lg:px-16">
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
  )
}
