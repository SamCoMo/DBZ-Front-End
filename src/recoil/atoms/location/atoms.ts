import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface LocationAtomType {
  latitude: number | null;
  longitude: number | null;
}

const { persistAtom } = recoilPersist({
  key: "locationInfo",
  storage: localStorage,
});

export const locationAtom = atom<LocationAtomType>({
  key: "locationAtom",
  default: {
    latitude: null,
    longitude: null,
  },
  effects_UNSTABLE: [persistAtom],
});
