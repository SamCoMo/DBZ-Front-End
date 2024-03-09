import React from "react";

interface WideButtonProps {
  type?: string;
  text: string;
  disabled?: boolean;
}

const WideButton = ({ type, text, disabled }: WideButtonProps) => (
  <button
    type={type ? "button" : "submit"}
    disabled={disabled}
    className={`max-w-default m-auto w-full ${disabled ? "bg-slate-200" : "bg-defaultColor"} text-white text-body1 h-14 fixed bottom-0 left-0 right-0`}
  >
    {text}
  </button>
);

export default WideButton;
