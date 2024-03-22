import { Link } from "react-router-dom";

interface ReportItemType {
  key: number;
  title: string;
  petName: string;
  reportId: number;
  reportStatus: string;
}
const ReportItem = (data: ReportItemType) => {
  return (
    <div className="flex justify-between mb-3">
      <img
        src="https://e1.pxfuel.com/desktop-wallpaper/210/265/desktop-wallpaper-cute-kitten-i-love-kittens.jpg"
        className="w-28 h-28 object-cover rounded-lg"
      ></img>
      <div className="flex flex-col justify-around flex-1 mx-3">
        <div className="font-semibold text-lg">
          <Link to={`/report/${data.reportId}`}>{data.title}</Link>
        </div>

        <div className="text-sm text-gray-600">
          <p>{`이름: ${data.petName}`}</p>
          <p>종: 코리안 숏헤어</p>
          <p>실종지역: 동탄 한림대병원 부근</p>
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
