import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface ReportKakaoMapProps {
  onMarkerClick: (lat: number, lng: number, address: string) => void; 
}

const ReportKakaoMap = ({ onMarkerClick }: ReportKakaoMapProps) => {
  const [clickedAddress, setClickedAddress] = useState("");

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const mapOptions = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOptions);

        // 마커를 생성하고 지도 위에 표시합니다
        const marker = new window.kakao.maps.Marker({
          position: mapOptions.center,
          map: map,
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 클릭 이벤트 핸들러를 등록합니다.
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lng = latlng.getLng();

            // 좌표를 주소로 변환하여 인포윈도우에 표시
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              lng,
              lat,

              function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                  const address = result[0].address.address_name;
                  // 인포윈도우에 주소 정보 표시
                  infowindow.setContent(`<div>${address}</div>`);
                  infowindow.open(map, marker);
                  
                  // 클릭한 곳의 주소를 상태로 업데이트
                  setClickedAddress(address);
                } else {
                  console.error("Geocoder failed due to: " + status);
                }
              }
            );

            // 마커의 위치를 클릭한 위치로 변경합니다
            marker.setPosition(latlng);
            // 클릭한 위치의 좌표와 주소를 부모 컴포넌트로 전달합니다
            onMarkerClick(lat, lng, clickedAddress); 
          }
        );
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  return <div id="map" style={{ width: "100%", height: "250px" }} />;
};

export default ReportKakaoMap;