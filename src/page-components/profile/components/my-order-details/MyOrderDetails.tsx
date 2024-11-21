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
    <>
      <div className="p-2">
      {ordersDetails?.items.map((item :any) => (
          <OrderCardDetails
          key={ item.isSubProduct ? item.subProduct._id : item.product._id}
          imageSrc={item.isSubProduct ? item.subProduct.thumbnail : item.product.thumbnail}
          productName={item.isSubProduct ? item.subProduct.name : item.product.name}
          orderId={ordersDetails?.orderId}
          cartQuantity={item?.cartQuantity}
          unit={item.isSubProduct ? item.subProduct.unit : item.product.unit}
          baseQuantity={item.isSubProduct ? item.subProduct.quantity : item.product.quantity}

        />
      ))}
        
      </div>
      <div className="mt-3">
        {" "}
        <OrderDetailsMap />
      </div>
      <div className="p-3 mt-5 md:w-80">
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
       timeSlotDetails = {ordersDetails?.timeSlotDetails}
       />
      </div>
    </>
  );
};

export default MyOrderDetails;
