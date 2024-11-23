import React from 'react';
import Image from 'next/image';

export interface InputBoxWithButtonProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;  // Text to display on the button
  onButtonClick?: () => void;  // Callback for button click
  className?: string;  // To allow custom styling if needed
}

const InputBoxWithButton: React.FC<InputBoxWithButtonProps> = ({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  buttonText = "Search", 
  onButtonClick, 
  className = "" 
}) => {
  return (
    <div className={`relative flex items-center border rounded-full md:h-14 bg-white ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3">
        <Image
          src="/icons/search.png"  // Path to the icon in the public folder
          alt="Search Icon"
          width={20}
          height={20}
        />
      </div>
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 w-full border-none outline-none p-2 rounded-l-full text-gray-700 placeholder-gray-500"
      />
      {/* Button */}
      <button
        onClick={onButtonClick}
        className="bg-buttonColor text-white h-14 w-36 rounded-r-full transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputBoxWithButton;
