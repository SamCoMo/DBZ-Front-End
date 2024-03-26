import ReportList from '@/components/Report/ReportList';
import SkeletonReportListItem from '../../Skeleton/SkeletonReportList/SkeletonReportListItem';
import useGetSearchReportListQuery from '@/hooks/query/useGetSearchResultQuery';
import ReportItem from '@/components/Report/ReportList/ReportItem';

interface SearchResultListProps {
  searchObject?: string;
}

const SearchResultList = ({ searchObject }: SearchResultListProps) => {
  const { searchReportListData } = useGetSearchReportListQuery({ object: searchObject });
console.log(searchReportListData);
  return (
    <section>
    <>
      {searchReportListData?.pages[0].content.map((list) => (
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
    </>
    </section>
  );
};

export default SearchResultList;