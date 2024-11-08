"use client";
import React, { useState } from "react";
import Header from "../Header";
import { FaEllipsisV } from "react-icons/fa"; 
import ChatBox from "./ChatBox";
import { useSearchParams, useRouter } from "next/navigation";
import { ticketApi } from "@/services/ticketService";

const TicketChat: React.FC<any> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketId = searchParams?.get("ticketId") ?? "";
  const id = searchParams?.get("id") ?? "";
  const ticketStatus = searchParams?.get("ticketStatus") ?? "";
  const [showPopover, setShowPopover] = useState(false);

  // Toggle popover visibility
  const togglePopover = () => setShowPopover(!showPopover);

  // Function to end chat
  const endChat = async () => {
    try {
      const response = await ticketApi.closeTicket(id);
      if (response.data) {
        router.push("/profile/tickets/ticket-List");
      }
    } catch (error) {
      console.error("Failed to end chat:", error);
    }
  };

  return (
    <div className="w-10/12 ">
      <Header />
      <div className="flex items-center justify-between py-8 ">
        <h1 className="text-2xl font-semibold">#{ticketId}</h1>
        <div className="relative">
          {/* Show "End Chat" button only if ticketStatus is not "closed" */}
          {ticketStatus !== "closed" && (
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={togglePopover}
            >
              <FaEllipsisV size={20} />
            </button>
          )}
          {showPopover && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10">
              <button
                className="px-5 py-3 w-32 text-customRed font-medium"
                onClick={endChat}
              >
                End Chat
              </button>
            </div>
          )}
        </div>
      </div>
      <ChatBox ticketId={ticketId} />
    </div>
  );
};

export default TicketChat;
