import { axiosAuth } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ReportPinDataType } from "@/types/Report/ReportDataType";

const fetchAPI = async (
  data: ReportPinDataType
): Promise<ReportPinDataType> => {
  const res = await axiosAuth.post(`/reports/pin`, data);
  return res.data;
};

const usePostReportPinQuery = () => {
  const { toastSuccess } = useToast();
  const queryClient = useQueryClient();
  const {
    data: pinId,
    mutate: pinIsMutate,
    isError: pinIsError,
    isSuccess: pinIsSuccess,
  } = useMutation({
    mutationKey: ["reportPin"],
    mutationFn: (data: ReportPinDataType) => fetchAPI(data),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["pinList"] });
      toastSuccess("핀 게사물이 등록되었습니다.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    pinId,
    pinIsMutate,
    pinIsError,
    pinIsSuccess,
  };
};

export default usePostReportPinQuery;
