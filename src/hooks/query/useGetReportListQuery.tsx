import { axiosAccess } from "@/apis";

import {
  ReportListDataType,
  ReportListProps,
} from "@/types/Report/ReportDataType";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAPI = async (data: ReportListProps): Promise<ReportListDataType> => {
  const {
    curLatitude,
    curLongitude,
    lastLatitude,
    lastLongitude,
    InProcessOnly,
  } = data;
  const res = await axiosAccess.get("/report/list", {
    params: {
      curLatitude,
      curLongitude,
      lastLatitude: lastLatitude || curLatitude,
      lastLongitude: lastLongitude || curLongitude,
      showsInProcessOnly: InProcessOnly,
      page: 0,
      size: 10,
    },
  });
  return res.data.content;
};

const useGetReportListQuery = (params: ReportListProps) => {
  const {
    data: reportListData,
    fetchNextPage: reportListFetchNextPage,
    hasNextPage: reportHasNextPage,
    refetch: reportListRefetch,
    isLoading: reportListIsLoading,
    isFetching: reportListIsFetching,
  } = useInfiniteQuery({
    queryKey: ["reports", params.curLatitude],
    initialPageParam: {
      lastLatitude: params.curLatitude,
      lastLongitude: params.curLongitude,
    },
    queryFn: ({ pageParam }) =>
      fetchAPI({
        ...params,
        lastLatitude: pageParam.lastLatitude,
        lastLongitude: pageParam.lastLongitude,
      }),
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.content[lastPage.content.length - 1];
      return lastPage.last
        ? undefined
        : {
            lastLatitude: lastPost.latitude,
            lastLongitude: lastPost.longitude,
          };
    },
    enabled: false,
  });

  return {
    reportListData,
    reportListFetchNextPage,
    reportHasNextPage,
    reportListRefetch,
    reportListIsLoading,
    reportListIsFetching,
  };
};

export default useGetReportListQuery;
