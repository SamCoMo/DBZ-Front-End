import Input from "@/components/common/Input";
import useInput from "@/hooks/useInput";
import React from "react";

const LoginPage = () => {
  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
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
      <button>로그인</button>
    </form>
  );
};

export default LoginPage;
