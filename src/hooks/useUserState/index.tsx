import { userAtom } from "@/recoil/atoms/user/atom";
import { UserDataType } from "@/types/auth/UserDataType";
import { useRecoilState } from "recoil";

const useUserState = () => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const updateUser = (userInfo: UserDataType) => {
    setUserState({
      ...userInfo,
    });
  };

  return {
    userState,
    setUserState,
    updateUser,
  };
};

export default useUserState;
