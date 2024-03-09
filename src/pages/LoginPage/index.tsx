import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import useLoginQuery from "@/hooks/query/useLoginQuery";
import useInput from "@/hooks/useInput";
import React from "react";

const LoginPage = () => {
  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");

  const { loginMutate, loginError } = useLoginQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password });
  };

  return (
    <>
      <HeaderTitle title="" back={true} />
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={handleChangeEmail}
          />
        </div>
        <div className="mt-3">
          <Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={handleChangePassword}
          />
        </div>
        <WideButton text="시작하기" />
      </form>
    </>
  );
};

export default LoginPage;
