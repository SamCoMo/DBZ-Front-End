import SkeletonReportListItem from "./SkeletonReportListItem";

const SkeletonReportList = () => {
  const skeletonList = Array.from({ length: 10 }, (_, index) => (
    <SkeletonReportListItem key={index} />
  ));
  return (
    <>
      <div>{skeletonList}</div>
    </>
  );
};

export default SkeletonReportList;
