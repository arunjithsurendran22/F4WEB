// pages/profile/layout.tsx
import ProfileSideBar from '@/page-components/profile/components/ProfileSideBar';
import React from 'react';


const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <ProfileSideBar />
      <div className="px-14 py-8 flex-grow ">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
