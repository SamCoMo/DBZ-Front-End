import { axiosAccess } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ReportPinDataType, ReportPinRequestDataType } from "@/types/Report/ReportDataType";
import { useNavigate } from "react-router-dom";

const fetchAPI = async (
  data: ReportPinRequestDataType
): Promise<ReportPinDataType> => {
  const response = await axiosAccess.post(`/pin?reportId=${data.reportId}`, data.pinData);
  return response.data;
};

const usePostReportPinQuery = () => {
  const { toastSuccess } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: pinId,
    mutate: pinIsMutate,
    isError: pinIsError,
    isSuccess: pinIsSuccess,
  } = useMutation({
      mutationKey: ['reportPin'],
      mutationFn: (data: ReportPinRequestDataType) => fetchAPI(data),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["pinList"] });
      toastSuccess("핀 게시물이 등록되었습니다.");
      navigate(-1)

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
