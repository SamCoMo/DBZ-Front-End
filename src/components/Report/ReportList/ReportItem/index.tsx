const ReportItem = () => {
  return (
    <div className="flex justify-between mb-3">
      <img
        src="https://e1.pxfuel.com/desktop-wallpaper/210/265/desktop-wallpaper-cute-kitten-i-love-kittens.jpg"
        className="w-28 h-28 object-cover rounded-lg"
      ></img>
      <div className="flex flex-col justify-around flex-1 mx-3">
        <div className="font-semibold text-lg">저희 먼지를 찾아주세요</div>
        <div className="text-sm text-gray-600">
          <p>이름: 먼지</p>
          <p>종: 코리안 숏헤어</p>
          <p>실종지역: 동탄 한림대병원 부근</p>
        </div>
      </div>
      <div className="mt-2">
        <span className="bg-yellow-200 rounded-xl px-2 py-1 mx-2">진행중</span>
      </div>
    </div>
  );
};

export default ReportItem;
