import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface ReportListProps {
  curlatitude: number | null;
  curlongitude: number | null;
  lastlatitude?: number | null;
  lastlongitude?: number | null;
  InProcessOnly: boolean;
}

const ReportList = (props: ReportListProps) => {
  const param = {
    curlatitude: props.curlatitude,
    curlongitude: props.curlongitude,
    lastlatitude: props.lastlatitude || props.curlatitude,
    lastlongitude: props.lastlongitude || props.curlongitude,
    showsInprocessOnly: props.InProcessOnly,
  };

  const { reportListData, reportListFetchNextPage, reportHasNextPage } =
    useGetReportListQuery(param);

  const { bottomDiv } = useInfiniteScroll(
    reportListFetchNextPage,
    reportHasNextPage
  );

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
