"use client";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import Products from "@/page-components/products/Products";
import React, { Suspense } from "react";

function ProductsPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <SpinnerLoader />
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
}

export default ProductsPage;
