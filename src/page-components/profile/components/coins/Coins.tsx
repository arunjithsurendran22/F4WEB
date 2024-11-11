'use client'
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Image from "next/image";
import { profileApi } from "@/services/profileService";

function Coins() {
  const [profile, setProfile] = useState({
    coinBalance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getProfileDetails();
        const profileData = response.data.profileDetails;
        setProfile({
          coinBalance: profileData.coinBalance
        });
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div>
      <Header />
      <div className="mt-8 flex  gap-3 items-center">
        <Image src="/icons/star-coin.svg" alt="" width={60} height={60} />
        <p className="text-xl font-normal">{profile.coinBalance} Coins</p>
      </div>
    </div>
  );
}

export default Coins;
