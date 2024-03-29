import { useParams } from "react-router-dom";
import SearchPage from "..";
import SearchList from "@/components/common/Search/SearchList";

const SearchResultPage = () => {
  const { object, InProcessOnly, page } = useParams();

  let booleanValue = InProcessOnly === "false";

  return (
    <>
      <div className="mt-4 mb-16">
        <SearchList object={object} InProcessOnly={booleanValue} page={0} />
      </div>
    </>
  );
};

export default SearchResultPage;
