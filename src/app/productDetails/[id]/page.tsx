'use client'
import React from "react";
import { useParams } from "next/navigation";
import ProductDetails from "@/page-components/products-Details/ProductDetails";

const ProductDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string; 

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductDetailsPage;
