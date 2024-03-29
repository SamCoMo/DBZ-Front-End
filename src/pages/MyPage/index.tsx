import UserProfile from "@/components/UserProfile";
import HeaderTitle from "@/components/common/HeaderTitle";
import Nav from "@/components/common/Nav";
import usePatchLocationQuery from "@/hooks/query/usePatchLocationQuery";
import useLocationState from "@/hooks/useLocationState";
import axios from "axios";
import { useEffect, useState } from "react";

type NewLocationType = {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
};

const MyPage = () => {
  const { locationState, updateLocation } = useLocationState();
  const [newLocation, setNewLocation] = useState<NewLocationType>({
    address: null,
    latitude: locationState.latitude,
    longitude: locationState.longitude,
  });

  const { PatchLocationMutate } = usePatchLocationQuery();

  function onSuccess(pos: GeolocationPosition) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.documents[0]);
        setNewLocation({
          address:
            res.data.documents[0].road_address?.address_name ||
            "주소지를 받아오지 못했습니다.",
          latitude: lat,
          longitude: lon,
        });
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, [locationState]);

  const handleClick = () => {
    PatchLocationMutate({
      address: newLocation.address,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    });
    updateLocation({
      address: newLocation.address,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    });
  };

  return (
    <>
      <HeaderTitle title="" back={true} />
      <UserProfile />
      <div className="mt-5 text-center">
        <button
          onClick={handleClick}
          className="btn bg-defaultColor text-white hover:bg-defaultColor/75 border-none"
          disabled={!newLocation.address}
        >
          {newLocation.address ? (
            <span>사용자 위치 변경하기</span>
          ) : (
            <>
              <span>사용자 위치 가져오는 중</span>
              <span className="loading loading-spinner"></span>
            </>
          )}
        </button>
      </div>
      <Nav />
    </>
  );
};

export default MyPage;
