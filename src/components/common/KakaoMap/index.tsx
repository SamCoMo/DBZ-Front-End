import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  coordi: {
    lat?: number;
    long?: number;
  };
}

const KakaoMap = ({ coordi }: KakaoMapProps) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(coordi.long, coordi.lat), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    // 마커
    const markerPosition = new window.kakao.maps.LatLng(
      coordi.long,
      coordi.lat
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, []);

  return (
    <div>
      <div id="map" className="w-full h-56" />
    </div>
  );
};

export default KakaoMap;
