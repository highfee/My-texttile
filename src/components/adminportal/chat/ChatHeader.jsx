'use client';
import { useState, useRef, useEffect } from 'react';
import { MdNotes } from 'react-icons/md';
import Notification from '../Layout/Notification';

const ChatHeader = ({ searchQuery, setSearchQuery }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Live Chat</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={toggleNotifications}
            className="p-1 relative text-graycolor hover:text-gray-700"
          >
            <MdNotes className="w-5 h-5 border border-graycolor rounded-md" />
            <span className="absolute -top-1 -right-1 bg-bluebutton text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <Notification />
            </div>
          )}
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/dashboard/Profile-pic.svg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">James Fisher</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;