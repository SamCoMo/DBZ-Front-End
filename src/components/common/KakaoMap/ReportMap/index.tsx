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
  const [clickedLatLng, setClickedLatLng] = useState<{lat: number, lng: number} | null>(null);
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

        const marker = new window.kakao.maps.Marker({
          position: mapOptions.center,
          map: map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lng = latlng.getLng();

            setClickedLatLng({ lat, lng });

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(lng, lat, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                infowindow.setContent(`<div>${address}</div>`);
                infowindow.open(map, marker);
                setClickedAddress(address);
              } else {
                console.error("Geocoder failed due to: " + status);
              }
            });

            marker.setPosition(latlng);
          }
        );
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  // 주소 상태가 업데이트되었을 때 onMarkerClick 호출
  useEffect(() => {
    if (clickedLatLng && clickedAddress) {
      onMarkerClick(clickedLatLng.lat, clickedLatLng.lng, clickedAddress);
    }
  }, [clickedLatLng, clickedAddress, onMarkerClick]);

  return <div id="map" style={{ width: "100%", height: "250px" }} />;
};

export default ReportKakaoMap;
