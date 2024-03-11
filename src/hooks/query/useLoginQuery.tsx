import { axiosDefault } from "@/apis";
import { LoginDataType, LoginResponseType } from "@/types/auth/LoginDataType";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserState from "../useUserState";

const memberLogin = async (data: LoginDataType): Promise<LoginResponseType> => {
  const { email, password } = data;
  return await axiosDefault.post("/member/login", { email, password });
};

const useLoginQuery = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserState();

  const {
    data: loginData,
    mutate: loginMutate,
    isPending: loginPending,
    isError: loginError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: LoginDataType) =>
      memberLogin({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("Access-Token", data.headers["access-token"]);
      updateUser({
        ...data.userInfo,
        isLogin: true,
      });
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return { loginData, loginMutate, loginPending, loginError };
};

export default useLoginQuery;
