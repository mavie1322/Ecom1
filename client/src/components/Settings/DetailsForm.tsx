import React, { useState } from "react";
import { editUserDetails } from "../../actions/user-actions";
import Input from "../../containers/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { UserInfo } from "../../models/index";

type Props = {
  setEditUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  editUserInfo: boolean;
};

const DetailsForm: React.FC<Props> = ({ setEditUserInfo, editUserInfo }) => {
  const user = useAppSelector((state) => state.user.result);
  const [userDetails, setUserDetails] = useState<UserInfo>({
    first_name: user.first_name,
    last_name: user.last_name,
    postcode: user.address.postcode,
    country: user.address.country,
  });
  const dispatch = useAppDispatch();

  const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editUserDetails(userDetails, user._id));
    setEditUserInfo(!editUserInfo);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        label={"Email"}
        isRequired={true}
        name={"email"}
        type={"email"}
        value={user.email}
        change={handleChangeDetails}
        focus={true}
        read={true}
        style={{
          backgroundColor: "gray",
          cursor: "no-drop",
          textTransform: "lowercase",
        }}
      />
      <Input
        label={"First Name"}
        isRequired={true}
        name={"first_name"}
        type={"text"}
        value={userDetails.first_name}
        change={handleChangeDetails}
        focus={true}
        style={{}}
        read={false}
      />
      <Input
        label={"Last Name"}
        isRequired={true}
        name={"last_name"}
        type={"text"}
        value={userDetails.last_name}
        change={handleChangeDetails}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Postcode"}
        isRequired={true}
        name={"postcode"}
        type={"text"}
        value={userDetails.postcode}
        change={handleChangeDetails}
        focus={true}
        read={false}
        style={{}}
      />
      <Input
        label={"Country"}
        isRequired={true}
        name={"country"}
        type={"text"}
        value={userDetails.country}
        change={handleChangeDetails}
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

export default DetailsForm;
