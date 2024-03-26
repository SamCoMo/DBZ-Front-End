import useGetReportListQuery from '@/hooks/query/useGetReportListQuery';
import ReportList from '@/components/Report/ReportList';
import SkeletonReportListItem from '../../Skeleton/SkeletonReportList/SkeletonReportListItem';

interface SearchResultListProps {
  searchObject?: string;
}

const SearchResultList = ({ searchObject }: SearchResultListProps) => {
  const {
    reportListData,
    reportListFetchNextPage,
    reportHasNextPage,
    reportListIsLoading
  } = useGetReportListQuery({ object: searchObject });
  if (reportListIsLoading)
    return (
      <div className="pt-7">
        <SkeletonReportListItem />
      </div>
    );
  return (
    <section>
      {reportListData && (
        <ReportList
          lists={reportListData}
        />
      )}
    </section>
  );
};

export default SearchResultList;