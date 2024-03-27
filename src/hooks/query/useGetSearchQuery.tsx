import { axiosAccess } from "@/apis";

import {
  ReportListDataType,
  ReportListProps,
} from "@/types/Report/ReportDataType";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface SearchProps {
  object: string | undefined;
  InProcessOnly: boolean;
  page: number;
}

const fetchAPI = async (data: SearchProps): Promise<ReportListDataType> => {
  const { object, InProcessOnly, page } = data;
  const res = await axiosAccess.get("/report/search", {
    params: {
      object: object,
      showsInProgressOnly: InProcessOnly,
      page: page,
      size: 10,
    },
  });
  return res.data;
};

const useGetSearchQuery = (params: SearchProps) => {
  const {
    data: searchReportListData,
    hasNextPage: searchReportListHasNextPage,
    fetchNextPage: searchReportListFetchNextPage,
    refetch: searchReportListRefetch,
    isLoading: searchReportListIsLoading,
    isFetching: searchReportListIsFetching,
  } = useInfiniteQuery({
    queryKey: ["searchReports", params.object],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchAPI({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = allPage.length;
      return lastPage.last ? undefined : nextPage;
    },
    enabled: false,
  });

  return {
    searchReportListData,
    searchReportListHasNextPage,
    searchReportListFetchNextPage,
    searchReportListRefetch,
    searchReportListIsLoading,
    searchReportListIsFetching,
  };
};

export default useGetSearchQuery;
