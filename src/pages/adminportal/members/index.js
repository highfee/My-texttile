import React, { useState } from "react";
import Search from "@/components/adminportal/adminsidebar/Search";
import { FaSquarePlus } from "react-icons/fa6";

const membersData = [
  {
    id: 1,
    name: "James Fisher",
    role: "Admin",
    avatar: "/dashboard/Profile-pic.svg", // Placeholder avatar URL
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Support staff",
    avatar: "/adminportal/admindashboard/tab3.svg", // Placeholder avatar URL
  },
  {
    id: 3,
    name: "Oliver Thompson",
    role: "Content Moderator",
    avatar: "/adminportal/admindashboard/tab4.svg", // Placeholder avatar URL
  },
  // Add more member data here
];

const index = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleCheckbox = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className=" md:p-6  min-h-screen"style={{
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
      <div className="bg-white rounded-lg shadow-md p-1 md:p-6">
        {/* Header */}
        <div className="flex  md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Team Members
            </h2>
            <p className="text-sm text-gray-500">Invite or manage members</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 mt-3 md:mt-0">
            <FaSquarePlus />
            Invite Member
          </button>
        </div>
        <Search />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b text-gray-600">
              <tr>
                <th className="p-2 md:p-3 pl-4">
                  <input type="checkbox" disabled />
                </th>
                <th className="p-2 md:p-3">Member</th>
                <th className="p-2 md:p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {membersData.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 md:p-3 pl-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => toggleCheckbox(member.id)}
                      className="accent-blue-500"
                    />
                  </td>
                  <td className="p-2 md:p-3 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {member.name}
                  </td>
                  <td className="p-2 md:p-3 text-right">
                    <div className="flex justify-end">
                      <select className="border p-1 rounded-md text-sm bg-white">
                        <option>{member.role}</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default index;
