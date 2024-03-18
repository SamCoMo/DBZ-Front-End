import HeaderTitle from "@/components/common/HeaderTitle";
import AlarmItem from "./AlarmItem";

const AlarmPage = () => {
  return (
    <>
      <HeaderTitle title="알림" back={true} />
      <div>
        <AlarmItem
          key={"hello"}
          body={"???님이 핀을 찍었습니다! 확인해보세요!"}
        />
        <AlarmItem
          key={"hello2"}
          body={"???님이 채팅을 보냈습니다! 확인해보세요!"}
        />
      </div>
    </>
  );
};

export default AlarmPage;
