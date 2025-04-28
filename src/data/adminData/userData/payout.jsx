import { AiOutlinePercentage } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";

export const payoutData = {
  currentPayout: "$2,200",
  overview: [
    {
      label: "Sales",
      value: "$2,345",
      change: "15%",
      icon: <BsArrowUpRight className="text-[#77CEB4]" />,
      bgColor: "bg-[#E6F9F2]",
    },
    {
      label: "Balance",
      value: "$2,000",
      change: "13.65%",
      icon: <BiDollar className="text-bluebutton" />,
      bgColor: "bg-[#D2E1F1]",
    },
    {
      label: "Affiliate earnings",
      value: "$200",
      change: "-0.65%",
      icon: <AiOutlinePercentage className="text-bluebutton" />,
      bgColor: "bg-[#D2E1F1]",
    },
    {
      label: "Fees",
      value: "$200",
      icon: <BsArrowUpRight className="text-[#FF5789]" />,
      bgColor: "bg-[#FEECDC]",
    },
  ],
  history: [
    {
      name: "Men’s T-shirt collection",
      fees: "$59.99",
      payout: "$500.99",
      date: "20th Oct. 2024",
    },
    {
      name: "Men’s T-shirt collection",
      fees: "$59.99",
      payout: "$500.99",
      date: "20th Oct. 2024",
    },
    {
      name: "Men’s T-shirt collection",
      fees: "$59.99",
      payout: "$500.99",
      date: "20th Oct. 2024",
    },
  ],
};