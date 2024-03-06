import { SignupDataType } from "@/types/auth/SignupDataType";
import { useMutation } from "@tanstack/react-query";

const fetchAPI = async (data: SignupDataType) => {
  const { email, nickname, phone, password } = data;
  const res = await fetch("/member/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      nickname: nickname,
      phone: phone,
      password: password,
    }),
  }).then((res) => res.json());

  return res;
};

const useSignupQuery = () => {
  const { mutate: signUpMutate } = useMutation({
    mutationKey: ["join"],
    mutationFn: ({ email, nickname, phone, password }: SignupDataType) =>
      fetchAPI({ email, nickname, phone, password }),
  });

  return {
    signUpMutate,
  };
};

export default useSignupQuery;
