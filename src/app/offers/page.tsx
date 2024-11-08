"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Offer from "@/page-components/offer/Offer";

function OffersPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  return (
    <div>
      <Offer id={id}/>
    </div>
  );
}

export default OffersPage;
