import ViewAll from "@/components/ui/Buttons/ViewAll";
import React from "react";
import { useRouter } from "next/navigation";


interface SubscriptionHeaderProps {
  handleNavigate?: () => void;
  isSubscribed?: boolean;
}


const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({ handleNavigate, isSubscribed }) => {
  const router = useRouter();

  const handleQClick = () => {
    router.push("/profile/subscriptions");
  };
  return (
    <>
    <div className="flex justify-between">
        <h1 className="font-semibold text-lg mb-2">Subscriptions</h1>
      <ViewAll onClick={handleNavigate} buttonText={isSubscribed ? "Subscribed" : "View All"} />
    </div>
      <div className="flex justify-end ">
        <h1 className='text-xl font-semibold cursor-pointer' onClick={handleQClick}>?</h1>
      </div>
    </>
  );
};

export default SubscriptionHeader;
