"use client";
import { useState, useEffect } from "react";
import Heading from "./components/Heading";
import SearchBox from "./components/SearchBox";
import Location from "./components/Location";
import Icons from "./components/Icons";
import VerticalIcons from "./components/VerticalIcons";
import { FaBars } from "react-icons/fa";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex py-6 items-center px-4 md:px-14">
        {/* Regular Navbar */}
        <div className="flex w-full justify-between gap-5">
          <div className="xl:w-6/12 flex gap-6">
            <div className="xl:w-2/12">
              <Heading />
            </div>
            <div className="w-96 xl:w-10/12">
              <SearchBox />
            </div>
          </div>
          <div className="xl:w-6/12 flex justify-between items-center">
            <div className="xl:w-6/12">
              <Location />
            </div>
            <div className="xl:w-6/12 justify-end">
              {/* Hide Icons on xl screens */}
              <div className="hidden xl:flex">
                <Icons />
              </div>
            </div>
          </div>
        </div>
        {/* Hamburger Button - Visible below xl devices */}
        <button
          className="xl:hidden mr-4 p-3"
          aria-label="Menu"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Right Sidebar for xl and below */}
      <RightSidebar
        isVisible={isSidebarOpen}
        onClose={closeSidebar}
        width="w-28"
      >
        {/* Sidebar Content */}
        <div className="flex flex-col items-center gap-8">
          <VerticalIcons closeSidebarVertical={closeSidebar}/>
        </div>
      </RightSidebar>
    </>
  );
}

export default Navbar;
