import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  markers: {
    lat: number;
    lng: number;
    content?: string;
  }[];
}

const ReportDetailKakaoMap = ({ center, markers }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao) return;

    const { kakao } = window;

    const options = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, options);

    markers.forEach((marker) => {
      const markerPosition = new kakao.maps.LatLng(marker.lat, marker.lng);
      const markerOptions: any = {
        position: markerPosition,
      };

      const newMarker = new kakao.maps.Marker(markerOptions);
      newMarker.setMap(map);
    });
  }, [center, markers]);

  return <div ref={mapRef} style={{ width: "100%", height: "250px" }} />;
};

export default ReportDetailKakaoMap;
