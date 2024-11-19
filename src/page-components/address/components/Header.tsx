import AddButton from "@/components/ui/Buttons/AddNew";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  navigateUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ navigateUrl }) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="md:text-xl font-semibold">My Address</h1>
      {navigateUrl && (
        <Link href={navigateUrl}>
          <AddButton />
        </Link>
      )}
    </div>
  );
};

export default Header;
