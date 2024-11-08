import React from 'react'
import SkeletonLoader from '../ui/SkeletonLoader/SkeletonLoader'

const CategorySkeletons = () => {
  return (
    <div className="flex-shrink-0">
      <SkeletonLoader className="h-52 w-52 rounded-xl" />
    </div>
  )
}

export default CategorySkeletons
