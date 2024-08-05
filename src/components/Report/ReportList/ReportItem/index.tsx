import { Link } from "react-router-dom";

interface ReportItemType {
  key: number;
  title: string;
  petName: string;
  species: string;
  roadAddress: string;
  reportId: number;
  reportStatus: string;
  imageUrl: string;
}
const ReportItem = (data: ReportItemType) => {
  return (
    <div className="flex justify-between mb-3">
      <img
        src={`${data.imageUrl}`}
        className="w-28 h-28 object-cover rounded-lg"
      ></img>
      <div className="flex flex-col justify-around flex-1 mx-3">
        <div className="font-semibold text-lg">
          <Link to={`/report/${data.reportId}`}>{data.title}</Link>
        </div>

        <div className="text-sm text-gray-600">
          <p>{`이름: ${data.petName}`}</p>
          <p>{`종: ${data.species}`}</p>
          <p>{`실종지역: ${data.roadAddress}`}</p>
        </div>
      </div>
      <div className="mt-2 w-20 text-center">
        {data.reportStatus === "PUBLISHED" ? (
          <span className="bg-yellow-200 rounded-xl px-2 py-1 mx-2">
            진행중
          </span>
        ) : (
          <span className="bg-gray-200 rounded-xl px-2 py-1 mx-2">완료</span>
        )}
      </div>
    </div>
  );
};

export default ReportItem;
