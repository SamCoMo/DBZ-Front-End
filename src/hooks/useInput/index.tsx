import React, { Dispatch, SetStateAction, useState } from "react";

const useInput = (
  init: string
): [
  string,
  Dispatch<SetStateAction<string>>,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
] => {
  const [value, setValue] = useState(init);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return [value, setValue, onChange];
};

export default useInput;
