'use client';
import React from 'react';

interface ViewAllProps {
  onClick?: () => void; // Define the type of the onClick prop
}

const EditButton: React.FC<ViewAllProps> = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick} // Use the onClick prop
        className='text-customBlueLight font-normal text-md'
      >
        Edit
      </button>
    </div>
  );
};

export default EditButton;