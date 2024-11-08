import React from 'react'
import SkeletonLoader from '../ui/SkeletonLoader/SkeletonLoader'

const ProductCustomizeSkeleton = () => {
  return (
    <div className="flex gap-2">
        <div>
          <SkeletonLoader className="w-24 h-24 rounded-xl" />
        </div>
        <div>
          <div className="flex gap-2 mt-2">
            <SkeletonLoader className="w-10 h-5 rounded-md" />
            <SkeletonLoader className="w-10 h-5 rounded-md" />
          </div>
          <SkeletonLoader className="w-24 h-3 rounded-md mt-2" />
          <div className="flex gap-2 mt-2">
            <SkeletonLoader className="w-10 h-5 rounded-md mt-2" />
            <SkeletonLoader className="w-14 h-7 rounded-full " />
          </div>
        </div>
      </div>
  )
}

export default ProductCustomizeSkeleton
