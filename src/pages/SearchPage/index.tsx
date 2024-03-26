import ReportList from '@/components/Report/ReportList';
import HeaderTitle from '@/components/common/HeaderTitle';
import SearchBar from '@/components/common/Search/SearchHeader';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const SearchPage = () => {
  const [inProcessOnly, setInProcessOnly] = useState<boolean>(false);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProcessOnly(e.target.checked);
  };
  return (
    <div>
      <HeaderTitle title='검색' />
      <SearchBar searchObject={''} />
      <div className="flex items-center">
            <p className="flex ml-auto mr-1 mt-2">진행중만 보기</p>
            <input
              type="checkbox"
              onChange={handleCheckChange}
              className="checkbox checkbox-sm checked:border-defaultColor [--chkbg:theme(colors.defaultColor)] [--chkfg:gray]"
            />
          </div>
          <div className="mt-32 mb-14">

      </div>
      <Outlet />
    </div>
  );
};

export default SearchPage;