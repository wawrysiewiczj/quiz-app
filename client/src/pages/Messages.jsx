import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Animation from "../components/Animation";
import SkeletonMessage from "../components/SkeletonMessage";
import { motion as m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  receiveMessageStart,
  receiveMessageSuccess,
  receiveMessageFailure,
} from "../redux/message/messageSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja ładowania danych
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageContainerRef = useRef(null);

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
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(receiveMessageStart());

        const res = await fetch(`/api/messages`);
        if (!res.ok) {
          throw new Error(`Error fetching messages: ${res.statusText}`);
        }

        const data = await res.json();

        dispatch(receiveMessageSuccess(data));
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        dispatch(receiveMessageFailure(error));
      }
    };

    fetchMessages();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      dispatch(sendMessageStart());
      const res = await fetch(`/api/messages/send/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(sendMessageFailure(data));
        return;
      }
      dispatch(sendMessageSuccess(data));
      setMessages([...messages, data]); // Add the new message to the local state
      setNewMessage("");
    } catch (error) {
      dispatch(sendMessageFailure(error));
    }
  };

  if (loading) {
    return (
      <div>
        {/* Wyświetlanie kilku szkieletów wiadomości */}
        <SkeletonMessage isSender={false} />
        <SkeletonMessage isSender={true} />
        <SkeletonMessage isSender={false} />
        <SkeletonMessage isSender={false} />
        <SkeletonMessage isSender={true} />
        <SkeletonMessage isSender={false} />
      </div>
    );
  }

  return (
    <Animation>
      <div className="h-full w-full fixed top-14 left-0 pb-44 ">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {/* Selected Conversation */}
          <div className="h-full">
            <div
              className="h-full animate duration-300 overflow-y-scroll"
              ref={messageContainerRef}
            >
              <div className="flex justify-center items-start py-8">
                <h2>Chat for everyone</h2>
              </div>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <m.div
                    key={message._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className={`flex items-end gap-1 mb-1 px-4 ${
                      message.senderId === currentUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.senderId !== currentUser._id && (
                      <img
                        className="w-6 h-6 rounded-full object-cover object-center"
                        src={message.senderPhoto}
                        alt={`${message.senderUsername}'s profile`}
                      />
                    )}

                    <div
                      className={`flex flex-col max-w-xs  ${
                        message.senderId === currentUser._id
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <h3
                        className={`text-xs text-gray-500 mb-0.5 ${
                          message.senderId === currentUser._id
                            ? " me-3"
                            : " ms-3"
                        }`}
                      >
                        {message.senderUsername}
                      </h3>
                      <p
                        className={`text-md rounded-2xl px-3 py-2  ${
                          message.senderId === currentUser._id
                            ? "bg-blue-300 text-gray-800 dark:bg-blue-500 dark:text-gray-100 self-end "
                            : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                        }`}
                      >
                        {message.message}
                      </p>
                      <p
                        className={`text-xs text-gray-500 hidden ${
                          message.senderId === currentUser._id
                            ? " me-2"
                            : " ms-2"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </m.div>
                ))
              ) : (
                <p className="text-center">No messages found.</p>
              )}
            </div>
            <div className="flex px-4 w-full left-0 fixed bottom-16">
              <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto w-full flex gap-2"
              >
                {/* <button
                  type="button"
                  className="flex justify-center items-center bg-violet-600 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="w-5 h-5 inline" />
                </button> */}
                <input
                  type="text"
                  className="flex-1 bg-white dark:bg-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 border-none px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                  placeholder="Aa"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="flex justify-center items-center bg-violet-600 text-white px-3.5 py-2.5 rounded-xl shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <PaperAirplaneIcon className="w-5 h-5 inline" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Animation>
  );
};

export default Messages;
