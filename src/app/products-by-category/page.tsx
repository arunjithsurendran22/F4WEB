"use client";
import ProductByCategory from "@/page-components/productsByCategory/ProductByCategory";
import { useSearchParams } from "next/navigation";
import React from "react";

function ProductByCategoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const name = searchParams?.get("name");

  return (
    <div>
      <ProductByCategory id={id} name={name} />
    </div>
  );
}

export default ProductByCategoryPage;
