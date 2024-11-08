import Link from "next/link";
import React from "react";

function Heading() {
  return (
    <div>
      <Link href="/">
        <h1 className="text-customBlueLight text-4xl font-semibold ">F4Fish</h1>
      </Link>
    </div>
  );
}

export default Heading;
