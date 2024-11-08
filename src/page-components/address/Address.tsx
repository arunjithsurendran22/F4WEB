import React from "react";
import Header from "./components/Header";
import AddressList from "./components/AddressList";

interface AddressProps {
  navigationUrl?: string | undefined;
  setDefaultAddressId?: (id: string | null) => void;
  refetchAddress?: boolean;
  onAddressSelect?: (id: string) => void;
}

const Address: React.FC<AddressProps> = ({
  navigationUrl,
  setDefaultAddressId,
  refetchAddress,
  onAddressSelect,
}) => {
  return (
    <div className="">
      <Header navigateUrl={navigationUrl} />
      <AddressList
        setDefaultAddressId={setDefaultAddressId}
        refetchAddress={refetchAddress}
        onAddressSelect={onAddressSelect}
      />
    </div>
  );
};

export default Address;
