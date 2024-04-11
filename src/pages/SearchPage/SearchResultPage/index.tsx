import { useSearchParams } from "react-router-dom";
import SearchList from "@/components/common/Search/SearchList";

const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const object = searchParams.get("object");
  const InProgressOnly = searchParams.get("showsInProgressOnly");
  const page = Number(searchParams.get("page"));

  let booleanValue = InProgressOnly === "true";

  return (
    <>
      <div className="mt-4 mb-16">
        <SearchList object={object} InProcessOnly={booleanValue} page={page} />
      </div>
    </>
  );
};

export default SearchResultPage;
