import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/apis";
import { ReportDetailType } from "@/types/Report/ReportDataType";


const fetchAPI = async (reportId: number): Promise<ReportDetailType> => {
  const res = await axiosAuth.get(`/reports/${reportId}`);
  return res.data;
};

const useGetReportDetailQuery = (reportId: number) => {
  const {
    data: reportDetail,
    isLoading: reportDetailIsLoading,
    isSuccess: reportDetailIsSuccess,
    isError: reportDetailIsError,
  } = useQuery({
    queryKey: ["reportDetail", reportId], // reportId를 쿼리 키에 포함
    queryFn: () => fetchAPI(reportId),
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
