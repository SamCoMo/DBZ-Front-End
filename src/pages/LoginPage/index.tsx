import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { messaging } from "@/firebase/firebaseConfig";
import useLoginQuery from "@/hooks/query/useLoginQuery";
import useInput from "@/hooks/useInput";
import useLocationState from "@/hooks/useLocationState";
import { getToken } from "firebase/messaging";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const { updateLocation } = useLocationState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      updateLocation({ latitude, longitude });
    });
  }, []);

  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");
  const [fcmToken, setFcmToken] = useState<string>("");
  const [allCheck, setAllCheck] = useState<boolean>(false);

  const { loginMutate, loginError } = useLoginQuery();

  async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY,
      }).then((token) => setFcmToken(token));
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password, token: fcmToken });
  };

  useEffect(() => {
    if (email && password && fcmToken) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [email, password, fcmToken]);

  return (
    <>
      <HeaderTitle title="" back={true} />
      <Logo width={180} addStyle="m-auto" />
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
        {loginError && (
          <p className="mt-2 text-sm text-red-500">
            이메일 혹은 비밀번호가 올바르지 않습니다.
          </p>
        )}
      </form>
    </>
  );
};

export default LoginPage;
