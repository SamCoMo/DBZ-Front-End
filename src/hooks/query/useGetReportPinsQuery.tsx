import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/apis";
import { ReportDataType } from "@/types/Report/ReportDataType";

const fetchAPI = async (reportId: number): Promise<ReportDataType> => {
  const res = await axiosAuth.get(`/report/${reportId}/pin-list`);
  const data = res.data;
  data.isMapAvailable = true;
  return res.data;
};

const useGetReportPinListQuery = (reportId: number) => {
  const {
    data: reportPinList,
    isLoading: reportPinListIsLoading,
    isSuccess: reportPinListIsSuccess,
    isError: reportPinListIsError,
  } = useQuery({
    queryKey: ["reportPinList", reportId], // reportId를 쿼리 키에 포함
    queryFn: () => fetchAPI(reportId),
    staleTime: Infinity,
  });

  return {
    reportPinList,
    reportPinListIsLoading,
    reportPinListIsSuccess,
    reportPinListIsError,
  };
};

export default useGetReportPinListQuery;
