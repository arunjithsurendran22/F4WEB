'use client'
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Cart from "@/page-components/cart/Cart";
import React from "react";

function cartPage() {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
}

export default cartPage;
