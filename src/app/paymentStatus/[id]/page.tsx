'use client'
import React from "react";
import { useParams } from "next/navigation";
import OrderStatus from "@/page-components/orderStatus/OrderStatus";

const PaymentStatusPage = () => {
  const params = useParams();
  const id = params?.id as string; 

  return (
    <div>
      <OrderStatus orderId={id} />
    </div>
  );
};

export default PaymentStatusPage;
