'use client';
import { useRef, useEffect } from 'react';
import { FiSend } from "react-icons/fi";
import { CgAttachment } from "react-icons/cg";

const MainContent = ({ activeChat, chats }) => {
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, chats]);

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {currentChat ? (
          <div className="max-w-2xl mx-auto space-y-4">
            {currentChat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-bluebutton text-white' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>Select a chat to view messages</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {currentChat && (
        <div className="sticky bottom-0   p-4">

        <div className="max-w-2xl mx-auto flex items-center ">
      {/* Attachment Icon */}
      <CgAttachment className="text-xl text-gray-600 cursor-pointer" />

      {/* Text Input */}
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* Send Button */}
      <button className="bg-bluebutton hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors">
        <FiSend className="text-lg" />
      </button>
    </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;