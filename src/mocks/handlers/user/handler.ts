import { rest } from "msw";

export const putProfileImg = rest.put(
  "/member/profile-image",
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
      })
    );
  }
);

export const patchLocation = rest.patch(
  "/member/location",
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
      })
    );
  }
);

export const getKaKaoAPI = rest.get(
  "https://dapi.kakao.com/v2/local/geo/coord2address.json",
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        meta: {
          total_count: 1,
        },
        documents: [
          {
            road_address: {
              address_name: "경기도 안성시 죽산면 죽산초교길 69-4",
              region_1depth_name: "경기",
              region_2depth_name: "안성시",
              region_3depth_name: "죽산면",
              road_name: "죽산초교길",
              underground_yn: "N",
              main_building_no: "69",
              sub_building_no: "4",
              building_name: "무지개아파트",
              zone_no: "17519",
            },
            address: {
              address_name: "경기 안성시 죽산면 죽산리 343-1",
              region_1depth_name: "경기",
              region_2depth_name: "안성시",
              region_3depth_name: "죽산면 죽산리",
              mountain_yn: "N",
              main_address_no: "343",
              sub_address_no: "1",
            },
          },
        ],
      })
    );
  }
);
