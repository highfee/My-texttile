import React, { useState, useRef, useEffect } from 'react';
import { GoArrowDownLeft } from "react-icons/go";
import Pagination from '../Pagination';
import Search from '../Search';

const allTransactions = [
  {
    id: 1,
    title: 'Webbly collection, 2 item purchase',
    date: '2025-01-18T10:23',
    amount: '$65.76',
  },
  {
    id: 2,
    title: 'Elegant themes bundle, 3 item purchase',
    date: '2025-01-19T11:45',
    amount: '$89.99',
  },
  {
    id: 3,
    title: 'Vintage design pack, 1 item purchase',
    date: '2025-01-20T03:15',
    amount: '$24.99',
  },
  {
    id: 4,
    title: 'Modern UI Kit, 5 item purchase',
    date: '2025-01-23T14:30',
    amount: '$120.45',
  },
  {
    id: 5,
    title: 'Creative font bundle, 2 item purchase',
    date: '2025-01-25T16:55',
    amount: '$55.99',
  },
];



const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export default function Transactions() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 3;
  const actionDropdownRef = useRef(null);
  const calendarDropdownRef = useRef(null);

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target)) {
        setShowActionDropdown(false);
      }
      if (calendarDropdownRef.current && !calendarDropdownRef.current.contains(event.target)) {
        setShowCalendarDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filtered = allTransactions.filter((t) => {
    const tDate = new Date(t.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || tDate >= start) && (!end || tDate <= end);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="lg:p-4 bg-white rounded-md font-sans text-sm w-full">
      <Search/>

      <div className="border border-gray-200 rounded-md divide-y">
        {paginated.length > 0 ? (
          paginated.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between px-3 py-4 hover:bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(t.id)}
                  onChange={() => toggleCheckbox(t.id)}
                  className="mt-1 h-4 w-4 accent-green-500"
                />
                <div className='text-[#10B981] text-xl rounded-full p-2 bg-[#F0F3F4]'>
                    <GoArrowDownLeft/>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(t.date)}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800">{t.amount}</p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No transactions found</div>
        )}
      </div>

      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  goToPage={handlePageChange}
/>
    </div>
  );
}