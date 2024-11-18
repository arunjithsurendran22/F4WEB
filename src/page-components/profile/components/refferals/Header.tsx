import React from 'react'
import { useRouter } from "next/navigation";


function Header() {
  const router = useRouter();

  const handleQClick = () => {
    router.push("/profile/referral-details");
  };
  return (
    <div className='flex justify-between'>
      <h1 className='font-medium text-lg'>Referrals</h1>
      <h1 className='text-xl font-semibold cursor-pointer' onClick={handleQClick}>?</h1>
    </div>
  )
}

export default Header
