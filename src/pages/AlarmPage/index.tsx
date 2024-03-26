import HeaderTitle from "@/components/common/HeaderTitle";
import AlarmItem from "./AlarmItem";

const AlarmPage = () => {
  return (
    <>
      <HeaderTitle title="알림" back={true} />
      <div className="mx-4">
        <AlarmItem
          key={"hello"}
          body={"게시글에 새로운 핀이 찍혔습니다! 확인해보세요!"}
        />
        <AlarmItem
          key={"hello2"}
          body={"새로운 채팅이 있습니다! 확인해보세요!"}
        />
      </div>
    </>
  );
};

export default AlarmPage;
