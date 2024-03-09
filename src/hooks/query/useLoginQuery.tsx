import { instance } from "@/apis";
import { LoginDataType, LoginResponseType } from "@/types/auth/LoginDataType";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchAPI = async (data: LoginDataType): Promise<LoginResponseType> => {
  const { email, password } = data;
  return await instance.post("/member/login", { email, password });
};

const useLoginQuery = () => {
  const navigate = useNavigate();

  const {
    data: loginData,
    mutate: loginMutate,
    isPending: loginPending,
    isError: loginError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: LoginDataType) =>
      fetchAPI({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("Access-Token", data.headers["access-token"]);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return { loginData, loginMutate, loginPending, loginError };
};

export default useLoginQuery;
