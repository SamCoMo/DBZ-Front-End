import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/common/Search/SearchHeader';
import SearchResultList from '@/components/common/Search/SearchResult';
import DataNull from '@/components/common/DataNull';

const SearchResultPage = () => {
  const [query] = useSearchParams();
  const searchObject = query.get('searchObject');

  return (
    <>
      <SearchBar searchObject={searchObject || ''} />
      {searchObject ? (
        <SearchResultList searchObject={searchObject} />
      ) : (
        <DataNull text="검색결과가 없습니다." />
      )}
    </>
  );
};
export default SearchResultPage;