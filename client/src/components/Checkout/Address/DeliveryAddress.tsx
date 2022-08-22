import React, { useEffect, useState } from "react";
import { editDeliveryAddress } from "../../../actions/user-actions";
import Input from "../../../containers/Input";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { AddressDelivery } from "../../../models";

type Props = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeliveryAddress: React.FC<Props> = ({ isEditing, setIsEditing }) => {
  const user = useAppSelector((state) => state.user.result);
  const dispatch = useAppDispatch();
  const [deliveryAddress, setDeliveryAddress] = useState<AddressDelivery>({
    first_name: "",
    last_name: "",
    street_address: "",
    flat_number: "",
    city: "",
    postcode: "",
    country: "",
  });

  const handleSubmitDeliveryAddress = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(editDeliveryAddress(deliveryAddress, user._id));
    setIsEditing(!isEditing);
  };

  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user.delivery_address.street_address !== "") {
      setDeliveryAddress((previousAddress) => {
        const newAddress = { ...previousAddress, ...user.delivery_address };
        return newAddress;
      });
    }
  }, [user.delivery_address]);

  return (
    <form onSubmit={(e) => handleSubmitDeliveryAddress(e)}>
      <Input
        label={"First name"}
        isRequired={true}
        name={"first_name"}
        type={"text"}
        value={deliveryAddress.first_name}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Last name"}
        isRequired={true}
        name={"last_name"}
        type={"text"}
        value={deliveryAddress.last_name}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Address"}
        isRequired={true}
        name={"street_address"}
        type={"text"}
        value={deliveryAddress.street_address}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Flat Number / House Name"}
        isRequired={false}
        name={"flat_number"}
        type={"text"}
        value={deliveryAddress.flat_number}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Town / City"}
        isRequired={true}
        name={"city"}
        type={"text"}
        value={deliveryAddress.city}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Postcode"}
        isRequired={true}
        name={"postcode"}
        type={"text"}
        value={deliveryAddress.postcode}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Country"}
        isRequired={true}
        name={"country"}
        type={"text"}
        value={deliveryAddress.country}
        change={handleChangeDelivery}
        focus={true}
        read={false}
        style={{}}
      />
      <div className='checkout__buttons'>
        <button type='submit' className='font-styling'>
          Save
        </button>
      </div>
    </form>
  );
};

export default DeliveryAddress;
