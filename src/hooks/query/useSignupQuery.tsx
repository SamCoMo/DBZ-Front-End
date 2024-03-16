import { axiosDefault } from "@/apis";
import { SignupDataType } from "@/types/auth/SignupDataType";
import { useMutation } from "@tanstack/react-query";

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
  const { mutate: signUpMutate } = useMutation({
    mutationKey: ["join"],
    mutationFn: ({ email, nickname, phone, password }: SignupDataType) =>
      memberRegister({ email, nickname, phone, password }),
  });

  return {
    signUpMutate,
  };
};

export default useSignupQuery;
