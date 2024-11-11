import React, { useEffect, useState } from "react";
import SubscriptionCardGreen from "./SubscriptionCardGreen"; // Import the new SubscriptionCardGreen component
import { subscriptionApi } from "@/services/subscriptionService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";

function SubscriptionsAll() {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await subscriptionApi.getAllSubscriptionPlans(storeId);
        setSubscriptionsData(response.data.plans);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [storeId]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <SpinnerLoader />
        </div>
      ) : subscriptionsData.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div>
            <Sorry />
            <p className="text-lg font-semibold italic text-gray-400">
              No Subscriptions Available
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {subscriptionsData.map((subscription: any, index: number) => (
            <SubscriptionCardGreen
              key={subscription._id}
              plan={subscription}
              index={index} // Pass index to the SubscriptionCardGreen component
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscriptionsAll;
