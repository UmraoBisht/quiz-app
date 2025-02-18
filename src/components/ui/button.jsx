import React from "react";

const Button = ({ onClick, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
