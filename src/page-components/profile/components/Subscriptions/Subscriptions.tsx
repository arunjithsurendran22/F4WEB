'use client'
import React, { useEffect, useState } from "react";
import SubscriptionHeader from "./SubscriptionHeader";
import SubscriptionsAll from "./SubscriptionsAll";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { subscriptionApi } from "@/services/subscriptionService";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionsDetails from "./SubscriptionsDetails";

const Subscriptions = () => {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  const [showSubscriptionsAll, setShowSubscriptionsAll] = useState(false);

  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        const response = await subscriptionApi.getActiveSubscriptions(storeId);
        console.log("response", response);
        setSubscriptionsData(response.data.subscriptions);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };

    fetchActiveSubscriptions();
  }, [storeId]);

  const handleNavigate = () => {
    setShowSubscriptionsAll(!showSubscriptionsAll);
  };

  return (
    <div>
      <SubscriptionHeader handleNavigate={handleNavigate} isSubscribed={showSubscriptionsAll} />
      {showSubscriptionsAll && <SubscriptionsAll />}
      {
        !showSubscriptionsAll &&
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {subscriptionsData.map((subscription: any, index: number) => (
            <SubscriptionCard key={subscription._id} plan={subscription} index = {index} />
          ))}
        </div>
      }

    </div>
  );
};

export default Subscriptions;
