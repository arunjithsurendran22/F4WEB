'use client';
import React from 'react';

interface ViewAllProps {
  onClick?: () => void; // Define the type of the onClick prop
}

const ViewMore: React.FC<ViewAllProps> = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick} // Use the onClick prop
        className='text-customBlueLight font-medium text-lg'
      >
        View More
      </button>
    </div>
  );
};

export default ViewMore;
