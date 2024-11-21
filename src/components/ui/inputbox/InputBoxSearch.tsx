import React from "react";
import Image from "next/image";

export interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
}

const InputBoxSearch: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onKeyDown,
  onClick,
  className = "",
  disable = false,
}) => {
  return (
    <div className={`relative flex items-center border rounded-full md:h-12 ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3">
        <Image src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
      </div>
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        disabled={disable} 
        className={`pl-10 w-full border-none outline-none p-2 rounded-full text-gray-700 placeholder-gray-500 
          ${disable ? "cursor-not-allowed bg-white" : ""}`}
      />
    </div>
  );
};

export default InputBoxSearch;
