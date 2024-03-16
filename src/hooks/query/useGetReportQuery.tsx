import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/apis";
import {
  ReportDetailType,
  ReportDetailIdType,
} from "@/types/Report/ReportDataType";
const fetchAPI = async (
  data: ReportDetailIdType
): Promise<ReportDetailType> => {
  const reportId = data;
  const res = await axiosAuth.get(`/reports/${reportId}`);
  return res.data;
};

const useGetReportDetailQuery = (data: ReportDetailIdType) => {
  const {
    data: reportDetail,
    isLoading: reportDetailIsLoading,
    isSuccess: reportDetailIsSuccess,
    isError: reportDetailIsError,
  } = useQuery({
    queryKey: ["reportDetail"],
    queryFn: () => fetchAPI(data),

    staleTime: Infinity,
  });

  return {
    reportDetail,
    reportDetailIsLoading,
    reportDetailIsSuccess,
    reportDetailIsError,
  };
};

export default useGetReportDetailQuery;
