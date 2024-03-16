import ReportItem from "@/components/Report/ReportList/ReportItem";
import Logo from "@/components/common/Logo";
import Nav from "@/components/common/Nav";
import React from "react";
import { BsBellFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

interface HomePageProps {}
const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Logo width={140} />
        <NavLink to={"/alarm"}>
          <BsBellFill size={25} className="mx-5" color="#878787" />
        </NavLink>
      </div>
      <div className="flex justify-between mb-5">
        <div>📌 현재 위치 - 오산동</div>
        <div className="flex items-center">
          <p className="mr-1">진행중만 보기 </p>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-sm checked:border-defaultColor [--chkbg:theme(colors.defaultColor)] [--chkfg:gray]"
          />
        </div>
      </div>
      <ReportItem />
      <ReportItem />
      <Nav />
    </>
  );
};

export default HomePage;
