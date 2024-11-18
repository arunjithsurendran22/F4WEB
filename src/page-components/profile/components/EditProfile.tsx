"use client";
import Button from "@/components/ui/Buttons/Button";
import InputBoxWithBorderBlue from "@/components/ui/inputbox/InputBoxWithBorderBlue";
import { profileApi } from "@/services/profileService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function EditProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") ?? "";
  const userEmail = searchParams.get("email") ?? "";
  const userMobile = searchParams.get("mobileNumber") ?? "";
  const [fullName, setFullName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    if (!fullName || !email) {
      alert("Please fill out all the fields");
      return;
    }

    const formData = {
      name: fullName,
      email: email,
    };

    setLoading(true);

    try {
      const response = await profileApi.updateProfile(formData);

      if (response.data) {
        toast.success(response.message);
        router.push("/profile");
      }

      setFullName("");
      setEmail("");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-14 py-4 md:w-4/12">
      <h1 className="font-medium text-lg mb-6">Profile</h1>
      <div className="mt-8">
        <InputBoxWithBorderBlue
          label="Full Name"
          value={fullName}
          placeHolder="Enter your full name"
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <InputBoxWithBorderBlue
          label="E-mail"
          value={email}
          placeHolder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <InputBoxWithBorderBlue
          label="Mobile Number"
          value={userMobile}
          placeHolder="Mobile number"
          onChange={() => {}}
          readOnly
        />
      </div>
      <div className="mt-8">
        <Button
          width="w-full"
          height="h-14"
          backgroundColor="bg-customGrayLight4"
          border="border-none"
          textColor="text-customGrayLight2"
          fontWeight="font-medium"
          onClick={handleFormSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default EditProfile;
