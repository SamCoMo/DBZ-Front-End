import { axiosAuth } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ReportDataType } from "@/types/Report/ReportDataType";

const fetchAPI = async (data: ReportDataType): Promise<ReportDataType> => {
  const res = await axiosAuth.post("/report", data);
  return res.data;
};

const usePostCreateReportQuery = () => {
  const { toastSuccess } = useToast();
  const queryClient = useQueryClient();
  const {
    data: reportId,
    mutate: reportIsMutate,
    isError: reportIsError,
    isSuccess: reportIsSuccess,
  } = useMutation({
    mutationKey: ["report"],
    mutationFn: (data: ReportDataType) => fetchAPI(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["report"] });
      toastSuccess("게시글이 등록되었습니다.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    reportId,
    reportIsMutate,
    reportIsError,
    reportIsSuccess,
  };
};

export default usePostCreateReportQuery;
