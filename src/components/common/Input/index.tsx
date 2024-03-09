interface InputProps {
  type: "text" | "email" | "password"| "select";
  value: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  width,
  disabled,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      className={`rounded-lg px-3 bg-gray-200 ${width || "w-full"} h-10`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};


export default Input;
