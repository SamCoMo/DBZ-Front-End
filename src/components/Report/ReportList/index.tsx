import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import SkeletonReportList from "@/components/common/Skeleton/SkeletonReportList";

type ReportListProps = {
  latitude: number | null;
  longitude: number | null;
  InProcessOnly: boolean;
};

const ReportList = (props: ReportListProps) => {
  const param = {
    curLatitude: props.latitude,
    curLongitude: props.longitude,
    lastLatitude: props.latitude,
    lastLongitude: props.longitude,
    InProcessOnly: props.InProcessOnly,
  };

  const {
    reportListData,
    reportListFetchNextPage,
    reportHasNextPage,
    reportListRefetch,
    reportListIsFetching,
  } = useGetReportListQuery(param);

  const { bottomDiv } = useInfiniteScroll(
    reportListFetchNextPage,
    reportHasNextPage
  );

  useEffect(() => {
    reportListRefetch();
  }, [props.latitude, props.longitude, props.InProcessOnly]);

  // if (reportListIsFetching) return <SkeletonReportList />;

  return (
    <>
      {reportListData?.pages.map((page) =>
        page.content.map((item) => (
          <ReportItem
            key={item.reportId}
            imageUrl={item.imageUrl}
            roadAddress={item.roadAddress}
            species={item.species}
            reportId={item.reportId}
            title={item.title}
            petName={item.petName}
            reportStatus={item.reportStatus}
          ></ReportItem>
        ))
      )}
      {bottomDiv()}
    </>
  );
};

export default ReportList;
