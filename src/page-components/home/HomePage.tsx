"use client";
import React, { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Categories from "./components/categories/Categories";
import FlashSale from "./components/flashSale/FlashSale";
import BannerTwo from "./components/bannerTwo/BannerTwo";
import TrendingNow from "./components/trendingNow/TrendingNow";
import Recomended from "./components/Recomended/Recomended";
import Subscribed from "./components/subscribed/Subscribed";


function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <div>
      <div className="p-10">
        <Banner />
        <Categories />
        <FlashSale />
        {isLoggedIn && <Subscribed />}
        <>
          <Recomended />
          <TrendingNow />
          <BannerTwo />
        </>
      </div>
    </div>
  );
}

export default HomePage;
