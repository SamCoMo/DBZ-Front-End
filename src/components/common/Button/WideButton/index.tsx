import React from "react";

interface WideButtonProps {
  text: string;
  status: boolean;
  onClick?: () => void;
}

const WideButton = ({text, status, onClick }: WideButtonProps) => (
  <button
    type="submit"
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
