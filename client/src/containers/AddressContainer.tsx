import React from "react";
import { Address, AddressDelivery } from "../models/index.js";

type Props = {
  user: AddressDelivery | Address;
};

const AddressContainer: React.FC<Props> = ({ user }) => {
  return (
    <>
      <p>{user.street_address}</p>
      <p>{user.flat_number}</p>
      <p>{`${user.postcode} ${user.city}`}</p>
      <p>{user.country}</p>
    </>
  );
};

export default AddressContainer;
