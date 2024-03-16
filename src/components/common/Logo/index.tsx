interface LogoProps {
  width: number;
  addStyle?: string;
}
const Logo = ({ width, addStyle }: LogoProps) => {
  return (
    <img
      src="/image/logo.svg"
      width={width}
      className={`${addStyle}`}
      alt="DBZ_logo"
    ></img>
  );
};

export default Logo;
