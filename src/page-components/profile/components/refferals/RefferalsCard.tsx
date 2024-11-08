import Image from "next/image";
import React from "react";

interface ReferralCardProps {
  key: string
  id: string; // Add id prop to pass order id
  name: string;
  profileImageUrl: string;
  referralCode: string;
}

const RefferalsCard: React.FC<ReferralCardProps> = ({
  key, // Use id prop for the onClick handler
  id,
  name,
  profileImageUrl,
  referralCode,
}) => {
  return (
    <div>
      <div className="flex gap-5 items-center mt-3">
        {profileImageUrl && <Image
          src={profileImageUrl}
          alt=""
          width={70}
          height={70}
          className="rounded-full"
        />
        }
        <div>
          <h1 className="font-medium text-md">{name}</h1>
          <p className="text-customBlueLight bg-customBlueLight3 p-1 rounded-md mt-2 ">
            {referralCode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefferalsCard;
