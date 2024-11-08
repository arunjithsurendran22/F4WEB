"use client";
import HomePage from "@/page-components/home/HomePage";
import { RootState } from "@/store";
import { useAppSelector } from "@/hooks/useAppSelector";
import NoStoreAvailable from "@/components/NoStoreAvailable/NoStoreAvailable";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const storeId = useAppSelector((state: RootState) => state.location.storeId);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return <div>{storeId ? <HomePage /> : <NoStoreAvailable />}</div>;
}
