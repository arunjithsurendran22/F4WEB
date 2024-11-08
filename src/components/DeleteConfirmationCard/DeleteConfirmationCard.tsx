import React from "react";
import Button from "@/components/ui/Buttons/Button";

interface DeleteConfirmationCardProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmationCard: React.FC<DeleteConfirmationCardProps> = ({
  onDelete,
  onCancel,
}) => {
  return (
    <div className="bg-white  p-6 flex flex-col items-center w-[312px] h-[266px]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="text-center mb-5">
          <p className="font-medium text-lg">Do you want to delete</p>
          <p className="font-medium text-lg">the address?</p>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <Button
            width="w-[180px]"
            height="h-[46px]"
            borderRadius="rounded-full"
            onClick={onDelete}
            backgroundColor="bg-customRed"
            border="border-none"
            textColor="text-white"
          >
            Delete
          </Button>
          <Button
            width="w-[180px]"
            height="h-[46px]"
            borderRadius="rounded-full"
            border="border-none"
            textColor="text-black"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationCard;
