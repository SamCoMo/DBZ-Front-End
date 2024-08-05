import  { useState } from 'react';
import HeaderTitle from "@/components/common/HeaderTitle";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";
import { BsFillPinAngleFill, BsPhoneFill } from "react-icons/bs";
import ReportDetailKakaoMap from "@/components/common/KakaoMap/ReportDetailMap";
import { useNavigate, useParams } from "react-router-dom";
import useUserState from "@/hooks/useUserState";
import useGetReportPinDetailQuery from "@/hooks/query/useGetReportPinDetailQuery";
import Modal from "@/components/common/Modal";
import useModalState from '@/hooks/useModalState';
import { format } from 'date-fns';
// import CreateChatRoomButton from '@/hooks/query/FirebaseChat/useFirebaseChatQuery';
import CreateChatRoomButton from '@/components/common/Button/WideButton/ChattingButton';


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
  const recipientId = reportDetail?.writerProfile.nickname;
  const currentUserId = userState.nickname;
  const handlePinClick = (pinId: number) => {
    setSelectedPinId(pinId);
    openModal();
  };

  if (!reportDetail) {
    return <div>No report detail available.</div>;
  }
  const [date, time] = (reportDetail.createdAt ?? '').split('T');
  const  [ pinDate ] = (reportPinDetail?.foundAt ?? '').split('T');
  return (
    <div>      
      <div>
        <HeaderTitle title={reportDetail.title} back={true} edit={userState && userState.nickname === reportDetail.writerProfile.nickname}/>

      </div>
      <div className="info-section">
        {reportDetail.imageList && reportDetail.imageList.length > 0 && (
          <img src={reportDetail.imageList[0].url} alt="Report Image" className="w-full h-80" />
        )}
        <div className="flex align-middle mx-3 my-3">
          <img className="w-14 h-14 rounded-full" src={reportDetail.writerProfile.profileImageUrl} alt="Profile" />
          <div className="mx-2">
            <p>{reportDetail.writerProfile.nickname}</p>
            <p>📌 {date} {time.slice(0, -10)}</p>
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
      <div>
      <p className="flex justify-start mb-2 mt-4">
            <BsPhoneFill className="mr-2 text-defaultColor" /> 제보연락: {reportDetail.phone}
          </p>
          <p className="flex justify-start mb-2 mt-4">
          <BsFillPinAngleFill className="mr-2 text-defaultColor" /> {reportDetail.descriptions}            
          </p>
      </div>
      <div className="flex justify-evenly my-4">
        <button className="btn bg-defaultColor text-white" onClick={() => navigate(`/report/${reportId}/pin`)}>핀 찍기</button>
        <CreateChatRoomButton recipientId={recipientId} />
        {/* <CreateChatRoomButton currentUserId={currentUserId} recipientId={recipientId}/> */}
      </div>
    </div>
  );
};

export default ReportDetailPage;
