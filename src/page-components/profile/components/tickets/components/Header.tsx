import ViewAll from "@/components/ui/Buttons/ViewAll";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="mt-5 flex justify-between">
      <h1 className="font-medium text-lg">Tickets</h1>
      <Link href="/profile/tickets/ticket-List">
        <ViewAll />
      </Link>
    </div>
  );
}

export default Header;
