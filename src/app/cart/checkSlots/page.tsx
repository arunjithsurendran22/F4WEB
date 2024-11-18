import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import CheckSlots from "@/page-components/cart/components/checkSlots/CheckSlots";
import React, { Suspense } from "react";

function checkSlotsPage() {
  return (
    <div>
      <Suspense fallback={
          <div>
            <SpinnerLoader />
          </div>
        }>
        <CheckSlots />
      </Suspense>
    </div>
  );
}

export default checkSlotsPage;
