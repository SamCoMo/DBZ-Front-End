import React, { useState } from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import Addr from "@/components/Report/MapAddr";
import WideButton from "@/components/common/Button/WideButton";
import { BsCameraFill } from "react-icons/bs";
import usePostCreateReportQuery from "@/hooks/query/usePostReportQuery";

const CreateReportPage = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images: File[] = Array.from(event.target.files);
      setSelectedImages(images);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 선택된 이미지를 서버에 업로드하는 코드를 작성합니다.
    // 이 코드는 서버와의 통신 및 이미지 업로드를 담당합니다.
  };
  return (
    <>
      <HeaderTitle title="게시글 작성" />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="mt-3 mb-3">사진</p>
          <label htmlFor="images" className="inline-block">
            <div className="w-32 h-32 border rounded-lg flex items-center justify-center cursor-pointer">
              <BsCameraFill className="text-defaultColor" />
            </div>
            <input
              className="hidden"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div>
          <p>제목</p>
          <Input
            type="text"
            placeholder="제목을 입력해주세요"
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div>
          <p>종</p>
          <Input
            type="select"
            placeholder="종을 선택해주세요"
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
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
        <WideButton type="button" text="등록하기" status={false} />
      </form>
    </>
  );
};

export default CreateReportPage;
