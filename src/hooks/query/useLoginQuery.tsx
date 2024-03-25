import { axiosAccess, axiosDefault } from "@/apis";
import { LoginDataType, LoginResponseType } from "@/types/auth/LoginDataType";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserState from "../useUserState";

const memberLogin = async (data: LoginDataType): Promise<LoginResponseType> => {
  const { email, password, fcmToken } = data;

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);
  formData.append("fcmToken", fcmToken);

  return await axiosDefault.post("/member/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
    mutationFn: ({ email, password, fcmToken }: LoginDataType) =>
      memberLogin({ email, password, fcmToken }),
    onSuccess: (data) => {
      localStorage.setItem("Access-Token", data.headers["access-token"]);
      updateUser({
        ...data.userInfo,
        isLogin: true,
      });
      navigate("/home", { replace: true });
    },
    onError: (error) => console.log(error),
  });

  return { loginData, loginMutate, loginPending, loginError };
};

export default useLoginQuery;
