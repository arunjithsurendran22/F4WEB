import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import TicketChat from "@/page-components/profile/components/tickets/components/ticketChat/TicketChat";
import React, { Suspense } from "react";

function TicketChatPage() {
  return (
    <div>
      <Suspense fallback={
          <div>
            <SpinnerLoader />
          </div>
        }>
        <TicketChat />
      </Suspense>
    </div>
  );
}

export default TicketChatPage;
