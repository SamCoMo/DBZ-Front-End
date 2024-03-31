import { axiosAccess, axiosDefault } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import useUserState from "../useUserState";
import { useNavigate } from "react-router-dom";

const fetchAPI = async () => {
  const res = await axiosDefault.get("/oauth2/authorization/google");

  return res.data;
};

const useGetGoogleLoginQuery = () => {
  const { updateUser } = useUserState();
  const navigate = useNavigate();

  const {
    data: GoogleLoginData,
    mutate: GoogleLoginMutate,
    isPending: GoogleLoginIsPending,
    isError: GoogleLoginIsError,
  } = useMutation({
    mutationKey: ["kakaoLogin"],
    mutationFn: () => fetchAPI(),
    onSuccess: async (data) => {
      localStorage.setItem("Access-Token", data.headers["access-token"]);
      const userInfo = await axiosAccess
        .get("/member/my")
        .then((res) => res.data);
      updateUser({
        ...userInfo,
        isLogin: true,
      });
      navigate("/home", { replace: true });
    },
    onError: (error) => console.log(error),
  });

  return {
    GoogleLoginData,
    GoogleLoginMutate,
    GoogleLoginIsPending,
    GoogleLoginIsError,
  };
};

export default useGetGoogleLoginQuery;
