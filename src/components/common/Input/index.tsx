import React from "react";

interface InputProps {
  type: "text" | "select";
  width?: string;
  placeholder: string;
}

const Input = ({ type, width, placeholder }: InputProps) => (
  <input
    className={`bg-gray2 rounded-lg text-body2 placeholder-text-gray4 h-10 pl-3 ${
      width || "w-full"
    }`}
    type={type}
    placeholder={placeholder}
  />
);

export default Input;
