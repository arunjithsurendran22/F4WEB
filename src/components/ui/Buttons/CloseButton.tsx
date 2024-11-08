import React from "react";
import { IoCloseSharp } from "react-icons/io5";
interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-customGrayLight rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
    >
      <IoCloseSharp className="text-lg" />
    </div>
  );
};

export default CloseButton;
