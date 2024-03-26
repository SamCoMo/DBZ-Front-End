import { UserDataType } from "@/types/auth/UserDataType";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: localStorage,
});

export const userAtom = atom<UserDataType>({
  key: "userAtom",
  default: {
    memberId: 0,
    email: "",
    nickname: "",
    phone: "",
    profileImageUrl: "",
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
