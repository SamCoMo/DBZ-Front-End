import React from "react";

interface WideButtonProps {
  type?: string;
  text: string;
}

const WideButton = ({ type, text }: WideButtonProps) => (
  <button
    type={type ? "button" : "submit"}
    className="max-w-default m-auto w-full bg-defaultColor text-white text-body1 h-14 fixed bottom-0 left-0 right-0"
  >
    {text}
  </button>
);

export default WideButton;
