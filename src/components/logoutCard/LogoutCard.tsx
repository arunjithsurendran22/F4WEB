import React from "react";
import Button from "../ui/Buttons/Button";

interface LogoutCardProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmLogout: () => void;
}

const LogoutCard: React.FC<LogoutCardProps> = ({
  setIsModalOpen,
  handleConfirmLogout,
}) => {
  return (
    <div className="p-4 text-center w-64">
      <p className="font-medium">Are you sure you want </p>
      <p className="font-medium">to logout?</p>
      <div className="flex flex-col justify-center items-center mt-5">
        <Button
          backgroundColor="bg-customRed3 "
          textColor="text-white"
          border="border-none"
          borderRadius="rounded-3xl"
          fontSize="text-sm"
          height="h-10"
          onClick={handleConfirmLogout}
        >
          Yes
        </Button>
        <Button
          border="border-none"
          textColor="text-black"
          fontSize="text-sm"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LogoutCard;
