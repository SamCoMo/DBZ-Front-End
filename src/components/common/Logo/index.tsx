interface LogoProps {
  width: number;
}
const Logo = ({ width }: LogoProps) => {
  return (
    <img
      src="/image/logo.svg"
      width={width}
      className="m-auto"
      alt="DBZ_logo"
    ></img>
  );
};

export default Logo;
