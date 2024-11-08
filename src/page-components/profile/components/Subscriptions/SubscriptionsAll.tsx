import React, { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { subscriptionApi } from "@/services/subscriptionService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function SubscriptionsAll() {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await subscriptionApi.getAllSubscriptionPlans(storeId);
        console.log("response", response);
        setSubscriptionsData(response.data.plans);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };

    fetchSubscriptions();
  }, [storeId]);

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {subscriptionsData.map((subscription: any, index :number) => (
        <SubscriptionCard key={subscription._id} plan={subscription} index = {index} />
      ))}
    </div>
  );
}

export default SubscriptionsAll;
