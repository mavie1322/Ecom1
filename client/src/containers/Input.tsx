import React from "react";
type Props = {
  label: string;
  isRequired: boolean;
  name: string;
  type: string;
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  focus: boolean;
  read: boolean;
  style: object;
};

const Input: React.FC<Props> = ({
  label,
  isRequired,
  name,
  type,
  value,
  change,
  focus,
  read,
  style,
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
        style={{
          backgroundColor: "white",
          textTransform: "capitalize",
          ...style,
        }}
        autoFocus={focus}
        readOnly={read}
      />
    </div>
  );
};

export default Input;
