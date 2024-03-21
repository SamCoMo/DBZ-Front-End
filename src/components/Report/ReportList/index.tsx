import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import SkeletonReportList from "@/components/common/Skeleton/SkeletonReportList";

interface locationType {
  latitude: number | null;
  longitude: number | null;
}
type inProcessOnlyType = {
  InProcessOnly: boolean;
};

const ReportList = (props: inProcessOnlyType) => {
  const [location, setLocation] = useState<locationType>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const pos = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    getLocation();
  }, []);

  const param = {
    curlatitude: location.latitude,
    curlongitude: location.longitude,
    lastlatitude: location.latitude,
    lastlongitude: location.longitude,
    InProcessOnly: props.InProcessOnly,
  };

  const {
    reportListData,
    reportListFetchNextPage,
    reportHasNextPage,
    reportListRefetch,
  } = useGetReportListQuery(param);

  const { bottomDiv } = useInfiniteScroll(
    reportListFetchNextPage,
    reportHasNextPage
  );

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      reportListRefetch();
    }
  }, [location.latitude, location.longitude, props.InProcessOnly]);

  return (
    <>
      {reportListData ? (
        reportListData?.pages.map((page) =>
          page.map((list) => (
            <ReportItem
              key={list.reportId}
              reportId={list.reportId}
              title={list.title}
              petName={list.petName}
              reportStatus={list.reportStatus}
            ></ReportItem>
          ))
        )
      ) : (
        <>
          <SkeletonReportList />
        </>
      )}
      {bottomDiv()}
    </>
  );
};

export default ReportList;
