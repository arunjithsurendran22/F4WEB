"use client";
import React, { useState, ChangeEvent } from "react";
import InputBox from "../ui/inputbox/InputBox";
import Button from "../ui/Buttons/Button";
import Success from "./Success";
import { authApi } from "@/services/authService";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "@/store/locationSlice";

interface ReferralCodeProps {
  phoneNumber: string;
  fullName: string;
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
  };
  tokens: {
    access: { token: string; expires: string };
    refresh: { token: string; expires: string };
  };
}

function ReferralCode({
  phoneNumber,
  fullName,
  closeModal,
}: ReferralCodeProps) {
  const dispatch = useDispatch();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReferralCode(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const countryCode = "91"; 
      const response = await authApi.register(
        countryCode,
        phoneNumber,
        fullName,
        referralCode 
      );
      if (response.status && response.statusCode === 200) {
        localStorage.setItem("loggedIn", JSON.stringify(true));
        toast.success("Registration successful!");
        const userDataFromResponse: UserData = {
          user: response.data.user,
          tokens: response.data.tokens,
        };
        setUserData(userDataFromResponse);
        dispatch(setUserId(response.data.user._id));
        localStorage.setItem("accessToken", response.data.tokens.access.token);
        localStorage.setItem(
          "refreshToken",
          response.data.tokens.refresh.token
        );
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (userData) {
    return <Success userData={userData} closeModal={closeModal} />;
  }

  return (
    <div className="w-[90%] sm:w-[31rem] md:w-[35rem] mx-auto bg-white p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
        Enter the referral code
      </h1>
      <p className="text-sm sm:text-base text-customGrayLight2 mb-4 sm:mb-6 text-center">
        Please enter your referral code
      </p>
      <InputBox
        label="Referral Code"
        value={referralCode}
        onChange={handleInputChange}
        backgroundColor="bg-none"
        placeHolder="F4FISH43567"
      />
      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
        <Button
          backgroundColor="bg-customBlueLight"
          borderRadius="rounded-3xl"
          textColor="text-white"
          fontSize="text-sm sm:text-base font-medium"
          width="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </Button>
      </div>
      <div className="mt-4 sm:mt-5">
        <p className="text-sm sm:text-base text-customGrayLight2 text-center">
          Didn&apos;t receive the code?{" "}
          <span className="text-customBlueLight font-medium cursor-pointer">
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
  
}

export default ReferralCode;
