import React from "react";
import Button from "@/components/ui/Buttons/Button";

interface CreateComplaintConfirmationCardProps {
  onConfirm: () => void; // Function to confirm the creation
  onCancel: () => void; // Function to cancel the action
}

const ComplaintConfirmationCard: React.FC<
  CreateComplaintConfirmationCardProps
> = ({ onConfirm, onCancel }) => {
  return (
    <div className="bg-white  p-6 flex flex-col items-center w-[312px] h-[266px]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="text-center mb-5">
          <p className="font-medium text-lg">Are you sure you want to</p>
          <p className="font-medium text-lg">register this complaint?</p>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <Button
            width="w-[180px]"
            height="h-[46px]"
            borderRadius="rounded-full"
            onClick={onConfirm} // Call onConfirm when user clicks
            backgroundColor="bg-customRed" // Change color to indicate confirmation
            border="border-none"
            textColor="text-white"
          >
            Confirm
          </Button>
          <Button
            width="w-[180px]"
            height="h-[46px]"
            borderRadius="rounded-full"
            border="border-none"
            textColor="text-black"
            onClick={onCancel} // Call onCancel when user clicks
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintConfirmationCard;
