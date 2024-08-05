import { useEffect, useRef } from "react";

interface InputProps {
  type: "text" | "email" | "password" | "select";
  value: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  focus?: boolean;
  addStyle?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  width,
  disabled,
  placeholder,
  focus,
  addStyle,
  onChange
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (focus && inputRef.current) inputRef.current.focus();
  }, [focus]);

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      className={`bg-gray2 rounded-lg text-body2 placeholder-text-gray4 h-10 pl-3 ${
        addStyle || ''
      }  ${width || 'w-full'}`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;
