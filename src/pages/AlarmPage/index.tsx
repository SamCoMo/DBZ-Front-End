import HeaderTitle from "@/components/common/HeaderTitle";
import AlarmItem from "./AlarmItem";
import useGetAlarmListQuery from "@/hooks/query/useGetAlarmListQuery";
import { CiWarning } from "react-icons/ci";

const AlarmPage = () => {
  const { AlarmListData } = useGetAlarmListQuery();
  return (
    <>
      <HeaderTitle title="알림" back={true} />
      <div className="mx-4">
        {AlarmListData?.length !== 0 ? (
          AlarmListData?.map((item) => (
            <AlarmItem type={item.type} message={item.message} />
          ))
        ) : (
          <div className="flex flex-col justify-center mt-10 text-slate-400">
            <CiWarning className="flex w-full justify-center" size={60} />
            <p className="text-center">새로운 알림이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AlarmPage;
