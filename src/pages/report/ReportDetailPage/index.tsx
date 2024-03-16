import React from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";
import { BsFillPinAngleFill, BsPhoneFill } from "react-icons/bs";
import ReportKakaoMap from "@/components/common/KakaoMap/ReportMap";
const ReportDetailPage = () => {
  const { reportDetail } = useGetReportDetailQuery({
    reportId: "1",
    writer: false,
  });

  if (!reportDetail) {
    return <div>No report detail available.</div>;
  }

  return (
    <div>
      <HeaderTitle title="먼지를 찾아주세요" />
      <div className="w-full h-80 carousel align-center mx-auto flex ">
        <div className="carousel align-center mx-auto flex">
          {reportDetail.image_list &&
            reportDetail.image_list.map((imageUrl, index) => (
              <div className="carousel-item w-full" key={index}>
                <img
                  src={imageUrl}
                  className="w-full"
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex align-middle mx-3 my-3">
        <img
          className="w-14 h-14 rounded-full "
          src="/Users/pinn/Desktop/스크린샷 2024-03-15 오후 9.44.15.png"
        />
        <div className="mx-2">
          <p>먼지엄마</p>
          <p>2024.03.14 14:00</p>
        </div>
        <div className="ml-56 flex justify-end">
          <span>조회 12</span>
        </div>
      </div>
      <div>
        <div>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />
            이름 : {reportDetail.pet_name}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />종 :{" "}
            {reportDetail.pet_type}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />
            실종 위치: {reportDetail.roadAddress}
          </p>
          {/* <지도> */}
          <ReportKakaoMap
            onMarkerClick={(lat, lng) => {
              // 마커를 클릭할 때 실행되는 핸들러
              console.log("Marker clicked at:", lat, lng);
            }}
          />
        </div>
        <hr className="w-full border bg-gray-200" />
        <div className="my-2">
          <p className="flex justify-start mb-2">
            <BsPhoneFill className="mr-2 text-defaultColor" />
            010-1234-1234
          </p>
        </div>
        <div className="my-2">
          {reportDetail.feature}저희 애가 잠시 문 열어둔 틈을 타 나가
          버렸어요... 오후 2-3시 사이 나갔을 걸로 추정되는데, 찾기 쉽지
          않네요... 비슷한 아이를 보게 되신다면 꼭 연락 부탁드려요..
        </div>
      </div>
      <div className="flex justify-evenly">
        <button className="btn w-36 bg-defaultColor text-white">핀 찍기</button>
        <button className="btn w-36 bg-defaultColor text-white">
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ReportDetailPage;
