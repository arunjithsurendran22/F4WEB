// src/components/Skeletons/ProductDetailsCardSkeleton.tsx
import React from "react";
import SkeletonLoader from "@/components/ui/SkeletonLoader/SkeletonLoader"; // Import the reusable SkeletonLoader

const ProductDetailsCardSkeleton: React.FC = () => {
  return (
    <div className="flex space-x-6 p-6">
      {/* Image Section Skeleton */}
      <SkeletonLoader className="w-[35rem] h-[25rem] shadow-lg flex justify-center items-center" />

      {/* Product Details Section Skeleton */}
      <div className="flex-1 space-y-5">
        {/* Discount Badge Skeleton */}
        <div className="flex gap-5 mb-4">
          <SkeletonLoader className="w-24 h-8 text-gray-400" />
          <div className="flex items-center mb-1">
            <SkeletonLoader className="w-4 h-4 rounded-full" />
          </div>
        </div>

        {/* Product Title Skeleton */}
        <SkeletonLoader className="h-4 mb-2 w-96" />

        {/* Product Description Skeleton */}
        <div className="relative w-full max-w-[38rem]">
          <SkeletonLoader className="h-3 mb-2" />
          <SkeletonLoader className="h-3 mb-2" />
          <SkeletonLoader className="h-3 mb-2" />
        </div>

        {/* Price and Buttons Skeleton */}
        <div className="flex items-center gap-10 mt-10">
          <SkeletonLoader className="h-8 w-20" />
          <SkeletonLoader className="h-8 w-20" />
          
        </div>
        <SkeletonLoader className="h-8 w-32 rounded-full mt-6" />
      </div>
    </div>
  );
};

export default ProductDetailsCardSkeleton;
