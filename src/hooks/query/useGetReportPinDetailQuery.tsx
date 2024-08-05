import { useQuery } from "@tanstack/react-query";
import { axiosAccess } from "@/apis";
import { ReportPinDataType } from "@/types/Report/ReportDataType";

const useGetReportPinDetailQuery = (reportId: number, pinId: number) => {
  const fetchAPI = async (): Promise<ReportPinDataType> => {
    const res = await axiosAccess.get(`/report/pin/${pinId}`);
    return res.data;
  };

  const {
    data: reportPinDetail,
    isLoading: reportPinDetailIsLoading,
    isSuccess: reportPinDetailIsSuccess,
    isError: reportPinDetailIsError,
  } = useQuery<ReportPinDataType, Error>({
    queryKey: ["reportPinDetail", reportId, pinId], // reportId를 쿼리 키에 포함
    queryFn: () => fetchAPI(),
    staleTime: Infinity,
  });

  return {
    reportPinDetail,
    reportPinDetailIsLoading,
    reportPinDetailIsSuccess,
    reportPinDetailIsError,
  };
};

export default useGetReportPinDetailQuery;
