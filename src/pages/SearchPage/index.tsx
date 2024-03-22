import HeaderTitle from '@/components/common/HeaderTitle';
import SearchBar from '@/components/common/Search/SearchHeader';


const SearchPage = () => {
  return (
    <div>
      <HeaderTitle title='검색' />
      <SearchBar object='' showsInProgressOnly />
      
    </div>
  );
};

export default SearchPage;