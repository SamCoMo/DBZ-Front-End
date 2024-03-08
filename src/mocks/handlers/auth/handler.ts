import { rest } from "msw";

export const postSignUp = rest.post("/member/register", async (req, res, ctx) =>
  res(ctx.status(200))
);
