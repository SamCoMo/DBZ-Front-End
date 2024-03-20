import React from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";
import { BsFillPinAngleFill, BsPhoneFill } from "react-icons/bs";
import ReportDetailKakaoMap from "@/components/common/KakaoMap/ReportDetailMap";
import { useParams } from "react-router-dom";
import useDeleteReportQuery from "@/hooks/query/useDeleteReportQuery";
import useUserState from "@/hooks/useUserState";
import ModalInSelectEdit from "@/components/Report/ModalInSelectEdit";

const ReportDetailPage = () => {
  const { id } = useParams();
  const reportId = Number(id);
  const { reportDetail } = useGetReportDetailQuery(reportId);
  const { userState } = useUserState(); // 현재 사용자 정보 가져오기
  const { reportDeleteIsMutate } = useDeleteReportQuery();

  if (!reportDetail) {
    return <div>No report detail available.</div>;
  }
  const markers = [
    {
      lat: reportDetail.latitude,
      lng: reportDetail.longitude,
      content: reportDetail.roadAddress,
    },
  ];

  // 삭제하기
  const handleReportDelete = () => {
    const reportConfirmed = window.confirm("해당 일정을 삭제하시겠습니까?");
    if (reportConfirmed) {
      reportDeleteIsMutate(reportId);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <HeaderTitle title={reportDetail.title} />
        {userState && userState.memberId === reportDetail.organizedId && (
          <ModalInSelectEdit />
        )}
      </div>
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
          <p></p>
          <p>{reportDetail.createdAt}</p>
        </div>
        <div className="ml-56 flex justify-end">
          <span>{reportDetail.views}</span>
        </div>
      </div>
      <div>
        <div>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />
            이름 : {reportDetail.petName}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />종 :{" "}
            {reportDetail.species}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" />
            실종 위치: {reportDetail.roadAddress}
          </p>
          {/* <지도> */}
          <ReportDetailKakaoMap
            center={{
              lat: reportDetail.latitude,
              lng: reportDetail.longitude,
            }}
            markers={markers}
          />
        </div>
        <hr className="w-full border bg-gray-200" />
        <div className="my-2">
          <p className="flex justify-start mb-2">
            <BsPhoneFill className="mr-2 text-defaultColor" />
            {reportDetail.phone}
          </p>
        </div>
        <div className="my-2">{reportDetail.descriptions}</div>
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
