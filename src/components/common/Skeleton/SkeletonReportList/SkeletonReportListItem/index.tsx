const SkeletonReportListItem = () => {
  return (
    <>
      <div className="animate-pulse flex justify-between mb-3">
        <div className="w-28 h-28 rounded-lg bg-slate-200"></div>
        <div className="flex flex-col justify-around flex-1 mx-3">
          <div className="w-48 h-6 bg-slate-200 rounded-lg"></div>
          <div>
            <div className="w-28 h-3 bg-slate-200 rounded-lg mb-1"></div>
            <div className="w-28 h-3 bg-slate-200 rounded-lg mb-1"></div>
            <div className="w-28 h-3 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
        <div className="mt-2 w-20 h-7 text-center bg-slate-200 rounded-xl"></div>
      </div>
    </>
  );
};

export default SkeletonReportListItem;
