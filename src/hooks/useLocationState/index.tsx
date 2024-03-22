import { LocationAtomType, locationAtom } from "@/recoil/atoms/location/atoms";
import { useRecoilState, useResetRecoilState } from "recoil";

const useLocationState = () => {
  const [locationState, setlocationState] = useRecoilState(locationAtom);
  const locationReset = useResetRecoilState(locationAtom);

  const updateLocation = (locationInfo: LocationAtomType) => {
    setlocationState({
      ...locationInfo,
    });
  };

  return {
    locationState,
    setlocationState,
    updateLocation,
    locationReset,
  };
};

export default useLocationState;
