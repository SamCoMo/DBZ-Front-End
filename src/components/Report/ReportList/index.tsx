import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import useLocationState from "@/hooks/useLocationState";

export interface ReportListProps {
  curlatitude: number | null;
  curlongitude: number | null;
  lastlatitude?: number | null;
  lastlongitude?: number | null;
  InProcessOnly: boolean;
}

const ReportList = (props: ReportListProps) => {
  const { locationState } = useLocationState();
  const param = {
    curlatitude: props.curlatitude,
    curlongitude: props.curlongitude,
    lastlatitude: props.lastlatitude || props.curlatitude,
    lastlongitude: props.lastlongitude || props.curlongitude,
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
    reportListRefetch();
  }, [locationState, props.InProcessOnly]);

  return (
    <>
      {reportListData?.pages.map((page) =>
        page.map((list) => (
          <ReportItem
            key={list.reportId}
            reportId={list.reportId}
            title={list.title}
            petName={list.petName}
            reportStatus={list.reportStatus}
          ></ReportItem>
        ))
      )}
      {bottomDiv()}
    </>
  );
};

export default ReportList;
