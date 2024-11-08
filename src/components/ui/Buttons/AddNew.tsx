import React from "react";
import { IoAddOutline } from "react-icons/io5";

interface AddButtonProps {
  label?: string; // Optional label text
  onClick?: () => void; // Function to handle button click
  className?: string; // Optional additional class names for styling
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={` items-center flex justify-center border-2 border-customGrayLight2 text-customGrayLight2 text-2xl font-bold w-8 h-8 rounded-xl ${className}`}
    >
      <IoAddOutline className=" "/>
    </button>
  );
};

export default AddButton;
