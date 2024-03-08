import React from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import Addr from "@/components/Report/MapAddr";
import WideButton from "@/components/common/Button/WideButton";
import { BsCameraFill } from "react-icons/bs";

const CreateReportPage = () => {
  return (
    <>
      <HeaderTitle title="게시글 작성" />
      <form>
        <div className="mb-3">
          <p className="mt-3 mb-3">사진</p>
          <button className="w-32 h-32 border rounded-lg">
            <BsCameraFill className="text-defaultColor m-auto" />
          </button>
        </div>
        <div>
          <p>제목</p>
          <Input type="text" placeholder="제목을 입력해주세요" />
        </div>
        <div>
          <p>종</p>
          <Input type="select" placeholder="종을 선택해주세요" />
        </div>
        <div>
          <p className="mt-3 mb-3">실종 위치</p>
          <Addr />
        </div>
        <div>
          <p className="mt-3">내용 작성하기</p>
          <textarea
            className="w-full h-32 p-2 my-4 border rounded-md focus:outline-none bg-gray2 text-body2 placeholder-text-gray4"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked
            className=" checked:border-white [--chkbg:198, 60%, 76%)] [--chkfg:white] mr-3"
          />
          <span>내 번호 표시하기</span>
        </div>
        <WideButton type="button" text="등록하기" />
      </form>
    </>
  );
};

export default CreateReportPage;
