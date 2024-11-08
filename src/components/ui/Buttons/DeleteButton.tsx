import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteButtonProps {
  onClick?: () => void; // Function to be called on click
  size?: string;       // Optional prop to define the size of the icon/button
  color?: string;      // Optional prop to define the color of the icon
  className?: string;  // Optional prop to add additional Tailwind CSS classes
  hoverColor?: string; // Custom hover color class
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  size = '24px',  // Default size of the icon
  color = 'text-black', // Default color of the icon
  className = '', // Allow additional custom classes
  hoverColor = 'text-red-600', // Default hover color
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center  transition ${className}`}
      aria-label="Delete"
    >
      <RiDeleteBin6Line
        className={`${color} hover:${hoverColor}`}
        size={size}
      />
    </button>
  );
};

export default DeleteButton;
