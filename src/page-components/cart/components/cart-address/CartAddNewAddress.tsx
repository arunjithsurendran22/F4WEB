import Button from "@/components/ui/Buttons/Button";
import AddAddress from "@/page-components/addAddress/AddAddress";
import React from "react";


function CartAddNewAddress() {
  return (
    <div className="">
      <AddAddress />
      {/* <div className="flex justify-end w-6/12 mb-5">
        <Link href='/cart/blockDeliverySlot'>
          <Button
            borderRadius="rounded-xl "
            backgroundColor="bg-customBlueLight"
            textColor="text-white "
            fontSize="font-medium"
          >
            Next
          </Button>
        </Link>
      </div> */}
    </div>
  );
}

export default CartAddNewAddress;
