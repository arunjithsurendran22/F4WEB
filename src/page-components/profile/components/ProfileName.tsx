'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/store/profileSlice";
import Image from "next/image";
import Link from "next/link";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { RootState } from "@/store";

function ProfileName() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileDetails() as any);
  }, [dispatch]);

  return (
    <div className="flex items-center justify-between w-3/12">
      <div>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <h1 className="font-medium">{profile.name || "Unknown"}</h1>
            <p className="text-customGrayLight2">
              {profile.countryCode} {profile.mobileNumber || "N/A"}
            </p>
          </>
        )}
      </div>
      <div>
        <Link
          href={`/profile/edit-profile?name=${profile.name}&&email=${profile.email}`}
        >
          <Image
            src="/icons/Editprofile.png"
            alt="Edit profile"
            width={22}
            height={22}
          />
        </Link>
      </div>
    </div>
  );
}

export default ProfileName;
