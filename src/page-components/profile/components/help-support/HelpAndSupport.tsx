import React from "react";
import Header from "./components/Header";
import HelpSupport from "@/components/help-support/HelpSupport";

function HelpAndSupport() {
  return (
    <div>
      <Header />
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
