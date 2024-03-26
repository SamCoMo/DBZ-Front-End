import { axiosAccess } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";

const fetchAPI = async (formData: FormData) => {
  const res = await axiosAccess.patch("/member/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const usePutProfileImgEditQuery = () => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useToast();

  const { data: profileImgEditData, mutate: profileImgEditMutate } =
    useMutation({
      mutationKey: ["profileImgEdit"],
      mutationFn: (formData: FormData) => fetchAPI(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        toastSuccess("프로필이 성공적으로 변경되었습니다!");
      },
    });

  return { profileImgEditData, profileImgEditMutate };
};

export default usePutProfileImgEditQuery;
