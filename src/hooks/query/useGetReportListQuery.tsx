import { axiosAuth } from "@/apis";
import { ReportListProps } from "@/components/Report/ReportList";
import {
  ReportListDataType,
  ReportParamsType,
} from "@/types/Report/ReportDataType";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAPI = async (
  data: ReportListProps
): Promise<ReportListDataType[]> => {
  const {
    curlatitude,
    curlongitude,
    lastlatitude,
    lastlongitude,
    InProcessOnly,
  } = data;
  const res = await axiosAuth.get("/report/list", {
    params: {
      curlatitude,
      curlongitude,
      lastlatitude: lastlatitude || curlatitude,
      lastlongitude: lastlongitude || curlongitude,
      showsInProcessOnly: InProcessOnly,
      size: 10,
    },
  });
  return res.data;
};

const useGetReportListQuery = (params: ReportListProps) => {
  const {
    data: reportListData,
    fetchNextPage: reportListFetchNextPage,
    hasNextPage: reportHasNextPage,
    refetch: reportListRefetch,
  } = useInfiniteQuery({
    queryKey: ["reports"],
    initialPageParam: {
      lastlatitude: params.curlatitude,
      lastlongitude: params.curlongitude,
    },
    queryFn: ({ pageParam }) =>
      fetchAPI({
        ...params,
        lastlatitude: pageParam.lastlatitude,
        lastlongitude: pageParam.lastlongitude,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPage.length === 0
        ? undefined
        : {
            lastlatitude: lastPost.latitude,
            lastlongitude: lastPost.longitude,
          };
    },
  });

  return {
    reportListData,
    reportListFetchNextPage,
    reportHasNextPage,
    reportListRefetch,
  };
};

export default useGetReportListQuery;
