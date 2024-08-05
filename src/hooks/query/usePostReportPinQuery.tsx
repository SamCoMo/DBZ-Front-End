import { axiosAccess } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ReportPinDataType, ReportPinRequestDataType } from "@/types/Report/ReportDataType";
import { useNavigate } from "react-router-dom";

const fetchAPI = async (
  reportId:number,
  data: ReportPinDataType
): Promise<ReportPinRequestDataType> => {
  const { address, description, latitude,longitude, multipartFileList, foundAt } = data;

  const formData = new FormData();
  // formData.append("reportId", reportId); // reportId 추가
  formData.append("address", address);
  formData.append("latitude",latitude.toString());
  formData.append("description", description);
  formData.append("longitude",longitude.toString());
  formData.append("foundAt", foundAt); 
  formData.append("multipartFileList", multipartFileList[0]);
//   multipartFileList.forEach((image, index) => {
//     formData.append("multipartFileList", image);
// });
return await axiosAccess.post(`/report/pin?reportId=${reportId}`, formData, {
  params:{
    reportId:reportId,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
})
};

const usePostReportPinQuery = (reportId:number) => {
  const { toastSuccess } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: pinId,
    mutate: pinIsMutate,
    isError: pinIsError,
    isSuccess: pinIsSuccess,
  } = useMutation({
      mutationKey: ['reportPin', reportId],
      mutationFn: (formdata: ReportPinDataType) => fetchAPI(reportId, formdata),
    onSuccess: () => {
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
