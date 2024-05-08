import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
import Input from "@/components/common/Input";
import WideButton from "@/components/common/Button/WideButton";
import { BsCameraFill } from "react-icons/bs";
import usePostCreateReportQuery from "@/hooks/query/usePostReportQuery";
import { ReportDataType, ReportDetailType } from "@/types/Report/ReportDataType";
import SelectSpecies from "@/components/common/Select/SelectOptions";
import { useNavigate, useParams } from "react-router-dom";
import useUserState from "@/hooks/useUserState";
import usePatchReportQuery from "@/hooks/query/usePatchReportQuery";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";

const ReportEditPage = () => {
  const {userState} = useUserState();
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = Number(id);
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [petType, setPetType] = useState("");
  const [species, setSpecies] = useState("");
  const [petName, setPetName] = useState("");
  const [reportAddress, setReportAddress] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [showsPhone, setShowsPhone] = useState(false);
  const {reportIsMutate}= usePostCreateReportQuery();
  const { patchedReportIsMutate } = usePatchReportQuery();
  const { reportDetail } = useGetReportDetailQuery(reportId);

  // 게시글 생성에 필요한 데이터를 CreateReportType 타입에 맞춰 구성
  useEffect(() => {
    if (reportDetail) {
      setTitle(reportDetail.title);
      setContent(reportDetail.descriptions);
      setPetName(reportDetail.petName);
      setSpecies(reportDetail.species);
      setPetType(reportDetail.petType);
      setReportAddress({
        address: reportDetail.roadAddress,
        latitude: reportDetail.latitude,
        longitude: reportDetail.longitude,
      });
      setShowsPhone(reportDetail.showsPhone);
      // Setting image previews from existing URLs
      setPreviews(reportDetail.imageList.map(image => image.url));
    

    }
  }, [reportDetail]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSpeciesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecies(event.target.value);
  };

  const handlePetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPetName(event.target.value);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const fileArray = Array.from(fileList);
      setImages(fileArray);  // 새 이미지 파일을 상태에 설정
      const newPreviews = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);  // 프리뷰 업데이트
    } else {
      // 파일 리스트가 비어있을 경우 기존 이미지와 프리뷰를 유지
      if (images.length === 0 && reportDetail?.imageList) {
        // 기존 데이터로부터 이미지 URL을 다시 설정 (페이지 로드 시 한 번만 발생)
        setPreviews(reportDetail.imageList.map(image => image.url));
      }
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
  const handleMarkerClick = async (lat: number, lng: number, address: string) => {
    setReportAddress({
      address: address,
      latitude: lat,
      longitude: lng,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    const reportEditData: ReportDetailType = {
      // writerId: userState.memberId,
      reportId:reportId,
      title: title,
      petType: petType,
      showsPhone: showsPhone,
      species: species,
      petName: petName,
      descriptions: content,
      roadAddress: reportAddress.address,
      latitude: reportAddress.latitude,
      longitude: reportAddress.longitude,
      imageList: images,
    };

  
    patchedReportIsMutate(reportEditData);
    navigate("/home");
    console.log(reportEditData);
    console.log(reportId);
  };

  useEffect(() => {
    if (title && petType && showsPhone&&species&&petName&&content&&reportAddress) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [title, petType, showsPhone,species,petName,content,reportAddress]);

  return (
    <>
      <HeaderTitle title="게시글 수정" />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="images" className="inline-block">
  <div className="w-32 h-32 border rounded-lg flex items-center justify-center cursor-pointer relative">                 
    <input
      className="hidden"
      type="file"
      id="images"
      accept="image/*"
      multiple
      onChange={handleImageChange}
    />      
    {previews.length === 0 && <BsCameraFill className="text-defaultColor" />}  
    {previews.map((preview, index) => (
      <img className='w-32 h-32 border rounded-lg' key={index} src={preview} alt={`${preview} ${index}`} />
    ))}         
  </div>
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
          <p className="my-3">이름</p>
          <Input
            type="text"
            placeholder="반려동물의 이름을 입력해주세요"
            value={petName}
            onChange={handlePetNameChange}
          />
        </div>
        <div>
          <p className="my-3">종</p>
          <SelectSpecies
            reportSelectedSpecies={petType}
            handleSelected={handlePetTypeChange}
          />
        </div>
        <div>
          <p className="my-3">상세정보</p>
          <Input
            type="text"
            placeholder="상세 견종/묘종 등을 입력해주세요"
            value={species}
            onChange={handleSpeciesChange}
          />
        </div>
        <div>
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
        <WideButton text='수정하기' status={allCheck} />
      </form>
    </>
  );
};

export default ReportEditPage;