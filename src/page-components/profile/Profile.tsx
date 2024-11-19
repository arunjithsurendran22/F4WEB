'use client'
import React from "react";
import ProfileName from "./components/ProfileName";
import Subscriptions from "./components/Subscriptions/Subscriptions";

function Profile() {
  return (
    <div className="p-3 md:py-5">
      <ProfileName />
      <div className="mt-20">
        <Subscriptions />
      </div>
    </div>
  );
}

export default Profile;
