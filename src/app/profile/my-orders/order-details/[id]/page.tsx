"use client";
import React from "react";
import { useParams } from "next/navigation";
import MyOrderDetails from "@/page-components/profile/components/my-order-details/MyOrderDetails";

function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  return (
    <div>
      <MyOrderDetails id={id} />
    </div>
  );
}

export default OrderDetailsPage;
