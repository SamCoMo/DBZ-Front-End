import { LocationAtomType, locationAtom } from "@/recoil/atoms/location/atoms";
import { useRecoilState } from "recoil";

const useLocationState = () => {
  const [locationState, setlocationState] = useRecoilState(locationAtom);

  const updateLocation = (locationInfo: LocationAtomType) => {
    setlocationState({
      ...locationInfo,
    });
  };

  return {
    locationState,
    setlocationState,
    updateLocation,
  };
};

export default useLocationState;
