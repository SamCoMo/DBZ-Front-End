import { rest } from "msw";

export const postReport = rest.post("/report", async (_, res, ctx) =>
  res(ctx.status(200), ctx.json({ isScheduleRequest: true }))
);
