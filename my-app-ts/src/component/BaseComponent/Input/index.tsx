import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label="タイトル未設定", type, name, value, onChange}: Props): JSX.Element => {
  return (
    <div className="input-wrapper">
      <div className="text-wrapper">{label}</div>
      <input 
        className="rectangle"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
};
