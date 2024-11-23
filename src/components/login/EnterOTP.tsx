"use client";
import React, { useState, ChangeEvent, FocusEvent } from "react";
import Button from "../ui/Buttons/Button";
import Register from "./Register";
import Success from "./Success";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import toast from "react-hot-toast";
import { authApi } from "@/services/authService";
import { useDispatch } from "react-redux";
import { setUserId } from "@/store/locationSlice";

interface EnterOTPProps {
  verificationId: string;
  phoneNumber: string;
  closeModal: () => void;
}

interface UserData {
  user: {
    _id: string;
    name: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
    profileImageUrl: string;
    coinBalance: number;
    referralCode: string;
    // Add other fields as needed
  };
  tokens: {
    access: { token: string; expires: string };
    refresh: { token: string; expires: string };
  };
}

function EnterOTP({ verificationId, phoneNumber, closeModal }: EnterOTPProps) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isActiveRegister, setIsActiveRegister] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        if (typeof window !== "undefined") {
          const nextInput = document.getElementById(`otp-input-${index + 1}`);
          nextInput?.focus();
        }
      }
    }
  };

  const handleFocusOut = (e: FocusEvent<HTMLInputElement>, index: number) => {
    if (e.target.value === "" && index > 0) {
      if (typeof window !== "undefined") {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const isButtonActive = otp.join("").length === 6;

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setLoading(true);
      try {
        const credential = PhoneAuthProvider.credential(
          verificationId,
          otpString
        );
        await signInWithCredential(auth, credential);
        toast.success("Phone number verified successfully!");

        const countryCode = "91";
        const checkUserResponse = await authApi.checkUserExists(
          countryCode,
          phoneNumber
        );

        if (checkUserResponse.status && checkUserResponse.statusCode === 200) {
          if (checkUserResponse.data.userExists) {
            const loginResponse = await authApi.login(countryCode, phoneNumber);
            if (loginResponse.status && loginResponse.statusCode === 200) {
              localStorage.setItem("loggedIn", JSON.stringify(true));
              toast.success("Login successful!");
              setUserData(loginResponse.data);
              localStorage.setItem(
                "accessToken",
                loginResponse.data.tokens.access.token
              );
              localStorage.setItem(
                "refreshToken",
                loginResponse.data.tokens.refresh.token
              );

              dispatch(setUserId(loginResponse.data.user._id));
            } else {
              throw new Error(loginResponse.message || "Login failed");
            }
          } else {
            setIsActiveRegister(true);
          }
        } else {
          throw new Error(
            checkUserResponse.message || "Failed to check user existence"
          );
        }
      } catch (error) {
        console.error("Error during OTP verification or login:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isActiveRegister) {
    return <Register phoneNumber={phoneNumber} closeModal={closeModal} />;
  }

  if (userData) {
    return <Success userData={userData} closeModal={closeModal}  />;
  }

  return (
    <div className="w-[18rem] sm:w-[30rem] md:w-[35rem] mx-auto bg-white p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center">
        Enter OTP
      </h1>
      <p className="text-sm sm:text-base text-customGrayLight2 mb-4 sm:mb-6 text-center">
        We have sent a 6-digit code to {phoneNumber}.
      </p>
      <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            onFocus={(e) => e.target.select()}
            onBlur={(e) => handleFocusOut(e, index)}
            className="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg sm:text-xl border rounded-xl sm:rounded-2xl focus:outline-none border-customBlueLight"
            maxLength={1}
          />
        ))}
      </div>
      <div className="mt-6 sm:mt-8">
        <Button
          backgroundColor={
            isButtonActive ? "bg-customBlueLight" : "bg-gray-300 border-none"
          }
          borderRadius="rounded-3xl"
          textColor="text-white"
          fontSize="text-sm sm:text-base font-medium"
          width="w-full"
          onClick={handleSubmit}
          disabled={!isButtonActive || loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
      <div className="mt-5">
        <p className="text-xs sm:text-sm text-customGrayLight2">
          Didn&apos;t receive the code?{" "}
          <span className="text-customBlueLight font-medium cursor-pointer">
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
  
}

export default EnterOTP;
