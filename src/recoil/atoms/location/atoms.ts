import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface LocationAtomType {
  address?: string | null;
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
    address: null,
    latitude: null,
    longitude: null,
  },
  effects_UNSTABLE: [persistAtom],
});
