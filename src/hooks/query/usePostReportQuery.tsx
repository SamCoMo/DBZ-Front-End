import { axiosAccess, axiosAuth, axiosDefault } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { ReportDataType,ReportDetailIdType, ReportDetailType } from "@/types/Report/ReportDataType";


const fetchAPI = async (data: ReportDetailType): Promise<ReportDetailIdType> => {

  const {title, petName, petType, showsPhone, descriptions, species, roadAddress, latitude,longitude,imageList} = data;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("petType", petType);
  formData.append("showsPhone", showsPhone.toString());
  formData.append("species", species);
  formData.append("petName", petName);
  formData.append("descriptions", descriptions);
  formData.append("roadAddress", roadAddress);
  formData.append("latitude",latitude.toString());
  formData.append("longitude",longitude.toString());
  // formData.append("imageList",imageList[0]);
  imageList.forEach((image, index) => {
    formData.append("imageList", image);
});
  return await axiosAccess.post("/report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
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
    mutationFn: (formdata: ReportDataType) => fetchAPI(formdata),
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
