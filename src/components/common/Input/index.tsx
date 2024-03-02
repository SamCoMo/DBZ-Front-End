import React from "react";

interface InputProps {
  type: "text" | "password";
  width?: string;
}

const Input = ({ type, width }: InputProps) => (
  <input
    className={`bg-gray2 rounded-lg text-body2 placeholder-text-gray4 h-10 pl-3 ${
      width || "w-full"
    }`}
    placeholder="예시입니다"
    type={type}
  />
);

export default Input;
