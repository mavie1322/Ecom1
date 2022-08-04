import React from "react";
import Input from "../../containers/Input";
import { useAppSelector } from "../../hooks/hooks";

const DetailsForm = () => {
  const user = useAppSelector((state) => state.user.result);

  const handleChangeDetails = () => {};

  return (
    <form>
      <Input
        label={"Email"}
        isRequired={true}
        name={"email"}
        type={"email"}
        value={user.email}
        change={handleChangeDetails}
        focus={true}
      />
      <Input
        label={"First Name"}
        isRequired={true}
        name={"first_name"}
        type={"text"}
        value={user.first_name}
        change={handleChangeDetails}
        focus={true}
      />
      <Input
        label={"Last Name"}
        isRequired={true}
        name={"last_name"}
        type={"text"}
        value={user.last_name}
        change={handleChangeDetails}
        focus={true}
      />
      <Input
        label={"Postcode"}
        isRequired={true}
        name={"postcode"}
        type={"text"}
        value={user.address.postcode}
        change={handleChangeDetails}
        focus={true}
      />
      <Input
        label={"Country"}
        isRequired={true}
        name={"country"}
        type={"text"}
        value={user.address.country}
        change={handleChangeDetails}
        focus={true}
      />
      <div className='checkout__buttons'>
        <button type='submit' className='font-styling'>
          Save
        </button>
      </div>
    </form>
  );
};

export default DetailsForm;
