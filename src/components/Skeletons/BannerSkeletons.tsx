import React from "react";
import SkeletonLoader from "../ui/SkeletonLoader/SkeletonLoader";

const BannerSkeletons = () => {
  return (
    <div>
      {[...Array(4)].map((_, index) => (
        <SkeletonLoader key={index} className="h-96 w-3/12 rounded-2xl" />
      ))}
    </div>
  );
};

export default BannerSkeletons;
