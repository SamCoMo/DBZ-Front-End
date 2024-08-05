import { axiosAccess } from "@/apis";
import { AlarmListDataType } from "@/types/Alarm/AlarmDataType";
import { useQuery } from "@tanstack/react-query";

const fetchAPI = async (): Promise<AlarmListDataType[]> => {
  const res = await axiosAccess.get("/notification/list");
  return res.data;
};

const useGetAlarmListQuery = () => {
  const { data: AlarmListData } = useQuery({
    queryKey: ["AlarmList"],
    queryFn: () => fetchAPI(),
  });

  return { AlarmListData };
};

export default useGetAlarmListQuery;
