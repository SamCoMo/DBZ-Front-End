import { axiosAccess } from "@/apis";
import useUserState from "../useUserState";
import { useQuery } from "@tanstack/react-query";

const getUserProfile = async () => {
  const res = await axiosAccess.get("/member/my");
  return res.data;
};

const useUserProfileQuery = () => {
  const { userState } = useUserState();

  const { data: user } = useQuery({
    queryKey: ["userProfile", userState.email],
    queryFn: () => getUserProfile(),
  });

  return {
    user,
  };
};

export default useUserProfileQuery;
