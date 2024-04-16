import React from "react";

const Button = ({ text, type, className, ...props }) => {
  const typeChecker = () => {
    switch (type) {
      case "warn":
        return "bg-red-10";
      case "success":
        return "bg-green-10";
      case "norma":
        return "bg-blue-10";
      default:
        return "bg-blue-10";
    }
  };
  return (
    <button
      className={` outline-none border-none text-white rounded-12  min-w-100 ${className} ${typeChecker()}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
