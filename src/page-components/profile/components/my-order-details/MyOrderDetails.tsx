import Map from "@/components/map/Map";
import OrderCardDetails from "@/components/orderCardDetails/OrderCardDetails";
import React, { useEffect, useState } from "react";
import OrderPaymentDetails from '../../../../components/orderPaymentDetails/OrderPaymentDetails';
import { ordersApi } from "@/services/ordersService";
import OrderDetailsMap from "@/components/orderDetailsMap/OrderDetailsMap";

interface MyOrderDetailsProps {
  id?: string;
}

const MyOrderDetails: React.FC<MyOrderDetailsProps> = ({ id }) => {
  console.log(id);
  const [ordersDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if(id){
          const response = await ordersApi.getOrderDetailsDetails(id);
        const orderData = response.data.orderDetails;
        setOrderDetails(orderData);
        }else{
          console.error("Failed to load order data: order id missing");
        }
        
      } catch (error) {
        console.error("Failed to load order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div>
        <OrderCardDetails
          imageSrc={ordersDetails?.items[0].product.thumbnail}
          productName={ordersDetails?.items[0].product.name}
          orderId={ordersDetails?.orderId}
        />
      </div>
      <div className="mt-3">
        {" "}
        <OrderDetailsMap />
      </div>
      <div className="mt-5 w-80">
       <OrderPaymentDetails
       subTotal = {ordersDetails?.subTotal}
       deliveryCharge= {ordersDetails?.deliveryCharge}
       couponDiscount= {ordersDetails?.couponDiscount}
       coinsAmount= {ordersDetails?.coinsAmount}
       grandTotal= {ordersDetails?.grandTotal}
       couponCode= {ordersDetails?.couponCode}
       coinsUsed= {ordersDetails?.coinsUsed}
       expressProducts= {ordersDetails?.expressProducts}
       orderStatus= {ordersDetails?.orderStatus}
       />
      </div>
    </div>
  );
};

export default MyOrderDetails;
