import React from "react";
import Header from "./components/Header";
import HelpSupport from "@/components/help-support/HelpSupport";

function HelpAndSupport() {
  return (
    
    <div className="w-full max-w-lg p-3 h-[40rem] overflow-y-auto hide-scrollbar">
      <div className="mt-5 flex justify-between mb-5">
      <h1 className="font-medium text-lg">Help and Support</h1>
    </div>
      <div className="py-5 border-b-[1px]">
        <HelpSupport />
      </div>
      <div className="py-5 border-b-[1px]">
        <HelpSupport />
      </div>
      <div className="py-5 border-b-[1px]">
        <HelpSupport />
      </div>
    </div>
  );
}

export default HelpAndSupport;
