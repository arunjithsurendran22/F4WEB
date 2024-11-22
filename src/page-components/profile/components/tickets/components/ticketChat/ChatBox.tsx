"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import InputBoxChatBtn from "@/components/ui/inputbox/InputBoxChatBtn";
import { ticketApi } from "@/services/ticketService";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

interface Message {
  _id: string;
  ticketId: string;
  sender: "admin" | "user";
  content: string;
  timestamp: string;
}

const ChatBox: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await ticketApi.getChat(ticketId);
        const data = response.data;
        const formattedMessages: Message[] = data.chats.map((chat: any) => ({
          _id: chat._id,
          ticketId: chat.ticketId,
          sender: chat.senderType as "user" | "admin",
          content: chat.message,
          timestamp: new Date(chat.dateSent).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
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
  }, [ticketId]);

  const handleSendMessage = async (newMessageContent: string) => {
    const newMessage: Message = {
      _id: (messages.length + 1).toString(),
      ticketId: ticketId,
      sender: "user",
      content: newMessageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    try {
      await ticketApi.createChat(ticketId, { message: newMessageContent });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    }
  };
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div>
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="w-full  overflow-hidden">
      <div className=" h-96 overflow-y-auto hide-scrollbar">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start md:mb-6 ${
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
                } p-2 md:p-3`}
              >
                <p className="text-[10px] md:text-xs">{message.content}</p>
              </div>
              <p
                className={`text-[10px] md:text-xs text-gray-500 mt-1 ${
                  message.sender === "admin" ? "text-left" : "text-right"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
            {message.sender === "user" && (
              <div className="relative w-10 h-10 ml-3 flex-shrink-0 mt-3 md:mt-3">
                <div className="w-5 h-5 xs:w-7 md:h-7 rounded-full bg-gray-300 flex items-center justify-center">
                  <FaUser className="text-xs text-white" />
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
