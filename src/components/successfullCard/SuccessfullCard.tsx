'use client'
import React from "react";
import Image from "next/image";
import Button from "../ui/Buttons/Button";

interface SuccessfullCardProps {
  onContinue: () => void; // Prop to handle the continue button click
}

const SuccessfullCard: React.FC<SuccessfullCardProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Image
        src="/icons/successfull.png"
        alt="Success Icon"
        width={150}
        height={150}
        className="mb-4"
      />
      <h1 className="text-2xl font-semibold mb-2">Order Successful</h1>
      <p className="text-lg mb-4">You are rewarded with 30 Coins</p>
      <Button
        backgroundColor="bg-customBlueLight"
        textColor="text-white"
        width="w-full"
        onClick={onContinue} // Call the passed function on button click
      >
        Continue
      </Button>
    </div>
  );
};

export default SuccessfullCard;
