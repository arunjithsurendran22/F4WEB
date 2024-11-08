import CheckSlots from "@/page-components/cart/components/checkSlots/CheckSlots";
import React, { Suspense } from "react";

function checkSlotsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <CheckSlots />
      </Suspense>
    </div>
  );
}

export default checkSlotsPage;
