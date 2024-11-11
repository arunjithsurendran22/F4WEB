"use client";
import React, { useEffect, useState } from "react";
import SubscriptionHeader from "./SubscriptionHeader";
import SubscriptionsAll from "./SubscriptionsAll";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { subscriptionApi } from "@/services/subscriptionService";
import SubscriptionCard from "./SubscriptionCard";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Sorry from "@/components/ui/Sorry/Sorry";

const Subscriptions = () => {
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>([]);
  const [showSubscriptionsAll, setShowSubscriptionsAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await subscriptionApi.getActiveSubscriptions(storeId);
        setSubscriptionsData(response.data.subscriptions);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSubscriptions();
  }, [storeId]);

  const handleNavigate = () => {
    setShowSubscriptionsAll(!showSubscriptionsAll);
  };

  return (
    <div>
      <SubscriptionHeader
        handleNavigate={handleNavigate}
        isSubscribed={showSubscriptionsAll}
      />
      {showSubscriptionsAll && <SubscriptionsAll />}
      {!showSubscriptionsAll && (
        <div className="mt-5">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <SpinnerLoader />
            </div>
          ) : subscriptionsData.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div>
                <Sorry />
                <p className="text-lg font-semibold italic text-gray-500">
                  No Subscriptions Available
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {subscriptionsData.map((subscription: any, index: number) => (
                <SubscriptionCard
                  key={subscription._id}
                  plan={subscription}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
