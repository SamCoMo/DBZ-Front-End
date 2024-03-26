import { axiosAccess, axiosAuth } from "@/apis";

import {
  ReportListDataType,
  ReportListProps,
} from "@/types/Report/ReportDataType";
import { useQuery } from "@tanstack/react-query";
// import { useInfiniteQuery } from "@tanstack/react-query";

interface SearchReportListProps {
  object:string;
  InProcessOnly:boolean;
};


const fetchAPI = async (
  data: SearchReportListProps
): Promise<ReportListDataType[]> => {
  const {
    object,
    InProcessOnly,
  } = data;
  const res = await axiosAccess.get("/report/list", {
    params: {
      object,
      showsInProcessOnly: InProcessOnly,
      page: 0,
      size: 10,
    },
  });
  return res.data.content;
};

const useGetSearchReportListQuery = (params: SearchReportListProps) => {
  const {
    data: searchReportListData,
    refetch: searchReportListRefetch,
    isLoading: searchReportListIsLoading,
    isFetching: searchReportListIsFetching,
  } = useQuery({
    queryKey: ["reports", params.object],
    queryFn: ({}) =>
      fetchAPI({
        ...params,
      })});

  return {
    searchReportListData,
    searchReportListRefetch,
    searchReportListIsLoading,
    searchReportListIsFetching,
  };
};

export default useGetSearchReportListQuery;
