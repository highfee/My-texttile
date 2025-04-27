'use client';
import { Search } from "lucide-react";

const ChatSidebar = ({ chats = [], activeChat, setActiveChat, searchQuery, setSearchQuery }) => {
  const filteredChats = chats.filter(chat => {
    if (!chat) return false;
    const search = searchQuery.toLowerCase();
    return (
      (chat.name || '').toLowerCase().includes(search) ||
      (chat.lastMessage || '').toLowerCase().includes(search)
    );
  });

  return (
    <div className="hidden lg:flex  bg-white  border-gray-200 h-full overflow-y-auto flex-shrink-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Open Tickets</h2>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-bluebutton focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeChat === chat.id 
                    ? 'bg-bluebutton text-white' 
                    : 'bg-[#DCE7F2] text-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src={chat.avatar || '/adminportal/admindashboard/tab1.svg'} // Fallback to default avatar
                        alt={chat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium truncate">{chat.name || 'Unknown'}</div>
                      {chat.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-2">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-sm truncate">
                      {chat.lastMessage || ''}
                    </div>
                    <div className={`text-xs mt-1 ${
                      activeChat === chat.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {chat.time || ''}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4 text-sm">
              No matching chats found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;