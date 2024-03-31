import React, { useEffect, useRef, useState } from "react";
import useGetReportPinListQuery from "@/hooks/query/useGetReportPinsQuery";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  center: { lat: number; lng: number };
  reportId: number; // reportId를 prop으로 받음
  onMarkerClick: (pinId: number, pinLatLng: { lat: number, lng: number }) => void;
}

const ReportDetailKakaoMap: React.FC<Props> = ({ center, reportId, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // useGetReportPinListQuery를 사용하여 핀 데이터 가져오기
  const { reportPinList, reportPinListIsLoading } = useGetReportPinListQuery(reportId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=aa284c4ddc4baf73a4feda491a554291&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = mapRef.current!;
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: 3,
        };

        const newMap = new window.kakao.maps.Map(mapContainer, options);
        setMap(newMap);
      });
    };
  }, [center]);

  useEffect(() => {
    if (!map || reportPinListIsLoading || !reportPinList) return;
  
    // 이전에 추가된 마커 제거
    markers.forEach(marker => marker.setMap(null));
  
    // 새로운 마커를 추가하고 리스트 업데이트
    const newMarkers = reportPinList.map((pin: { lat: any; lng: any; pinId: number; imageUrl: string; }) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
        map,
      });
  
      window.kakao.maps.event.addListener(marker, 'click', () => {
        onMarkerClick(pin.pinId, { lat: pin.lat, lng: pin.lng });
        // 정보 창에 표시될 내용을 설정합니다.
        const content = `<div style="padding:5px;">${'<img src="' + pin.imageUrl + '" alt="pin image" style="width:150px; display:block; margin-bottom:5px;"/>'}<br/>위치 정보: ${pin.lat}, ${pin.lng}</div>`;
  
        const infowindow = new window.kakao.maps.InfoWindow({
          content: content,
          removable: true
        });
        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, reportPinList, reportPinListIsLoading, onMarkerClick]);
  
  return <div ref={mapRef} style={{ width: "100%", height: "250px" }}/>;
};

export default ReportDetailKakaoMap;