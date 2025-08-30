import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Send,
  MoreVertical,
  Search,
} from 'lucide-react';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
      // Add message sending logic here
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <MoreVertical className="cursor-pointer hover:text-gray-300" />
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2 text-gray-400" />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {/* Conversation list will be dynamically populated */}
          <div
            className="flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => setSelectedChat({ id: 1, name: "Friend" })}
          >
            <div className="w-12 h-12 bg-gray-600 rounded-full mr-3"></div>
            <div>
              <p className="font-semibold">Friend</p>
              <p className="text-sm text-gray-400">Say hi!</p>
            </div>
          </div>
          {/* Add more conversation items dynamically */}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-3"></div>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-sm text-gray-400">Active now</p>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
              {/* Messages will be dynamically added here */}
              <div className="space-y-4">
                {/* Example structure for dynamic messages */}
              </div>
            </div>
            <form onSubmit={handleSendMessage} className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  <Send />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageCircle className="mx-auto" size={48} />
              <p className="mt-2">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
