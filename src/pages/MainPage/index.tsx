import Logo from "@/components/common/Logo";
import { NavLink } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className="mt-14">
        <div>
          <Logo width={200} addStyle="m-auto" />
          <div className="text-center text-xl text-gray-500">
            동네 반려동물 찾자
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[300px] absolute bottom-0 mb-24">
            <div className="border p-3 text-center rounded mb-3">
              구글 로그인
            </div>
            <div className="p-3 bg-yellow-300 text-center rounded mb-3">
              카카오 로그인
            </div>
            <NavLink to={"/login"}>
              <div className="p-3 bg-gray-300 text-center rounded mb-3">
                이메일 로그인
              </div>
            </NavLink>
            <div className="flex justify-center text-sm">
              아직 회원이 아니신가요?
              <NavLink to={"/signup"}>
                <p className="font-semibold ml-2">회원가입 하기</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
