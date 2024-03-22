import { rest } from "msw";
import { reportList } from "../../data";

export const getReport = rest.get("/report/list", async (req, res, ctx) => {
  const size = Number(req.url.searchParams.get("size")) || 10;
  const latitude = Number(req.url.searchParams.get("lastlatitude")) || 1;
  const longitude = Number(req.url.searchParams.get("lastlongitude")) || 1;
  const showsInProcessOnly = req.url.searchParams.get("showsInProcessOnly");

  const currentIndex = reportList.findIndex(
    (report) => report.latitude === latitude && report.longitude === longitude
  );

  let startIndex = 0;
  if (currentIndex !== 0) {
    startIndex = currentIndex + 1;
  }
  const newReportList = reportList.slice(startIndex, startIndex + size);
  if (showsInProcessOnly === "true") {
    const filterList = newReportList.filter(
      (report) => report.reportStatus === "PUBLISHED"
    );
    return res(ctx.status(200), ctx.json(filterList));
  } else {
    return res(ctx.status(200), ctx.json(newReportList));
  }
});

export const postReport = rest.post("/report", async (_, res, ctx) =>
  res(ctx.status(200), ctx.json({ isReportRequest: true }))
);
export const patchMyReport = rest.patch(
  "/reports/:reportId",
  async (_, res, ctx) => res(ctx.status(200), ctx.json({ reportId: true }))
);
export const getReportDetail = rest.get(
  "/reports/:reportId",
  async (req, res, ctx) => {
    const { reportId } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        reportId: reportId,
        memberId: 1,
        title: "바둑이를 찾아주세요..!",
        petName: "바둑이",
        petType: "DOG",
        species: "시바견",
        descriptions: "오른쪽 귀에 갈색 털이 있어요.",
        streetAddress: "서울특별시 중구 소공동 세종대로18길 2",
        roadAddress: "서울 용산구 한강대로 405",
        latitude: 37.555946,
        longitude: 126.972317,
        phone: "010-134-5678",
        showsPhone: true,
        views: 1,
        reportStatus: "PUBLISHED",
        createdAt: "2024-03-13T15:55:28",
        updatedAt: "2024-03-13T15:56:02",
        imageList: [
          {
            url: "https://samcomo.s3.ap-northeast-2.amazonaws.com/report-ed132365-39e5-4c60-bf1e-2f876de85eebimage1.jpg",
            id: 1,
          },
          {
            url: "https://samcomo.s3.ap-northeast-2.amazonaws.com/report-4bf065ee-7281-4258-befb-a8e817750a62image.2.jpg",
            id: 2,
          },
        ],
        writer: true,
      })
    );
  }
);
export const deleteReport = rest.delete(
  "/reports/:reportId",
  (req, res, ctx) => {
    const { reportId } = req.params;
    if (reportId) {
      return res(
        ctx.status(200),
        ctx.json({
          isReportDelete: true
        })
      );
    }
    return res(
      ctx.json({
        errorMessage: '해당 게시물이 없습니다.'
      })
    );
  }
);
//핀 파트

export const postPin = rest.post("/reports/pin", async (_, res, ctx) =>
res(ctx.status(200), ctx.json({ isReportRequest: true }))
);
