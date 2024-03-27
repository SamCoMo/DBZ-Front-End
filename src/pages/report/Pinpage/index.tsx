import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
import usePostReportPinQuery from "@/hooks/query/usePostReportPinQuery";
import { ReportPinDataType } from "@/types/Report/ReportDataType";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { useParams } from "react-router-dom";



const CreatePinPage = () => {
  const { id } = useParams();
  const reportId = Number(id);
  const { pinIsMutate } = usePostReportPinQuery(reportId);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [reportAddress, setReportAddress] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [content, setContent] = useState("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setImages(fileArray);
      const previewsArray = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(previewsArray);
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };
  const handleMarkerClick = (lat: number, lng: number, address: string) => {
    setReportAddress({
      address: address,
      latitude: lat,
      longitude: lng,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const reportPinData: ReportPinDataType = {
      address: reportAddress.address,
      latitude: reportAddress.latitude,
      longitude: reportAddress.longitude,
      multipartFileList: images,
      descriptions: content,
    };

    // 훅을 사용하여 핀 생성 요청
    pinIsMutate(reportPinData);  
    console.log(reportPinData);
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
          <div className="w-32 h-32 border rounded-lg flex items-center justify-center cursor-pointer relative">                 
          <input
              className="hidden"
              type="file"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
            />      
              {previews.length === 0 && <BsCameraFill className="text-defaultColor" />}  
              {previews.map((preview, index) => (
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

export default CreatePinPage;
