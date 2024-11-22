"use client";
import React, { useState, ChangeEvent } from "react";
import InputBox from "../ui/inputbox/InputBox";
import Button from "../ui/Buttons/Button";
import ReferralCode from "./ReferralCode";

interface RegisterProps {
  phoneNumber: string;
  closeModal: () => void;
}

function Register({ phoneNumber, closeModal }: RegisterProps) {
  const [fullName, setFullName] = useState("");
  const [isActiveReferral, setIsActiveReferral] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleSubmit = () => {
    if (fullName.trim()) {
      setIsActiveReferral(true);
    }
  };

  const isButtonActive = fullName.trim() !== "";

  return (
    <>
      {isActiveReferral ? (
        <ReferralCode phoneNumber={phoneNumber} fullName={fullName} closeModal={closeModal} />
      ) : (
        <div className="w-[90%] sm:w-[31rem] md:w-[35rem] mx-auto bg-white p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
            Register with us
          </h1>
          <p className="text-sm sm:text-base text-customGrayLight2 mb-4 sm:mb-6 text-center">
            Please enter your name
          </p>
          <InputBox
            label="Full Name"
            value={fullName}
            onChange={handleInputChange}
            backgroundColor="bg-none"
            placeHolder="Enter your full name"
          />
          <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
            <Button
              backgroundColor={
                isButtonActive ? "bg-customBlueLight" : "bg-gray-300 border-none"
              }
              borderRadius="rounded-3xl"
              textColor="text-white"
              fontSize="text-sm sm:text-base font-medium"
              width="w-full"
              onClick={handleSubmit}
              disabled={!isButtonActive}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </>
  );
  
}

export default Register;