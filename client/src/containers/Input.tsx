import React from "react";
type Props = {
  label: string;
  isRequired: boolean;
  name: string;
  type: string;
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  focus: boolean;
};

const Input: React.FC<Props> = ({
  label,
  isRequired,
  name,
  type,
  value,
  change,
  focus,
}) => {
  return (
    <div className='sign-in__inputs'>
      <span>
        <label>{label}</label>
        <p>&nbsp;{isRequired ? "*" : ""}</p>
      </span>
      <input
        required={isRequired}
        name={name}
        type={type}
        value={value}
        onChange={change}
        style={{ backgroundColor: "white" }}
        autoFocus={focus}
      />
    </div>
  );
};

export default Input;
