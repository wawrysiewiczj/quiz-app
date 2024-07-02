import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Animation from "../components/Animation";
import { motion as m } from "framer-motion";

const conversations = [
  {
    id: 1,
    name: "Jane Smith",
    imageurl:
      "https://plus.unsplash.com/premium_photo-1661315514682-e093b4a30af5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastactive: "2 hours ago",
    messages: [
      {
        id: 1,
        sender: "Jane Smith",
        content: "Hey, how are you?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "Me",
        content: "I am good, thanks! How about you?",
        timestamp: "10:32 AM",
      },
    ],
  },
  {
    id: 2,
    name: "QuizApp Support",
    imageurl: "https://www.zert.se/wp-content/uploads/2019/08/Support.png",
    lastactive: "3 seconds ago",
    messages: [
      {
        id: 1,
        sender: "QuizApp Support",
        content: "Your password was successfully changed.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "John Doe",
    imageurl:
      "https://images.unsplash.com/photo-1719430074740-a5ee49a67d45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastactive: "10 minutes ago",
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "I enjoyed your quiz on Science Facts!",
        timestamp: "2 days ago",
      },
    ],
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage) {
      const updatedConversations = conversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: conversation.messages.length + 1,
                  sender: "Me",
                  content: newMessage,
                  timestamp: "Now",
                },
              ],
            }
          : conversation
      );
      setSelectedConversation({
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          {
            id: selectedConversation.messages.length + 1,
            sender: "Me",
            content: newMessage,
            timestamp: "Now",
          },
        ],
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Function to scroll to the bottom of the message container
    const scrollToBottom = () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    };

    // Scroll to bottom when messages change or initially loaded
    scrollToBottom();
  }, [selectedConversation.messages]);

  return (
    <Animation>
      <div className="h-full w-full fixed bottom-0 left-0 pt-20 px-4 pb-48 ">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {/* Conversations List */}
          <ul className="flex gap-2">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-1 rounded-full cursor-pointer ${
                  selectedConversation.id === conversation.id
                    ? "bg-violet-300"
                    : "bg-gray-100"
                } text-gray-700`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-full object-cover object-center"
                    src={conversation.imageurl}
                    alt=""
                  />
                  <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </li>
            ))}
          </ul>

          {/* Selected Conversation */}
          <div className="h-full mt-2 pb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedConversation.name}
              </h3>
              <p className="rounded-lg text-sm">
                {selectedConversation.lastactive}
              </p>
            </div>
            <div
              className="border-t border-gray-300 pt-2 h-full animate duration-300 overflow-y-scroll mt-2"
              ref={messageContainerRef}
            >
              {selectedConversation.messages.map((message, index) => (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={message.id}
                  className={`mb-2 ${
                    message.sender === "Me" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block p-4 py-3 rounded-lg text-sm ${
                      message.sender === "Me"
                        ? "bg-red-300 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </p>
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                </m.div>
              ))}
            </div>
            <div className="flex px-4 w-full left-0 fixed bottom-16">
              <div className="max-w-3xl mx-auto w-full flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-gray-100 text-gray-700 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                  placeholder="Message"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex justify-center items-center ml-2 bg-violet-600 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PaperAirplaneIcon className="w-5 h-5 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Messages;
