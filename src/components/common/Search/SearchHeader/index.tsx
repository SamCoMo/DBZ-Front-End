import React, { useState } from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import useInput from '@/hooks/useInput';

interface SearchProps {
  object:string;
  showsInProgressOnly:boolean;

}

const SearchBar = ({ object, showsInProgressOnly }: SearchProps) => {
  const navigate = useNavigate();
  const [searchObject, handleChangeSearchObject] = useInput(object || '');
  const [showsInProgress, handleChangeShowsInProgress] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?showsInProgressOnly=${showsInProgressOnly}&object=${object}`);
  };

  const handleBack = (back: boolean | null) => {
    if (back) {
      navigate(-1);
    }
    if (!searchObject) return;
    if (searchObject) navigate('/search');
  };
  

  return (
    <form
      className="flex items-center -ml-5 -mt-12 relative"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="relative h-10 w-12 flex justify-center items-center pl-2"
        onClick={() => handleBack(true)}
      >
        <span className="sr-only">뒤로가기</span>
        <BsChevronLeft className="text-2xl " />
      </button>
      <button type="button" onClick={() => handleBack} className="w-full">
        <span className="sr-only">검색창으로 이동</span>
        <Input
          type="text"
          value={searchObject}
          addStyle="pr-5"
          placeholder="검색어를 입력해주세요"
          handleChangeInput={(e) => handleChangeSearchObject(e.target.value)}
        />
      </button>
      <button
        type="submit"
        className="h-9 w-12 flex justify-center items-center bg-gray2 absolute right-0 top-1/2 -translate-y-1/2 rounded-r-xl"
      >
        {' '}
        <span className="sr-only">검색하기</span>{' '}
        <BsSearch className="text-2xl text-defaultColor"/>
      </button>
    </form>
  );
};

export default SearchBar;