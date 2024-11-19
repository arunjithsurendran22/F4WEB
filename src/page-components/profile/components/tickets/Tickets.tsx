"use client";

import React, { useState } from "react";
import InputBoxTickets from "@/components/ui/inputbox/InputBoxTickets";
import Header from "./components/Header";
import HelpTopics from "./components/HelpTopics";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Buttons/Button";

function Tickets() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to handle search button click
  const handleSearch = () => {
   
      router.push(`/profile/tickets/ticket-List?search=${encodeURIComponent(searchTerm)}`);
    
  };

  return (
    <div className="p-3">
      <Header />
      <div className="mt-8">
        {/* Pass the setSearchTerm and handleSearch to InputBoxTickets */}
        {/* <InputBoxTickets 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearchClick={handleSearch} // Update function name here
        /> */}
        <div className="mt-10">
          <Button
            width="w-full md:w-6/12"
            height="h-14"
            backgroundColor="bg-customBlueLight"
            textColor="text-white"
            fontSize="font-medium"
            onClick={handleSearch}
          >
            View Tickets
          </Button>
        </div>

      </div>
      <HelpTopics />
    </div>
  );
}

export default Tickets;
