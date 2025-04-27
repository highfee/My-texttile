import { useState } from "react";
import { FaFilter, FaRegComments, FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSwitch } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";
import { CiShoppingTag } from "react-icons/ci";
import { TbTicket } from "react-icons/tb";
import Link from "next/link";
import { tickets } from "@/data/adminData/helpcenter";

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState("All Ticket");
  const tabs = ["All Ticket", "Open", "Pending Tickets", "Resolved"];

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === "All Ticket") return true;
    if (activeTab === "Open") return ticket.status === "Open";
    if (activeTab === "Pending Tickets") return ticket.status === "Pending";
    if (activeTab === "Resolved") return ticket.status === "Resolved";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="bg-bluebutton w-full py-20 px-4 flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="How can we help you?"
            className="w-full pl-12 pr-5 py-2 rounded-md outline-none text-center placeholder-gray-400"
          />
        </div>
      </div>

      <section className="flex justify-center -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl px-4">
          {[
            { title: "Total Tickets", value: tickets.length },
            { title: "Open Tickets", value: tickets.filter(t => t.status === "Open").length },
            { title: "Pending Tickets", value: tickets.filter(t => t.status === "Pending").length },
            { title: "Resolved Tickets", value: tickets.filter(t => t.status === "Resolved").length },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 lg:p-6 rounded-xl shadow-md flex flex-col text-left"
            >
              <p className="text-md text-graycolor">{item.title}</p>
              <p className="text-2xl font-bold text-bluebutton py-1 lg:py-2">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="flex flex-col items-center flex-1 mt-8">
        <div className="w-full max-w-4xl px-4">
          <nav className="flex flex-wrap justify-start gap-4 sm:gap-8 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-base pb-2 ${
                  activeTab === tab
                    ? "text-bluebutton font-semibold "
                    : "text-graycolor"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex justify-start mb-6">
            <button className="flex items-center gap-2 text-graycolor opacity-[0.7] border px-4 py-2 rounded-md shadow-sm hover:bg-gray-50">
              <IoMdSwitch />
              <span className="text-sm">Filter</span>
              <IoIosArrowDown />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <Link href={`/helpcenter/livechat/${ticket.chatId}`} key={`${ticket.id}-${ticket.status}`}>
                  <div className="bg-white p-3 lg:p-6 rounded-xl shadow-md border flex flex-col gap-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex flex-row justify-between items-center text-sm text-graycolor">
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-400 text-black p-2 rounded-full text-lg font-semibold">
                          <TbTicket />
                        </span>
                        <span className="font-semibold">Ticket</span>
                        <span className="opacity-50">{ticket.id}</span>
                      </div>
                      <div className="flex items-center lg:gap-2">
                        <span className="opacity-50">{ticket.date}</span>
                        <span
                          className={`font-semibold ${
                            ticket.status === "Open"
                              ? "text-green-500"
                              : ticket.status === "Pending"
                              ? "text-pink-500"
                              : "text-gray-400"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-graycolor">{ticket.title}</h2>
                    <p className="opacity-70 text-sm">{ticket.description}</p>
                    <div className="flex flex-row justify-between items-center mt-4 text-md text-graycolor opacity-90 font-medium gap-4">
                      <div className="flex items-center gap-2">
                        <img
                          src="/adminportal/helpcenter/helpcenter.png"
                          alt="User"
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{ticket.user}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-md">
                        <div className="hidden lg:flex items-center gap-1">
                          <CiShoppingTag className="opacity-50" />
                          <span>{ticket.categories.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoIosAttach className="opacity-50" />
                          <span>{ticket.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaRegComments className="opacity-50" />
                          <span>{ticket.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No tickets found for this filter
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}