import Input from "@/components/common/Input";
import Nav from "@/components/common/Nav";
import useInput from "@/hooks/useInput";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const navigate = useNavigate();

  const [object, , handleChangeObject] = useInput("");
  const [inProcessOnly, setInProcessOnly] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(
      `/search/list?object=${object}&showsInProgressOnly=${inProcessOnly}&page=0`
    );
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProcessOnly(e.target.checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="h-[60px] flex justify-center items-center relative">
          <button
            type="button"
            className="px-4 h-full flex justify-center items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className="sr-only">이전</span>
            <IoIosArrowBack className=" text-2xl" />
          </button>
          <Input type="text" value={object} onChange={handleChangeObject} />
          <button>
            <BsSearch className="ml-2 text-2xl text-defaultColor" />
          </button>
        </div>
        <div className="flex items-center justify-end">
          <p className="mr-1">진행중만 보기</p>
          <input
            type="checkbox"
            onChange={handleCheckChange}
            className="checkbox checkbox-sm checked:border-defaultColor [--chkbg:theme(colors.defaultColor)] [--chkfg:gray]"
          />
        </div>
      </form>
      <Outlet />
      <Nav />
    </>
  );
};

export default SearchPage;
