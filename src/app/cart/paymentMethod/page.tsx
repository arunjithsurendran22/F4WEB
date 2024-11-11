import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import PaymentMethod from "@/page-components/cart/components/paymentMethod/PaymentMethod";
import React, { Suspense } from "react";

function paymentMethodPage() {
  return (
    <div className="min-h-96">
      <Suspense
        fallback={
          <div>
            <SpinnerLoader />
          </div>
        }
      >
        <PaymentMethod />
      </Suspense>
    </div>
  );
}

export default paymentMethodPage;
