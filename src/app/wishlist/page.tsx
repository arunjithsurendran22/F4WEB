
'use client'
import Wishlist from "@/page-components/wishlist/Wishlist";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React from "react";

function wishlistPage() {
  return (
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  );
}

export default wishlistPage;
