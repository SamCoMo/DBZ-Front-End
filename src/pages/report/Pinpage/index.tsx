import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
import usePostReportPinQuery from "@/hooks/query/usePostReportPinQuery";
import { ReportPinDataType } from "@/types/Report/ReportDataType";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import ImageUpload from "@/components/common/ImageUpload";
import { ReportPinRequestDataType } from "@/types/Report/ReportDataType";


const PinPage = () => {
  const { pinIsMutate } = usePostReportPinQuery();
  const [preview, setPreview] = useState<string[]>([]);
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [reportAddress, setReportAddress] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [content, setContent] = useState("");

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     // 첫 번째 이미지 파일만 선택
  //     const newImage: File = e.target.files[0];
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       if (reader.readyState === FileReader.DONE) {
  //         const newPreview: string = reader.result as string;
  //         setPreview([newPreview]);
  //       }
  //     };
  
  //     // 파일 객체를 읽어 base64 형태의 문자열로 변환
  //     reader.readAsDataURL(newImage);
  //     setSelectedImage([newImage]);
  //   }
  // };
  
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
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
    const reportPinData: ReportPinRequestDataType = {
      pinId: 0,
      address: reportAddress.address,
      latitude: reportAddress.latitude,
      longitude: reportAddress.longitude,
      pinImageDtoList: [],
      foundAt: "",
    };

    // 훅을 사용하여 핀 생성 요청
    pinIsMutate(reportPinData);  
  };
  useEffect(() => {
    if (content) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [content]);


  return (
    <div>
      <HeaderTitle title="핀 생성하기" />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="my-3">사진</p>
          <label htmlFor="images" className="inline-block">
            <div className="w-32 h-32 border rounded-lg flex items-center justify-center cursor-pointer">
              <BsCameraFill className="text-defaultColor" />
              <ImageUpload />
              {preview.map((preview, index) => (
        <img className='w-32 h-32 border rounded-lg' key={index} src={preview} alt={`${preview} ${index}`} />
      ))}
            </div>


          </label>
          <div>
            <p className="my-3">목격 위치</p>
            <ReportKakaoMap onMarkerClick={handleMarkerClick} />
          </div>
          <div>
            <p className="my-3">내용</p>
            <textarea
              className="w-full  p-2 my-4 border rounded-md focus:outline-none bg-gray2 text-body2 placeholder-text-gray4"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <ReportKakaoMap onMarkerClick={handleMarkerClick} />

      <WideButton text="등록하기" status={allCheck} />
    </form>
    </div>
  );
};

export default PinPage;
