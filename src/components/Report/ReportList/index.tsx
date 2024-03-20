import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";
import ReportItem from "./ReportItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const ReportList = () => {
  const param = {
    curlatitude: 37.58225,
    curlongitude: 127.00211,
    lastlatitude: 37.58225,
    lastlongitude: 127.00211,
    showsInprocessOnly: true,
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
          ></ReportItem>
        ))
      )}
      {bottomDiv()}
    </>
  );
};

export default ReportList;
