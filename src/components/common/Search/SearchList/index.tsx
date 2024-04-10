import useGetReportListQuery from "@/hooks/query/useGetReportListQuery";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useEffect } from "react";
import SkeletonReportList from "@/components/common/Skeleton/SkeletonReportList";
import useGetSearchQuery from "@/hooks/query/useGetSearchQuery";
import ReportItem from "@/components/Report/ReportList/ReportItem";

type SearchListProps = {
  object: string | null;
  InProcessOnly: boolean;
  page: number;
};

const SearchList = (props: SearchListProps) => {
  const param = {
    object: props.object,
    InProcessOnly: props.InProcessOnly,
    page: props.page,
  };

  const {
    searchReportListData,
    searchReportListHasNextPage,
    searchReportListFetchNextPage,
    searchReportListRefetch,
    searchReportListIsFetching,
  } = useGetSearchQuery(param);

  const { bottomDiv } = useInfiniteScroll(
    searchReportListFetchNextPage,
    searchReportListHasNextPage
  );

  useEffect(() => {
    searchReportListRefetch();
  }, [props.object, props.InProcessOnly]);

  if (searchReportListIsFetching) return <SkeletonReportList />;

  return (
    <>
      {searchReportListData?.pages.map((page) =>
        page.content.map((list) => (
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
        ))
      )}
      {bottomDiv()}
    </>
  );
};

export default SearchList;
