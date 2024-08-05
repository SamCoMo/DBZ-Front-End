import { axiosAccess } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import useToast from "../useToast";

type UpdateLocationType = {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
};

const fetchAPI = async (data: UpdateLocationType) => {
  const { address, latitude, longitude } = data;
  const res = await axiosAccess.patch("/member/location", {
    address,
    latitude,
    longitude,
  });
  return res.data;
};

const usePatchLocationQuery = () => {
  const { toastSuccess } = useToast();

  const { mutate: PatchLocationMutate } = useMutation({
    mutationKey: ["patchLocation"],
    mutationFn: ({ address, latitude, longitude }: UpdateLocationType) =>
      fetchAPI({ address, latitude, longitude }),
    onSuccess: () => {
      toastSuccess("사용자의 위치가 업데이트 되었습니다!");
    },
  });

  return {
    PatchLocationMutate,
  };
};

export default usePatchLocationQuery;
