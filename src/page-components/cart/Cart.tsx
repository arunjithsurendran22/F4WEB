  'use client'
  import React from "react";
  import Heading from "./components/my-cart/Heading";
  import ProductListCart from "./components/my-cart/ProductListCart";
  import SelectDelivery from "./components/my-cart/SelectDelivery";


  function Cart() {
    return (
      <div className="p-14">
        <Heading />
        <div className="lg:flex ">
          <ProductListCart />
          <SelectDelivery />
        </div>
      </div>
    );
  }

  export default Cart;
