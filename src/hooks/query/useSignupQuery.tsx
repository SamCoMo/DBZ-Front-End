import { axiosDefault } from "@/apis";
import { SignupDataType } from "@/types/auth/SignupDataType";
import { useMutation } from "@tanstack/react-query";
import useToast from "../useToast";
import { useNavigate } from "react-router-dom";

const memberRegister = async (data: SignupDataType) => {
  const { email, nickname, phone, password } = data;
  const res = await axiosDefault.post("/member/register", {
    email,
    nickname,
    phone,
    password,
  });

  return res.data;
};

const useSignupQuery = () => {
  const { toastSuccess } = useToast();
  const navigate = useNavigate();

  const { mutate: signUpMutate, isSuccess: signUpIsSuccess } = useMutation({
    mutationKey: ["join"],
    mutationFn: ({ email, nickname, phone, password }: SignupDataType) =>
      memberRegister({ email, nickname, phone, password }),
    onSuccess: () => {
      toastSuccess("회원가입이 완료되었습니다.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  return {
    signUpMutate,
    signUpIsSuccess,
  };
};

export default useSignupQuery;
