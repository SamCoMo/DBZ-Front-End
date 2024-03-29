import WideButton from "@/components/common/Button/WideButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import useSignupQuery from "@/hooks/query/useSignupQuery";
import useInput from "@/hooks/useInput";
import useUserState from "@/hooks/useUserState";
import { LocationInitType } from "@/types/auth/SignupDataType";
import { ValidCheckType } from "@/types/auth/ValidCheckType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const { userState } = useUserState();

  useEffect(() => {
    if (userState.isLogin) {
      navigate("/home", { replace: true });
    }
  }, []);

  const [id, , handleChangeId] = useInput("");
  const [domain, setDomain, handleChangeDomain] = useInput("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const [nickname, , handleChangeNickname] = useInput("");
  const [phoneNumber, setPhoneNumber, handleChangePhoneNumber] = useInput("");
  const [password, , handleChangePassword] = useInput("");
  const [confirmPassword, , handleChangeConfirmPassword] = useInput("");

  const LocationInit = {
    latitude: null,
    longitude: null,
    address: null,
  };

  const [location, setLocation] = useState<LocationInitType>(LocationInit);

  const [allCheck, setAllCheck] = useState<boolean>(false);

  const { signUpMutate } = useSignupQuery();

  const CheckInit = {
    status: false,
    msg: "",
  };

  const [emailCheck, setEmailCheck] = useState<ValidCheckType>(CheckInit);
  const [nicknameCheck, setNicknameCheck] = useState<ValidCheckType>(CheckInit);
  const [phoneNumberCheck, setPhoneNumberCheck] =
    useState<ValidCheckType>(CheckInit);
  const [passwordCheck, setPasswordCheck] = useState<ValidCheckType>(CheckInit);
  const [confirmPasswordCheck, setConfirmPasswordCheck] =
    useState<ValidCheckType>(CheckInit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutate({
      email,
      nickname,
      phone: phoneNumber,
      password,
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    });
    navigate("/login", { replace: true });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "type") {
      setDomain(e.target.value);
      setIsDisabled(true);
    } else {
      setDomain("");
      setIsDisabled(false);
    }
  };

  // 아이디@도메인 형식의 이메일로 변환
  useEffect(() => {
    setEmail(`${id}@${domain}`);
  }, [id, domain]);

  // 유효성 검사 정규표현식
  const isValidEmail = (email: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regExp.test(email);
  };

  const isValidPassword = (password: string) => {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(password);
  };

  const isValidNickname = (nickname: string) => {
    const regExp = /^[ㄱ-ㅎ가-힣A-Za-z0-9-_]{2,10}$/;
    return regExp.test(nickname);
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (!email) return;
    if (isValidEmail(email)) {
      setEmailCheck({ status: true, msg: "올바른 형식의 이메일 입니다." });
    } else {
      setEmailCheck({ status: false, msg: "올바르지 않은 이메일 입니다." });
    }
  }, [email]);

  useEffect(() => {
    if (!nickname) return;
    if (isValidNickname(nickname)) {
      setNicknameCheck({ status: true, msg: "올바른 형식의 닉네임 입니다." });
    } else {
      setNicknameCheck({
        status: false,
        msg: "특수문자를 제외한 2-10자로 설정해주세요.",
      });
    }
  }, [nickname]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (!password) return;
    if (isValidPassword(password)) {
      setPasswordCheck({ status: true, msg: "올바른 형식의 비밀번호 입니다." });
    } else {
      setPasswordCheck({
        status: false,
        msg: "올바르지 않은 비밀번호 입니다.",
      });
    }
  }, [password]);

  // 핸드폰번호 유효성 검사
  useEffect(() => {
    if (phoneNumber.length === 10 || phoneNumber.length === 12) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      );
      setPhoneNumberCheck({
        status: true,
        msg: "올바른 형식의 전화번호 입니다.",
      });
    } else if (phoneNumber.length === 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
      setPhoneNumberCheck({
        status: true,
        msg: "올바른 형식의 전화번호 입니다.",
      });
    } else {
      setPhoneNumberCheck({
        status: false,
        msg: "올바르지 않은 전화번호 입니다.",
      });
    }
  }, [phoneNumber]);

  // 비밀번호 확인
  useEffect(() => {
    if (!confirmPassword) return;
    if (confirmPassword === password) {
      setConfirmPasswordCheck({ status: true, msg: "비밀번호가 일치합니다." });
    } else {
      setConfirmPasswordCheck({
        status: false,
        msg: "비밀번호가 일치하지 않습니다.",
      });
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (
      emailCheck.status &&
      nicknameCheck.status &&
      phoneNumberCheck.status &&
      passwordCheck.status &&
      confirmPasswordCheck.status &&
      location.latitude
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [
    emailCheck.status,
    nicknameCheck.status,
    phoneNumberCheck.status,
    passwordCheck.status,
    confirmPasswordCheck.status,
    location.latitude,
  ]);

  function onSuccess(pos: GeolocationPosition) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.documents[0]);
        setLocation({
          address:
            res.data.documents[0].road_address?.address_name ||
            "주소지를 받아오지 못했습니다.",
          latitude: lat,
          longitude: lon,
        });
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return (
    <>
      <HeaderTitle title="회원가입" back={true} />
      <Logo width={180} addStyle="m-auto" />
      <form className="mt-6" onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="flex justify-between items-center">
              <Input
                type="text"
                value={id}
                placeholder="id를 입력해주세요."
                width={"w-40"}
                onChange={handleChangeId}
              />
              @
              <Input
                type="text"
                value={domain}
                placeholder="도메인을 입력해주세요."
                width={"w-45"}
                disabled={isDisabled}
                onChange={handleChangeDomain}
              />
              <select
                className="rounded-lg px-2 bg-gray-200 h-10"
                onChange={handleSelectChange}
              >
                <option value="type">직접 입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="nate.com">nate.com</option>
              </select>
            </div>
            <p
              className={`${emailCheck.status ? "text-green-500" : "text-red-600"}`}
            >
              {(id || domain) && emailCheck.msg}
            </p>
          </div>
          <div className="mt-3">
            <Input
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해주세요."
              onChange={handleChangeNickname}
            />
            <p
              className={`${nicknameCheck.status ? "text-green-500" : "text-red-600"}`}
            >
              {nickname && nicknameCheck.msg}
            </p>
          </div>
          <div className="mt-3">
            <Input
              type="text"
              value={phoneNumber}
              placeholder="핸드폰번호를 입력해주세요."
              onChange={handleChangePhoneNumber}
            />
            <p
              className={`${phoneNumberCheck.status ? "text-green-500" : "text-red-600"}`}
            >
              {phoneNumber && phoneNumberCheck.msg}
            </p>
          </div>
          <div className="mt-3">
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChangePassword}
            />
            <p
              className={`${password ? (passwordCheck.status ? "text-green-500" : "text-red-600") : "text-gray-300"}`}
            >
              {!password
                ? "*영문자+특수문자+숫자를 포함하여 8자 이상 입력해주세요."
                : passwordCheck.msg}
            </p>
          </div>
          <div className="mt-3">
            <Input
              type="password"
              value={confirmPassword}
              placeholder="비밀번호를 다시 한번 입력해주세요."
              onChange={handleChangeConfirmPassword}
            />
            <p
              className={`${confirmPasswordCheck.status ? "text-green-500" : "text-red-600"}`}
            >
              {confirmPassword && confirmPasswordCheck.msg}
            </p>
          </div>
        </div>
        <WideButton text="가입하기" status={allCheck} />
      </form>
    </>
  );
};

export default SignupPage;
