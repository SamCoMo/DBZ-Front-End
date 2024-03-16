import { axiosAuth } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fetchAPI = async (formData: FormData) => {
  const res = await axiosAuth.put("/member/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const usePutProfileImgEditQuery = () => {
  const queryClient = useQueryClient();

  const { data: profileImgEditData, mutate: profileImgEditMutate } =
    useMutation({
      mutationKey: ["profileImgEdit"],
      mutationFn: (formData: FormData) => fetchAPI(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
    });

  return { profileImgEditData, profileImgEditMutate };
};

export default usePutProfileImgEditQuery;
