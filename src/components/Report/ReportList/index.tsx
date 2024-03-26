import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import SkeletonReportList from "@/components/common/Skeleton/SkeletonReportList";
import { InfiniteData } from "@tanstack/react-query";
import { ReportListDataType } from "@/types/Report/ReportDataType";

type ReportListProps = {
  latitude: number;
  longitude: number;
  InProcessOnly: boolean;
  lists: InfiniteData<ReportListDataType[], unknown>;
  
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
  }, [props.latitude, props.longitude, props.InProcessOnly, props.lists]);

  if (reportListIsFetching) return <SkeletonReportList />;

  return (
    <>
      {reportListData?.pages[0].content.map((list) => (
        <ReportItem
          key={list.reportId}
          imageUrl={list.imageUrl}
          roadAddress={list.roadAddress}
          species={list.species}
          reportId={list.reportId}
          title={list.title}
          petName={list.petName}
          reportStatus={list.reportStatus}
        ></ReportItem>
      ))}
      {bottomDiv()}
    </>
  );
};

export default ReportList;
