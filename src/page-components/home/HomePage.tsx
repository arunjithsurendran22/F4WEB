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
    <div className="">
      <div className="px-14 py-5 mt-5">
        {" "}
        <Banner />
      </div>
      <div className="px-14 py-5">
        {" "}
        <Categories />
      </div>
      <div className="px-14 py-5">
        <FlashSale />
      </div>
      {isLoggedIn && <Subscribed />}
      <div className="px-14 py-5">
        <Recomended />
        <TrendingNow />
        <BannerTwo />
      </div>
    </div>
  );
}

export default HomePage;
