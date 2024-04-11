import HeaderTitle from "@/components/common/HeaderTitle";
import useGetReportDetailQuery from "@/hooks/query/useGetReportQuery";
import { BsFillPinAngleFill, BsPhoneFill } from "react-icons/bs";
import ReportDetailKakaoMap from "@/components/common/KakaoMap/ReportDetailMap";
import { useNavigate, useParams } from "react-router-dom";
import useUserState from "@/hooks/useUserState";
import ModalInSelectEdit from "@/components/Report/ModalInSelectEdit";
import useGetReportPinListQuery from "@/hooks/query/useGetReportPinsQuery";
import useGetReportPinDetailQuery from "@/hooks/query/useGetReportPinDetailQuery";

const ReportDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = Number(id);

  
  // 상세 정보를 가져오는 훅 사용
  const { reportDetail } = useGetReportDetailQuery(reportId);
  const [date, time] = (reportDetail?.createdAt ?? '').split('T');  
  // 현재 사용자 정보 가져오기
  const { userState } = useUserState();

  console.log(reportDetail);
  // 각 핀에 대한 클릭 이벤트 핸들러
  const handlePinClick = async (pinId: number) => {
    // 해당 핀의 상세 정보를 가져오는 쿼리 호출
    const { reportPinDetail } = await useGetReportPinDetailQuery(reportId, pinId);
    
    // reportPinDetail을 활용하여 인포윈도우 표시
    if (reportPinDetail && Map) {
      // 인포윈도우 내용 설정
      const content = (
        <div className="w-36 h-9 rounded">
          <h3>{reportPinDetail.address}</h3>
          <p>{reportDetail?.descriptions}</p>
          <img src={reportPinDetail.imageUrl} alt="Report Image" />
        </div>
      );
      
      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(reportPinDetail.latitude, reportPinDetail.longitude),
        map: Map,
      });
  
      // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: content,
      });
    
      // 마커를 클릭했을 때 인포윈도우를 표시합니다.
      window.kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(Map, marker);
      });
    }
  };
  
  if (!reportDetail) {
    return <div>No report detail available.</div>;
  }
  

const handleClickPinBtn =() => {
  navigate(`/report/${reportId}/pin`)
}
const handleClickChatBtn =() => {
  navigate(`/chat/room`)
}
  return (
    <div>
      <div className="flex justify-center">
        <HeaderTitle title={reportDetail.title} />
        {userState && userState.memberId === reportDetail.organizedId && (
          <ModalInSelectEdit />
        )}
      </div>
      <div className="w-full h-80 align-center mx-auto flex ">
        {/* <div className="carousel align-center mx-auto flex">
          {reportDetail.imageList &&
            reportDetail.imageList.map((imageUrl, index) => (
              <div className="carousel-item w-full" key={index}>
                <img
                  src={imageUrl}
                  className="w-full"
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
        </div> */}
          {reportDetail.imageList && reportDetail.imageList.length > 0 && (
            <img src={reportDetail.imageList[0].url} alt="Report Image" className="w-full h-auto" />
          )}
      {/* <img src={`${reportDetail.imageUrl}`} alt="Report Image" className="w-full" /> */}
      </div>
      <div className="flex align-middle mx-3 my-3">
        <img
          className="w-14 h-14 rounded-full "
          src={userState.profileImageUrl}
        />
        <div className="mx-2">
          <p>{userState.nickname}</p>
          <p>📌 {date}&nbsp;&nbsp;{time.slice(0, -9)}</p>
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
              reportId={reportDetail.reportId}
              onMarkerClick={handlePinClick}
            // otherPins={[]}
            // onMarkerClick={handlePinClick}
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
        <button className="btn w-36 bg-defaultColor text-white" onClick={handleClickPinBtn}>핀 찍기</button>
        <button className="btn w-36 bg-defaultColor text-white"onClick={handleClickChatBtn}>
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default ReportDetailPage;
