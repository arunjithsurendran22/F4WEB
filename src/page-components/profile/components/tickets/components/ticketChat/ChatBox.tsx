"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import InputBoxChatBtn from "@/components/ui/inputbox/InputBoxChatBtn";
import { ticketApi } from "@/services/ticketService";


interface Message {
  _id: string; // Unique ID for each message
  ticketId: string; // ID of the ticket associated with the message
  sender: "admin" | "user"; // Sender type
  content: string; // Message content
  timestamp: string; // Timestamp of the message
}

const ChatBox: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat messages when the component mounts or ticketId changes
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await ticketApi.getChat(ticketId);
        const data = response.data; // Assuming the response structure includes data
        const formattedMessages: Message[] = data.chats.map((chat: any) => ({
          _id: chat._id,
          ticketId: chat.ticketId,
          sender: chat.senderType as "user" | "admin",
          content: chat.message,
          timestamp: new Date(chat.dateSent).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // Format timestamp
        }));
        setMessages(formattedMessages);
      } catch (err) {
        setError("Failed to fetch chats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [ticketId]); // Trigger fetch when ticketId changes

  // Handle new user message submission
  const handleSendMessage = async (newMessageContent: string) => {
    const newMessage: Message = {
      _id: (messages.length + 1).toString(),
      ticketId: ticketId, // Pass the ticketId
      sender: "user",
      content: newMessageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Current time
    };

    // Update messages state with the new message optimistically
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Send the message to the server
    try {
      await ticketApi.createChat(ticketId, { message: newMessageContent });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
      // Optionally, you could remove the optimistically added message if sending fails
      // setMessages(prevMessages => prevMessages.slice(0, -1));
    }
  };

  // Scroll to the last message when a new message is added or the chat mounts
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Triggered every time the messages state changes

  if (loading) {
    return <div>Loading chats...</div>; // Loading state
  }

  return (
    <div className="w-full my-4 overflow-hidden">
      <div className="p-4 h-96 overflow-y-auto hide-scrollbar">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start mb-6 ${
              message.sender === "admin" ? "justify-start" : "justify-end"
            }`}
          >
            {message.sender === "admin" && (
              <div className="relative w-10 h-10 mr-3 flex-shrink-0">
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-customBlueLight rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <FaUserAlt className="text-white" />
                </div>
              </div>
            )}
            <div className="flex flex-col max-w-xs">
              <div
                className={`${
                  message.sender === "admin"
                    ? "bg-customGrayLight6 text-customGrayLight2 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl"
                    : "bg-customBlueLight text-white rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl"
                } p-3`}
              >
                <p>{message.content}</p>
              </div>
              <p
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === "admin" ? "text-left" : "text-right"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
            {message.sender === "user" && (
              <div className="relative w-10 h-10 ml-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Reference to scroll to the bottom */}
        <div ref={chatEndRef}></div>
      </div>
      <div className="mt-4">
        {/* Pass handleSendMessage to InputBoxChatBtn */}
        <InputBoxChatBtn onButtonClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
