import React, { useEffect, useRef } from 'react';
import useGetReportPinListQuery from '@/hooks/query/useGetReportPinsQuery';

interface MapProps {
  reportId: number;
  center: { lat: number, lng: number };
  onPinSelect: (pinId: number) => void;  // 상위 컴포넌트로 선택된 pinId 전달
}

const ReportDetailKakaoMap: React.FC<MapProps> = ({ reportId, center, onPinSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { reportPinList } = useGetReportPinListQuery(reportId);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !reportPinList) return;

    const mapContainer = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, options);

    reportPinList.forEach(pin => {
      const markerPosition = new window.kakao.maps.LatLng(pin.latitude, pin.longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        onPinSelect(pin.pinId);  // 마커 클릭 시 pinId 전달
      });
    });
  }, [center, reportPinList, onPinSelect]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default ReportDetailKakaoMap;
