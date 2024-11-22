"use client";
import React, { useState, useEffect } from "react";
import InputBox from "../ui/inputbox/InputBox";
import Button from "../ui/Buttons/Button";
import EnterOTP from "./EnterOTP";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import toast from "react-hot-toast";
import Checkbox from "../ui/Checkbox/Checkbox";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}

interface SignInProps {
  closeModal: () => void;
}

function SignIn({ closeModal }: SignInProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isActiveOtp, setActiveOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");

  useEffect(() => {
    onCaptchaVerify();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("Captcha verified"),
          "expired-callback": () => {
            toast.error("Captcha expired. Please try again.");
            setLoading(false);
          },
        }
      );
    }
  }

  const handleSubmit = async () => {
    if (phoneNumber.length === 10 && isChecked) {
      setLoading(true);
      try {
        onCaptchaVerify();
        const countryCode = "+91"; 
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const appVerifier = window.recaptchaVerifier;

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          fullPhoneNumber,
          appVerifier
        );
        setVerificationId(confirmationResult.verificationId);
        setActiveOtp(true);
        toast.success("OTP sent to your phone!");
      } catch (error) {
        console.error("Error during OTP process:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isButtonActive = phoneNumber.length === 10 && isChecked;

  return (
    <>
      {isActiveOtp ? (
        <EnterOTP
          verificationId={verificationId}
          phoneNumber={phoneNumber}
          closeModal={closeModal}
        />
      ) : (
        <div className="w-[90%] sm:w-[30rem] md:w-[35rem] mx-auto bg-white p-4 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center">
            Sign In
          </h1>
          <p className="text-sm sm:text-base text-customGrayLight2 mb-4 sm:mb-6 text-center">
            Please enter your phone number
          </p>
          <InputBox
            label="Phone Number"
            value={phoneNumber}
            onChange={handleInputChange}
            backgroundColor="bg-none"
            placeHolder="99999 99999"
          />
          <div className="mt-6 sm:mt-8">
            <Button
              backgroundColor={
                isButtonActive
                  ? "bg-customBlueLight"
                  : "bg-gray-300 border-none"
              }
              borderRadius="rounded-3xl"
              textColor="text-white"
              fontSize="text-sm sm:text-base font-medium"
              width="w-full"
              onClick={handleSubmit}
              disabled={!isButtonActive || loading}
            >
              {loading ? "Processing..." : "Continue"}
            </Button>
            <div id="recaptcha-container"></div>
          </div>
          <div className="mt-6">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                borderRadius="rounded-md"
              />
              <p className="text-xs sm:text-sm text-customGrayLight2">
                By ticking, you accept our{" "}
                <span className="text-customBlueLight font-medium">terms</span>{" "}
                and{" "}
                <span className="text-customBlueLight font-medium">
                  conditions
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

export default SignIn;
