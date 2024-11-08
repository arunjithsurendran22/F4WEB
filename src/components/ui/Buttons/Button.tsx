import React from "react";

interface ButtonProps {
  onClick?: () => void;
  width?: string; // Handle responsive classes
  height?: string; // Handle responsive classes
  children?: React.ReactNode; // Allow children to be passed in
  backgroundColor?: string; // Background color prop
  border?: string; // Border style prop
  borderRadius?: string; // Border-radius prop
  textColor?: string;
  fontSize?: string;
  padding?: string;
  fontWeight?: string;
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  width = "w-32",
  height = "h-12",
  children,
  backgroundColor = "bg-white", // Default to white background
  border = "border-2 border-customBlueLight", // Default border style
  borderRadius = "rounded-full", // Default to full rounded corners
  textColor = "text-customBlueLight",
  fontSize = "text-lg",
  padding = "px-3 py-1",
  fontWeight = "font-normal",
  disabled = false, // Default to not disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // Set disabled attribute
      className={`transition-colors  ${width} ${height} ${backgroundColor} ${border} ${borderRadius} ${textColor} ${fontSize} ${padding} ${fontWeight} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // Apply disabled styles if disabled
    
    >
      {children}
    </button>
  );
};

export default Button;
