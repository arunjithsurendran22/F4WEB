"use client";

import React, { useState } from "react";
import InputBoxTickets from "@/components/ui/inputbox/InputBoxTickets";
import Header from "./components/Header";
import HelpTopics from "./components/HelpTopics";
import { useRouter } from "next/navigation";

function Tickets() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to handle search button click
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/profile/tickets/ticket-List?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-96 mt-8">
        {/* Pass the setSearchTerm and handleSearch to InputBoxTickets */}
        <InputBoxTickets 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearchClick={handleSearch} // Update function name here
        />
      </div>
      <HelpTopics />
    </div>
  );
}

export default Tickets;