import ReportList from "@/components/Report/ReportList";
import Logo from "@/components/common/Logo";
import Nav from "@/components/common/Nav";
import useLocationState from "@/hooks/useLocationState";
import React, { useEffect, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

interface HomePageProps {}
const HomePage = ({}: HomePageProps) => {
  const { locationState, updateLocation } = useLocationState();
  const [inProcessOnly, setInProcessOnly] = useState<boolean>(false);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     updateLocation({
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude,
  //     });
  //   });
  // }, []);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProcessOnly(e.target.checked);
  };

  return (
    <>
      <div className="max-w-default m-auto w-full fixed top-0 left-0 right-0 bg-white">
        <div className="flex justify-between items-center">
          <Logo width={140} />
          <NavLink to={"/alarm"}>
            <BsBellFill size={25} className="mx-5" color="#878787" />
          </NavLink>
        </div>
        <div className="flex justify-between mb-5">
          <div>{`📌 현재 위치 - 매탄동`}</div>
          <div className="flex items-center">
            <p className="mr-1">진행중만 보기</p>
            <input
              type="checkbox"
              onChange={handleCheckChange}
              className="checkbox checkbox-sm checked:border-defaultColor [--chkbg:theme(colors.defaultColor)] [--chkfg:gray]"
            />
          </div>
        </div>
      </div>
      <div className="mt-32 mb-14">
        <ReportList
          curlatitude={locationState.latitude}
          curlongitude={locationState.longitude}
          InProcessOnly={inProcessOnly}
        />
      </div>
      <Nav />
    </>
  );
};

export default HomePage;
