import { userAtom } from "@/recoil/atoms/user/atom";
import { UserDataType } from "@/types/auth/UserDataType";
import { useRecoilState, useResetRecoilState } from "recoil";

const useUserState = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const userReset = useResetRecoilState(userAtom);

  const updateUser = (userInfo: UserDataType) => {
    setUserState({
      ...userInfo,
    });
  };

  return {
    userState,
    setUserState,
    updateUser,
    userReset,
  };
};

export default useUserState;
