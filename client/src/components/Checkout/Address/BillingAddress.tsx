import React, { useEffect, useState } from "react";
import { Address } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { editBillingAddress } from "../../../actions/user-actions";
import Input from "../../../containers/Input";

type Props = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const BillingAddress: React.FC<Props> = ({ isEditing, setIsEditing }) => {
  const user = useAppSelector((state) => state.user.result);
  const dispatch = useAppDispatch();
  const [billingAddress, setBillingAddress] = useState<Address>({
    street_address: "",
    flat_number: "",
    city: "",
    postcode: "",
    country: "",
  });

  const handleSubmitBillingAddress = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(editBillingAddress(billingAddress, user._id));
    setIsEditing(!isEditing);
  };

  const handleChangeBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress({
      ...billingAddress,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user.address.street_address !== "") {
      setBillingAddress((previousAddress) => {
        const newAddress = { ...previousAddress, ...user.address };
        return newAddress;
      });
    }
  }, [user.address]);

  return (
    <form onSubmit={(e) => handleSubmitBillingAddress(e)}>
      <Input
        label={"Address"}
        isRequired={true}
        name={"street_address"}
        type={"text"}
        value={billingAddress.street_address}
        change={handleChangeBilling}
        focus={true}
      />
      <Input
        label={"Flat Number / House Name"}
        isRequired={false}
        name={"flat_number"}
        type={"text"}
        value={billingAddress.flat_number}
        change={handleChangeBilling}
        focus={true}
      />
      <Input
        label={"Town / City"}
        isRequired={false}
        name={"city"}
        type={"text"}
        value={billingAddress.city}
        change={handleChangeBilling}
        focus={true}
      />
      <Input
        label={"Postcode"}
        isRequired={true}
        name={"postcode"}
        type={"text"}
        value={billingAddress.postcode}
        change={handleChangeBilling}
        focus={true}
      />
      <Input
        label={"Country"}
        isRequired={true}
        name={"country"}
        type={"text"}
        value={billingAddress.country}
        change={handleChangeBilling}
        focus={true}
      />
      <div className='sign-in__buttons'>
        <button
          type='submit'
          className='sign-in__become-member font-styling'
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "3rem",
            width: "500px",
          }}>
          Save
        </button>
      </div>
    </form>
  );
};

export default BillingAddress;
