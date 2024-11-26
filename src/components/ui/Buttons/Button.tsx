import React from "react";

interface ButtonProps {
  onClick?: () => void;
  width?: string; 
  height?: string; 
  children?: React.ReactNode; 
  backgroundColor?: string; 
  border?: string; 
  borderRadius?: string; 
  textColor?: string;
  fontSize?: string;
  padding?: string;
  fontWeight?: string;
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  width = "w-32",
  height = "h-12",
  children,
  backgroundColor = "bg-white", 
  border = "border-2 border-customBlueLight", 
  borderRadius = "rounded-full", 
  textColor = "text-customBlueLight",
  fontSize = "text-lg",
  padding = "px-3 py-1",
  fontWeight = "font-normal",
  disabled = false, 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      className={`transition-colors flex justify-center items-center  ${width} ${height} ${backgroundColor} ${border} ${borderRadius} ${textColor} ${fontSize} ${padding} ${fontWeight} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} 
    >
      {children}
    </button>
  );
};

export default Button;
