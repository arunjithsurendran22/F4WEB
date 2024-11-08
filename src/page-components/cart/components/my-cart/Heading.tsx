import { RootState } from "@/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function Heading() {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold ">My Cart</h1>
      <div className="flex items-center gap-2">
        <Image src="/icons/star-coin 2.png" alt="star" height={30} width={30} />
        <span className="font-medium">{profile.coinBalance} Coins</span>
      </div>
    </div>
  );
}

export default Heading;
