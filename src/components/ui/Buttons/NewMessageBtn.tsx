import React from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Importing the plus icon

interface NewMessageBtnProps {
  onClick?: () => void; // Define the onClick prop type
}

function NewMessageBtn({ onClick }: NewMessageBtnProps) {
  return (
    <div>
      <button
        onClick={onClick} // Attach the onClick handler
        className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-black hover:shadow-3xl hover:scale-110 transition-transform transition-shadow duration-300 ease-in-out"
      >
        <AiOutlinePlus className="text-2xl" />
      </button>
    </div>
  );
}

export default NewMessageBtn;
