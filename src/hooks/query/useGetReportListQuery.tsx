import { axiosAuth } from "@/apis";
import {
  ReportListDataType,
  ReportParamsType,
} from "@/types/Report/ReportDataType";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAPI = async (
  data: ReportParamsType
): Promise<ReportListDataType[]> => {
  const { curlatitude, curlongitude, showsInprocessOnly, pageParam } = data;
  const res = await axiosAuth.get("/report/list", {
    params: {
      curlatitude,
      curlongitude,
      lastlatitude: pageParam?.lastlatitude || curlatitude,
      lastlongitude: pageParam?.lastlongitude || curlongitude,
      showsInProcessOnly: showsInprocessOnly,
      size: 10,
    },
  });
  return res.data;
};

const useGetReportListQuery = (params: ReportParamsType) => {
  const {
    data: reportListData,
    fetchNextPage: reportListFetchNextPage,
    hasNextPage: reportHasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reports"],
    initialPageParam: {
      lastlatitude: params.curlatitude,
      lastlongitude: params.curlongitude,
    },
    queryFn: ({
      pageParam = {
        lastlatitude: params.curlatitude,
        lastlongitude: params.curlongitude,
      },
    }) => fetchAPI({ ...params, pageParam }),
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
  };
};

export default useGetReportListQuery;
