import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface HeaderTitleProps {
  title: string;
  back?: boolean;
}

const HeaderTitle = ({ title, back }: HeaderTitleProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="h-[60px] flex justify-center items-center relative">
      {back && (
        <button
          type="button"
          className="px-4 h-full absolute left-0 top-0 flex justify-center items-center"
          onClick={handleBack}
        >
          <span className="sr-only">이전</span>
          <IoIosArrowBack className=" text-2xl" />
        </button>
      )}
      <h1 className="text-h2">{title}</h1>
    </div>
  );
};

export default HeaderTitle;
