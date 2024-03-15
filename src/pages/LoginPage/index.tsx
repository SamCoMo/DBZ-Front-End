import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import useLoginQuery from "@/hooks/query/useLoginQuery";
import useInput from "@/hooks/useInput";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");
  const [allCheck, setAllCheck] = useState<boolean>(false);

  const { loginMutate, loginError } = useLoginQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password });
  };

  useEffect(() => {
    if (email && password) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [email, password]);

  return (
    <>
      <HeaderTitle title="" back={true} />
      <Logo width={180} />
      <form className="mt-6" onSubmit={handleSubmit}>
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
        <WideButton text="시작하기" status={allCheck} />
      </form>
    </>
  );
};

export default LoginPage;
