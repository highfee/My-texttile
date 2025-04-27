import React from 'react';
import { FiFileText } from 'react-icons/fi';

const notifications = [
  { id: 1, type: 'Refund Request', message: 'Please review the details and respond accordingly.', unread: true },
  { id: 2, type: 'Refund Request', message: 'Please review the details and respond accordingly.', unread: false },
  { id: 3, type: 'Payment Request', message: 'Please review the details and respond accordingly.', unread: true },
  { id: 4, type: 'Refund Request', message: 'Please review the details and respond accordingly.', unread: false },
];

const Notification = () => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="w-full max-w-sm p-2 font-sans">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold">Notification</h2>
        <span className="text-sm text-bluebutton font-medium cursor-pointer">
          Unread({unreadCount})
        </span>
      </div>
      <div className="space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-1 p-2 rounded-md border ${
              notif.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className=" text-bluebutton text-xl">
              <FiFileText />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{notif.type}</h4>
              <p className="text-gray-600 text-sm">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
