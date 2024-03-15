import { rest } from "msw";

export const postReport = rest.post("/report", async (_, res, ctx) =>
  res(ctx.status(200), ctx.json({ isReportRequest: true }))
);
export const patchMySchedule = rest.patch(
  "/reports/:reportId",
  async (_, res, ctx) => res(ctx.status(200), ctx.json({ reportId: true }))
);
export const getReportDetail = rest.get(
  "/reports/:reportId",

  async (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        reportId: 1,
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
        createdAt: "2024-03-13T15:55:28.905508",
        updatedAt: "2024-03-13T15:56:02.753548",
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
    )
);
