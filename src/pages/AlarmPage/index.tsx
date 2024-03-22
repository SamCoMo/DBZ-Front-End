import HeaderTitle from "@/components/common/HeaderTitle";
import AlarmItem from "./AlarmItem";

const AlarmPage = () => {
  return (
    <>
      <HeaderTitle title="알림" back={true} />
      <div className="flex flex-col">
        <AlarmItem key={"hello"} body={"알림테스트"} />
        <AlarmItem key={"hello2"} body={"알림테스트"} />
      </div>
    </>
  );
};

export default AlarmPage;
