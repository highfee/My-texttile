'use client';
import { useState } from 'react';
import ChatSidebar from '@/components/adminportal/chat/ChatSidebar';
import ChatHeader from '@/components/adminportal/chat/ChatHeader';
import MainContent from '@/components/adminportal/chat/MainContent';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Join Dix',
      lastMessage: 'We are still waiting for your response',
      time: '5:22 PM',
      messages: [
        { text: 'Hello How can we assist you today?', time: '5:18 PM', isUser: false },
        { text: 'We are still waiting for your response. Please make a selection from the options provided.', time: '5:22 PM', isUser: false }
      ]
    },
    {
      id: 2,
      name: 'Customer Support',
      lastMessage: 'Hi, sorry for the delay',
      time: '5:30 PM',
      messages: [
        { text: 'Hi, sorry for the delay', time: '5:30 PM', isUser: false },
        { text: "I ordered some dress for the pass two weeks now and I'm yet to get a confirmation.", time: '5:31 PM', isUser: true }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Fixed Header */}
      <ChatHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden lg:px-32 py-4 gap-4">
        {/* Sidebar */}
        <ChatSidebar 
          chats={chats} 
          activeChat={activeChat} 
          setActiveChat={setActiveChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Chat Content */}
        <MainContent 
          activeChat={activeChat} 
          chats={chats}
        />
      </div>
    </div>
  );
};

export default ChatPage;