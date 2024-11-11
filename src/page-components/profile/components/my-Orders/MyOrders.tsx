"use client";
import OrdersCard from "@/components/ordersCard/OrdersCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ordersApi } from "@/services/ordersService";

function titleCase(word:string) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getMyOrders();
        if (response?.data?.orders) {
          setOrders(response.data.orders); // Update state with API response
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchOrders();
  }, []);

  const handleDetailsClick = (id: string) => {
    router.push(`/profile/my-orders/order-details/${id}`);
  };

  return (
    <div className="h-[40rem] overflow-y-auto hide-scrollbar">
      {orders.map((order) => (
        <OrdersCard
          key={order._id}
          id={order._id}
          orderId={order.orderId}
          productName={order.items[0].product.name} // Use the first item's product name
          status={titleCase(order.orderStatus)}
          price={order.subTotal}
          imageSrc={order.items[0].product.thumbnail} // Use the first item's product image
          onClick={() => handleDetailsClick(order.orderId)}
        />
      ))}
    </div>
  );
}

export default MyOrders;
