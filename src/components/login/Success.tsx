import React from "react";
import Button from "../ui/Buttons/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
}

interface SuccessProps {
  userData: UserData;
  closeModal: () => void;
}

function Success({ userData, closeModal }: SuccessProps) {
  const router = useRouter();

  const handleContinue = () => {
    if (closeModal) {
      closeModal();
      router.push("/");
      window.location.reload();
    } else {
      console.error("closeModal function is undefined");
    }
  };

  return (
    <div className="w-[31rem] mx-auto bg-white p-6 flex flex-col items-center">
      <div>
        <div className="w-60 flex flex-col justify-center items-center">
          <Image
            src="/icons/Icon - Success.png"
            alt="Success Icon"
            width={120}
            height={120}
          />
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Welcome back, {userData.user.name}!
          </h1>
          <p className="text-customGrayLight2 text-sm mb-6 text-center">
            You have successfully logged in to your account.
          </p>
        </div>
      </div>
      <Button
        backgroundColor={"bg-customBlueLight"}
        borderRadius="rounded-3xl"
        textColor="text-white"
        fontSize="font-medium"
        width="w-full"
        onClick={handleContinue}
      >
        Continue to Dashboard
      </Button>
    </div>
  );
}

export default Success;
