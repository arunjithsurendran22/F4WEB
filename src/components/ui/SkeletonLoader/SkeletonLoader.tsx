import React from "react";

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = "" }) => {
  return (
    <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
  );
};

export default SkeletonLoader;
