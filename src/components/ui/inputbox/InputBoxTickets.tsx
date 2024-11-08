import React from "react";
import Image from "next/image";

export interface InputBoxWithButtonProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void; // Callback for button click search
  className?: string;
}

const InputBoxTickets: React.FC<InputBoxWithButtonProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearchClick,
  className = "",
}) => {
  return (
    <div
      className={`relative flex items-center rounded-full h-14 bg-customBlueLight2 ${className}`}
    >
      <div className="absolute left-3">
        <Image
          src="/icons/search.png"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 w-full border-none outline-none p-2 rounded-l-full text-gray-700 placeholder-gray-500 bg-customBlueLight2"
      />
      <button
        onClick={onSearchClick}
        className="bg-customBlueLight2 flex justify-center items-center h-5 w-20 rounded-r-full border-l-2 transition-colors"
      >
        <Image src="/icons/Filter.png" alt="" width={20} height={20} />
      </button>
    </div>
  );
};

export default InputBoxTickets;
