import React from "react";

interface WideButtonProps {
  type?: string;
  text: string;
  status: boolean;
  onClick?: () => void;
}

const WideButton = ({ type, text, status, onClick }: WideButtonProps) => (
  <button
    type={type ? "button" : "submit"}
    disabled={!status}
    onClick={onClick}
    className={`max-w-default m-auto w-full bg-defaultColor text-white text-body1 h-14 fixed bottom-0 left-0 right-0
    ${
      status ? "text-white" : "text-gray4"
    } ${status ? "bg-defaultColor" : "bg-gray2"}`}
  >
    {text}
  </button>
);

export default WideButton;
