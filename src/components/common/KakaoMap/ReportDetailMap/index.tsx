import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Pin {
  lat: number;
  lng: number;
  pinId: number;
}

interface Props {
  center: { lat: number; lng: number };
  myPin: Pin;
  otherPins: Pin[];
  onMarkerClick: (pinId: number, pinLatLng: { lat: number, lng: number }) => void;
}

const ReportDetailKakaoMap: React.FC<Props> = ({ center, myPin, otherPins, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = mapRef.current!;
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: 13,
        };

        const newMap = new window.kakao.maps.Map(mapContainer, options);
        setMap(newMap);

        // 내 위치 핀 표시
        const myMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(myPin.lat, myPin.lng),
          map: newMap,
        });

        // 다른 사용자 위치 핀 표시
        otherPins.forEach((pin) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
            map: newMap,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            // 마커 클릭 시 핀 ID와 위치 정보를 부모 컴포넌트로 전달
            onMarkerClick(pin.pinId, { lat: pin.lat, lng: pin.lng });
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [center, myPin, otherPins, onMarkerClick]);

  const handlePinClick = (pinId: number, pinLatLng: { lat: number, lng: number }) => {
    // 해당 핀의 위치로 인포윈도우를 표시합니다.
    if (map) {
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div>${'/* 해당 핀에 대한 정보 표시 */'}</div>`,
      });
      const markerPosition = new window.kakao.maps.LatLng(pinLatLng.lat, pinLatLng.lng);
      infoWindow.setPosition(markerPosition);
      infoWindow.open(map);
    }
  };

  return <div ref={mapRef} style={{ width: "100%", height: "250px" }} />;
};

export default ReportDetailKakaoMap;
