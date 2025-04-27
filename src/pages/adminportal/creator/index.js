import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Details from "@/components/adminportal/adminsidebar/details/Details";
import Pagination from "@/components/adminportal/adminsidebar/Pagination";
import Search from "@/components/adminportal/adminsidebar/Search";
const creatorsData = [
  {
    id: 1,
    name: "Lucas Green",
    email: "contact@youexample.com",
    address: "123 Creative Lane, Imagination City, CA 90210",
    contact: "(555) 123-4567",
    status: "Active",
    tier: "Tier 1",
  },
  {
    id: 2,
    name: "Emily Brown",
    email: "emily@example.com",
    address: "456 Design Street, Dreamland City, CA 90210",
    contact: "(555) 987-6543",
    status: "Inactive",
    tier: "Tier 2",
  },
  {
    id: 3,
    name: "Oliver White",
    email: "oliver@example.com",
    address: "789 Innovation Avenue, Vision City, CA 90210",
    contact: "(555) 567-8901",
    status: "Active",
    tier: "Tier 3",
  },
  {
    id: 4,
    name: "Sophie Black",
    email: "sophie@example.com",
    address: "321 Creativity Blvd, Fantasy City, CA 90210",
    contact: "(555) 234-5678",
    status: "Active",
    tier: "Tier 1",
  },
  {
    id: 5,
    name: "Noah Green",
    email: "noah@example.com",
    address: "654 Artist Road, Magic City, CA 90210",
    contact: "(555) 345-6789",
    status: "Inactive",
    tier: "Tier 2",
  },
  {
    id: 6,
    name: "Ava Red",
    email: "ava@example.com",
    address: "852 Creator Drive, Wonder City, CA 90210",
    contact: "(555) 456-7890",
    status: "Active",
    tier: "Tier 3",
  },
  {
    id: 7,
    name: "Ethan Blue",
    email: "ethan@example.com",
    address: "111 Freedom Blvd, Joy City, CA 90210",
    contact: "(555) 123-7890",
    status: "Active",
    tier: "Tier 1",
  },
  {
    id: 8,
    name: "Mia Sky",
    email: "mia@example.com",
    address: "222 Joy Avenue, Shine City, CA 90210",
    contact: "(555) 567-1234",
    status: "Inactive",
    tier: "Tier 2",
  },
  {
    id: 9,
    name: "James Grey",
    email: "james@example.com",
    address: "333 Vibe Street, Chilltown, CA 90210",
    contact: "(555) 888-4321",
    status: "Active",
    tier: "Tier 1",
  },
  {
    id: 10,
    name: "Isabelle Silver",
    email: "isabelle@example.com",
    address: "741 Artistic Blvd, Wonder City, CA 90210",
    contact: "(555) 678-9012",
    status: "Active",
    tier: "Tier 1",
  },
  {
    id: 11,
    name: "Liam Gold",
    email: "liam@example.com",
    address: "852 Innovation Road, Magic City, CA 90210",
    contact: "(555) 234-5679",
    status: "Inactive",
    tier: "Tier 2",
  },
];
const PAGE_SIZE = 10;
const ROW_HEIGHT = 50;
const index = () => {
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const totalPages = Math.ceil(creatorsData.length / PAGE_SIZE);
  const paginatedData = creatorsData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const toggleCheckbox = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const openDetails = (creator) => {
    setSelectedCreator(creator);
    setShowDetails(true);
  };
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCreator(null);
  };
  const handleRowClick = (creator, e) => {
    if (e.target.tagName === "INPUT" || e.target.closest("button")) {
      return;
    }
    openDetails(creator);
  };

  return (
    <div
      className="lg:p-4 min-h-screen relative"
      style={{
        overflowY: "auto",
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {!showDetails ? (
        <div className="">
          <div className="flex bg-bluebutton text-white rounded-lg justify-between items-center p-4 border-b">
            <div>
              <h2 className="text-xl font-semibold ">Total Users</h2>
              <p className="text-2xl font-bold">
                {creatorsData.length.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col  lg:flex-row items-center gap-2">
              <button className="bg-white order-2 lg:order-1 text-bluebutton px-4 py-2 rounded-md text-sm">
                + add creator
              </button>
              <button className="bg-transparent order-1 lg:order-2 border border-white px-3 py-2 rounded-md text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>
          </div>
          <Search />
          <div className="overflow-x-auto w-full">
            <table className="min-w-[1000px] text-sm text-left">
              <thead className="font-normal border-b text-graycolor whitespace-nowrap">
                <tr>
                  <th className="p-3 pl-4">
                    <input type="checkbox" disabled />
                  </th>
                  <th className="p-3">Creator</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3 pr-4"></th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {paginatedData.map((creator) => (
                  <tr
                    key={creator.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    style={{ height: `${ROW_HEIGHT}px` }}
                    onClick={(e) => handleRowClick(creator, e)}
                  >
                    <td className="p-3 pl-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(creator.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleCheckbox(creator.id);
                        }}
                        className="accent-blue-500"
                      />
                    </td>
                    <td className="p-3 font-medium flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-600 text-xs"
                        />
                      </div>
                      {creator.name}
                    </td>
                    <td className="p-3">{creator.email}</td>
                    <td className="p-3 text-gray-700">{creator.address}</td>
                    <td className="p-3 text-gray-700">{creator.contact}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          creator.status === "Active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {creator.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">
                      Tier {creator.tier.split(" ")[1]}
                    </td>
                    <td className="p-3 pr-4 text-right relative"></td>
                  </tr>
                ))}
                {paginatedData.length < PAGE_SIZE &&
                  Array(PAGE_SIZE - paginatedData.length)
                    .fill(null)
                    .map((_, index) => (
                      <tr
                        key={`empty-${index}`}
                        style={{ height: `${ROW_HEIGHT}px` }}
                      >
                        <td className="p-3 pl-4"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3"></td>
                        <td className="p-3 pr-4"></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={handlePageChange}
          />
        </div>
      ) : (
        selectedCreator && (
          <div className="">
            <Details creator={selectedCreator} onClose={closeDetails} />
          </div>
        )
      )}
    </div>
  );
};
export default index;
