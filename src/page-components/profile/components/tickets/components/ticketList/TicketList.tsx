"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import InputBoxTickets from "@/components/ui/inputbox/InputBoxTickets";
import Button from "@/components/ui/Buttons/Button";
import TicketListCard from "./TicketListCard";
import NewMessageBtn from "@/components/ui/Buttons/NewMessageBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { ticketApi } from "@/services/ticketService";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";

function TicketList() {
  const router = useRouter();

  const searchQuery = useSearchParams();
  const searchKey = searchQuery.get("search") ?? "";
  const [filterStatus, setFilterStatus] = useState<"active" | "closed">(
    "active"
  );
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(searchKey);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ticketApi.getAllTickets(searchTerm);
      setTickets(response.data.tickets);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to fetch tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [searchTerm]);

  const filteredTickets = tickets.filter(
    (ticket) => ticket.ticketStatus === filterStatus
  );

  const handleAddClick = () => {
    router.push("/profile/tickets");
  };

  const handleTicketClick = (
    ticketId: string,
    id: string,
    ticketStatus: string
  ) => {
    router.push(
      `/profile/tickets/ticket-chat?ticketId=${ticketId}&id=${id}&ticketStatus=${ticketStatus}`
    );
  };

  const handleSearchClick = () => {
    fetchTickets();
  };

  return (
    <div className="p-3">
      <Header />
      <div className="mt-8 md:w-96">
        <InputBoxTickets
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearchClick={handleSearchClick}
        />
      </div>
      <div className="flex justify-between xxs:justify-normal gap-2 mt-8 mb-5 ">
        <Button
          backgroundColor={
            filterStatus === "active" ? "bg-customBlueLight" : ""
          }
          textColor={filterStatus === "active" ? "text-white" : "text-black"}
          width="w-full xxs:w-28"
          height="h-10"
          fontWeight="text-sm"
          borderRadius="rounded-2xl"
          onClick={() => setFilterStatus("active")}
        >
          Active
        </Button>
        <Button
          backgroundColor={
            filterStatus === "closed" ? "bg-customBlueLight" : ""
          }
          textColor={filterStatus === "closed" ? "text-white" : "text-black"}
          width="w-full xxs:w-28"
          height="h-10"
          fontWeight="text-sm"
          borderRadius="rounded-2xl"
          onClick={() => setFilterStatus("closed")}
        >
          Closed
        </Button>
      </div>
      {/* Render loading or error messages */}
      {loading ? (
        <div className="flex justify-center mt-4">
          <SpinnerLoader /> {/* Show loader while fetching */}
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <div className="h-80 overflow-y-auto custom-scrollbar">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketListCard
                key={ticket._id}
                _id={ticket._id}
                ticketId={ticket.ticketId}
                time={new Date(ticket.raisedOn).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                status={ticket.ticketStatus}
                ticketCount={ticket.unreadMessages}
                onClick={() =>
                  handleTicketClick(
                    ticket.ticketId,
                    ticket._id,
                    ticket.ticketStatus
                  )
                }
              />
            ))
          ) : (
            <div className="italic items-center flex justify-center">
              <div>
                <Sorry />{" "}
                <p className="text-gray-500 mt-1 ">
                  No tickets found for {filterStatus} status.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-end p-3">
        <NewMessageBtn onClick={handleAddClick} />
      </div>
    </div>
  );
}

export default TicketList;
