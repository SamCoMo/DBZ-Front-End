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
