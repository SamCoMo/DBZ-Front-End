import { rest } from "msw";

export const postSignUp = rest.post("/member/register", async (req, res, ctx) =>
  res(ctx.status(200))
);

export const postLogin = rest.post("/member/login", async (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.set({
      "Access-Token": "tokenString",
      "Set-Cookie": "Refresh-Token=tokenString",
    })
  );
});
