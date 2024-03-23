import { useEffect, useRef } from "react";

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
  otherPins: Pin[]; // Corrected type
  onMarkerClick: (pinId: number, pinLatLng: { lat: number, lng: number }) => void;
}

const ReportDetailKakaoMap: React.FC<Props> = ({ center, myPin, otherPins, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

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

        // 내 위치 핀 표시
        new window.kakao.maps.Marker({
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

  return <div ref={mapRef} style={{ width: "100%", height: "250px" }} />;
};

export default ReportDetailKakaoMap;
