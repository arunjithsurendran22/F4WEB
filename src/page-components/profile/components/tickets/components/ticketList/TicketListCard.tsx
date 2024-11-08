import React from "react";

interface TicketListCardProps {
  _id: string;
  ticketId: string;
  time: string;
  status: "active" | "closed";
  ticketCount: number;
  onClick?: (id: string) => void; // Update to accept the ticket ID
}

function TicketListCard({
  _id,
  ticketId,
  time,
  status,
  ticketCount,
  onClick,
}: TicketListCardProps) {
  return (
    <div className="border-b py-4 cursor-pointer" onClick={() => onClick?.(_id)}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-lg">{ticketId}</h1>
        <p className="text-customGrayLight2 text-sm">{time}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          className={`${
            status === "active"
              ? "bg-customGreenLite3 text-customGreenLite"
              : "bg-customRed2 text-customRed"
          } border-none rounded-md w-20 h-9 text-sm`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
        <div className="bg-customBlueLight p-1 w-7 h-7 text-white rounded-full flex items-center justify-center">
          <p>{ticketCount}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketListCard;
