import HeaderTitle from "@/components/common/HeaderTitle";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
import React, { useState } from "react";
import { BsCameraFill } from "react-icons/bs";

const PinPage = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [reportAddress, setReportAddress] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [content, setContent] = useState("");

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
  const handleMarkerClick = (lat: number, lng: number) => {
    setReportAddress({
      ...reportAddress,
      latitude: lat,
      longitude: lng,
    });
  };
  return (
    <div>
      <HeaderTitle title="핀 생성하기" />
      <form>
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
          <div>
            <p className="my-3">목격 위치</p>
            <ReportKakaoMap onMarkerClick={handleMarkerClick} />
          </div>
          <div>
            <p className="my-3">내용</p>
            <textarea
              className="w-full h-5 p-2 my-4 border rounded-md focus:outline-none bg-gray2 text-body2 placeholder-text-gray4"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <ReportKakaoMap onMarkerClick={} />
      </form>
    </div>
  );
};

export default PinPage;
