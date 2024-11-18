'use client'
import React from "react";
import { useParams } from "next/navigation";
import SubscriptionStatus from "@/page-components/subscriptionStatus/SubscriptionStatus";

const SubscriptionPaymentStatusPage = () => {
  const params = useParams();
  const id = params?.id as string; 

  return (
    <div>
      <SubscriptionStatus orderId={id} />
    </div>
  );
};

export default SubscriptionPaymentStatusPage;