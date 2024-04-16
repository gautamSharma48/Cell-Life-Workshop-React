import React from "react";

const Input = (props) => {
  return (
    <>
      {props?.label && <p>{props?.label}</p>}
      <div className="b-1-black p-10 rounded-12">
        <input {...props} />
      </div>
    </>
  );
};

export default Input;
