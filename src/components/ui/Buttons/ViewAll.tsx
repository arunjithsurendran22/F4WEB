'use client';
import React from 'react';

interface ViewAllProps {
  onClick?: () => void;
  buttonText?: string; // Optional prop for button text
}

const ViewAll: React.FC<ViewAllProps> = ({ onClick, buttonText = "View All" }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className='text-customBlueLight font-medium  text-sm md:text-lg'
      >
        {buttonText} {/* Use the buttonText prop, or default to "View All" */}
      </button>
    </div>
  );
};

export default ViewAll;
