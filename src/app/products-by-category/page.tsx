"use client";
import ProductByCategory from "@/page-components/productsByCategory/ProductByCategory";
import { useSearchParams } from "next/navigation";
import React from "react";

function ProductByCategoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  return (
    <div>
      <ProductByCategory id={id} />
    </div>
  );
}

export default ProductByCategoryPage;
