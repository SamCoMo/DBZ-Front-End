import React from "react";
import InnerCon from "@/components/common/InnerCon";
import Input from "@/components/common/Input";

interface HomePageProps {}
const HomePage = ({}: HomePageProps) => (
  <InnerCon>
    홈입니다
    <Input type="text" />
  </InnerCon>
);

export default HomePage;
