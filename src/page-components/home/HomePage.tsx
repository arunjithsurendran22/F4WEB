"use client";
import React, { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Categories from "./components/categories/Categories";
import FlashSale from "./components/flashSale/FlashSale";
import BannerTwo from "./components/bannerTwo/BannerTwo";
import TrendingNow from "./components/trendingNow/TrendingNow";
import Recomended from "./components/Recomended/Recomended";
import Subscribed from "./components/subscribed/Subscribed";
import Express from "./components/Express/Express";

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
      <div className="md:px-14 md:py-5 mt-5 p-3">
        {" "}
        <Banner />
      </div>
      <div className="md:px-14 md:py-5 p-3">
        {" "}
        <Categories />
      </div>
      <div className="md:px-14 md:py-5 p-3">
        <FlashSale />
      </div>
      {isLoggedIn && <Subscribed />}
      <div className="md:px-14 md:py-5 p-3">
        <Express/>
        <Recomended />
        <TrendingNow />
        <BannerTwo />
      </div>
    </div>
  );
}

export default HomePage;
