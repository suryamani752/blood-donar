import React from "react";

const InputType = ({ labelFor, labelText, type, name, value, onChange }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
