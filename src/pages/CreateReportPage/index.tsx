import React, { useState } from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
import Input from "@/components/common/Input";
import WideButton from "@/components/common/Button/WideButton";
import { BsCameraFill } from "react-icons/bs";
import usePostCreateReportQuery from "@/hooks/query/usePostReportQuery";
import { CreateReportType } from "@/types/Report/CreateReportType";
import SelectSpecies from "@/components/common/Select/SelectOptions";

const CreateReportPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [petType, setPetType] = useState("");
  const [species, setSpicies] = useState("");
  const [petName, setPetName] = useState("");
  const [reportAddress, setReportAddress] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [showsPhone, setShowsPhone] = useState(false);
  const postCreateReportQuery = usePostCreateReportQuery();
  // 게시글 생성에 필요한 데이터를 CreateReportType 타입에 맞춰 구성

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const coordi = {
    lat: reportAddress.latitude,
    long: reportAddress.longitude,
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images: File[] = Array.from(event.target.files);
      setSelectedImages(images);
    }
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };
  const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetType(event.target.value);
  };
  const handleShowsPhoneCheckedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowsPhone(event.target.checked);
  };
  const handleMarkerClick = (lat: number, lng: number) => {
    setReportAddress({
      ...reportAddress,
      latitude: lat,
      longitude: lng,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reportData: CreateReportType = {
      reportId: 0, // reportId는 서버에서 생성될 것으로 가정
      title: title,
      pet_type: petType,
      shows_phone: showsPhone,
      species: species,
      pet_name: petName,
      feature: content,
      street_address: reportAddress.address,
      roadAddress: reportAddress.address,
      latitude: reportAddress.latitude,
      longitude: reportAddress.longitude,
      image_list: [],
    };

    // usePostCreateReportQuery 훅을 사용하여 게시글 생성 요청
    postCreateReportQuery.reportIsMutate(reportData);
  };

  return (
    <>
      <HeaderTitle title="게시글 작성" />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="my-3">사진</p>
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
          <p className="my-3">제목</p>
          <Input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <div>
            <p className="my-3">종</p>
            <SelectSpecies
              reportSelectedSpecies={petType}
              handleSelected={handlePetTypeChange}
            />
          </div>
          <p className="my-3">내용</p>
          <textarea
            className="w-full h-32 p-2 my-4 border rounded-md focus:outline-none bg-gray2 text-body2 placeholder-text-gray4"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <p className="my-3">실종 위치</p>
          <ReportKakaoMap onMarkerClick={handleMarkerClick} />
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={showsPhone}
            onChange={handleShowsPhoneCheckedChange}
            className="my-3 checked:border-white [--chkbg:198, 60%, 76%)] [--chkfg:white] mr-3"
          />
          <span>내 번호 표시하기</span>
        </div>
        <WideButton type="submit" text="등록하기" status={false} />
      </form>
    </>
  );
};

export default CreateReportPage;
