"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import InputBox from "@/components/ui/inputbox/InputBox";
import RefferalsCard from "./RefferalsCard";
import { profileApi } from "@/services/profileService";

function Refferals() {
  const [profile, setProfile] = useState({
    name: "",
    countryCode: "",
    mobileNumber: "",
    referralCode: ""
  });
  const [referralId, setReferralId] = useState("");
  const [referralProfiles, setReferralProfiles] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getProfileDetails();
        const profileData = response.data.profileDetails;
        setProfile({
          name: profileData.name,
          countryCode: profileData.countryCode,
          mobileNumber: profileData.mobileNumber,
          referralCode: profileData.referralCode
        });
        setReferralId(profileData.referralCode)
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await profileApi.getReferrals();
        const profiles = response.data.profiles;
        setReferralProfiles(profiles);
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setReferralId(e.target.value);
  };

  return (
    <div className="p-3">
      <Header />
      <div className="md:w-96 mt-8">
        <InputBox
          label="My Referral ID"
          placeHolder="Enter referral ID"
          value={referralId}
          onChange={handleChange}
          disabled
          backgroundColor="bg-white"
        />
      </div>

      <h1 className="text-lg font-medium mt-4">My Referrals</h1>

      {referralProfiles.map((profile) => (
        <RefferalsCard
          key={profile._id}
          id={profile._id}
          name={profile.name}
          profileImageUrl={profile.profileImageUrl}
          referralCode={profile.referralCode}
        />
      ))}
    </div>
  );
}

export default Refferals;
