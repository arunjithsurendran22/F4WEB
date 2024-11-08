import React from "react";
import Button from "../ui/Buttons/Button";
import OrderCardDetails from "../orderCardDetails/OrderCardDetails";

interface OrdersCardProps {
  id: string; // Add id prop to pass order id
  orderId: string;
  productName: string;
  status: string;
  price: number;
  imageSrc: string;
  onClick: (id: string) => void; // Function to handle click event
}

const OrdersCard: React.FC<OrdersCardProps> = ({
  id, // Use id prop for the onClick handler
  orderId,
  productName,
  status,
  price,
  imageSrc,
  onClick,
}) => {
  return (
    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg flex flex-col  m-5">
      {/* Top section with image and order details */}
      <OrderCardDetails
        imageSrc={imageSrc}
        orderId={orderId}
        productName={productName}
      />

      {/* Bottom section with status, price, and button */}
      <div className="flex justify-between items-center">
        {/* Status */}
        <div className="mt-2">
          <p className="text-sm text-customGrayLight2">Status</p>
          <p className="font-semibold text-md mt-1">{status}</p>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm text-customGrayLight2">Total Price</p>
          <p className="text-xl font-medium">₹{price}</p>
        </div>

        {/* Button */}
        <Button width="w-28" height="h-12" onClick={() => onClick(id)}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default OrdersCard;
