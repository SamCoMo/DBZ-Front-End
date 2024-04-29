import React, { useCallback, useState } from 'react';
import HeaderTitle from "@/components/common/HeaderTitle";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";
import { BsFillPinAngleFill, BsPhoneFill } from "react-icons/bs";
import ReportDetailKakaoMap from "@/components/common/KakaoMap/ReportDetailMap";
import { useNavigate, useParams } from "react-router-dom";
import useUserState from "@/hooks/useUserState";
import ModalInSelectEdit from "@/components/Report/ModalInSelectEdit";
import useGetReportPinDetailQuery from "@/hooks/query/useGetReportPinDetailQuery";
import Modal from "@/components/common/Modal";
import useModalState from '@/hooks/useModalState';
import { format } from 'date-fns';
import usePostChatRoomQuery from '@/hooks/query/usePostChatRoomQuery';

const ReportDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = Number(id);
  const {openModal, closeModal, modalState } = useModalState();
  // 상세 정보를 가져오는 훅 사용
  const { reportDetail } = useGetReportDetailQuery(reportId);
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null); // 상태의 타입을 number | null로 명시적으로 설정

  // 현재 사용자 정보 가져오기
  const { userState } = useUserState();
  const { reportPinDetail, reportPinDetailIsLoading } = useGetReportPinDetailQuery(reportId, selectedPinId);

  // 채팅방 생성
  const { chatRoomCreateIsMutate } = usePostChatRoomQuery();

  const handlePinClick = (pinId: number) => {
    setSelectedPinId(pinId);
    openModal();
    console.log('Modal should open now');
  };

  const handleCreateChatRoom = useCallback(() => {
    const recipientId = reportDetail.writerId; // 게시물 생성자 ID를 recipientId로 사용
  
    chatRoomCreateIsMutate({
      recipientId  // recipientId를 payload 객체에 포함
    }, {
      onSuccess: (data) => {
        navigate(`/chat/${data.chatRoomId}`); // 채팅방 생성 성공 후 해당 채팅방으로 이동
      }
    });
  }, [chatRoomCreateIsMutate, navigate, reportDetail]);

  if (!reportDetail) {
    return <div>No report detail available.</div>;
  }

  const [date, time] = (reportDetail.createdAt ?? '').split('T');
  const  [ pinDate ] = (reportPinDetail?.foundAt ?? '').split('T');
  return (
    <div>
      <div className='flex justify-center'>
        <HeaderTitle title={reportDetail.title} />
        {userState && userState.memberId === reportDetail.writerId && <ModalInSelectEdit />}
      </div>
      <div className="info-section">
        {reportDetail.imageList && reportDetail.imageList.length > 0 && (
          <img src={reportDetail.imageList[0].url} alt="Report Image" className="w-full h-80" />
        )}
        <div className="flex align-middle mx-3 my-3">
          <img className="w-14 h-14 rounded-full" src={userState.profileImageUrl} alt="Profile" />
          <div className="mx-2">
            <p>{userState.nickname}</p>
            <p>📌 {date} {time.slice(0, -9)}</p>
          </div>
          <div className="ml-auto">{reportDetail.views}</div>
        </div>
        <div>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" /> 이름 : {reportDetail.petName}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" /> 종 : {reportDetail.species}
          </p>
          <p className="flex justify-start mb-2">
            <BsFillPinAngleFill className="mr-2 text-defaultColor" /> 실종 위치: {reportDetail.roadAddress}
          </p>
          <ReportDetailKakaoMap
            center={{ lat: reportDetail.latitude, lng: reportDetail.longitude }}
            reportId={reportId}
            onPinSelect={handlePinClick}
          />
        {modalState.isOpen && (
          <Modal isOpen={modalState.isOpen} onClose={closeModal}>
            {reportPinDetailIsLoading ? <p>Loading...</p> : (
              <div>
                <h2 className='font-bold text-lg'>핀 상세 정보</h2>
                <h3>📍 발견 장소: {reportPinDetail?.address}</h3>
                <p>📍 발견 일시: {pinDate}</p>
                <img src={reportPinDetail?.pinImageDtoList[0].url} alt="Pin" />                
                <p className='mt-2'>📍 상세설명:{reportPinDetail?.description}</p>

              </div>
            )}
          </Modal>
        )}
        </div>
      </div>
      <div className="flex justify-evenly my-4">
        <button className="btn bg-defaultColor text-white" onClick={() => navigate(`/report/${reportId}/pin`)}>핀 찍기</button>
        <button className="btn bg-defaultColor text-white" onClick={handleCreateChatRoom}>채팅하기</button>
      </div>
    </div>
  );
};

export default ReportDetailPage;
