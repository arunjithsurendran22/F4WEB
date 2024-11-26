import React from "react";

const Header: React.FC<{
  name?: string | null | undefined;
}> = ({ name }) => {
  return (
    <div>
      <h1 className="md:text-lg font-semibold">{name}</h1>
    </div>
  );
}

export default Header;
