import { rest } from "msw";

export const postSignUp = rest.post("/member/register", async (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      memberId: 1,
      memberInfo: {
        email: "text@gmail.com",
        nickname: "test",
        profileImageUrl: "base url",
        phone: "010-0000-0000",
      },
      status: "ACTIVE",
      role: "MEMBER",
      createdAt: "2024-03-03T00:25:35.196872",
      updatedAt: "2024-03-03T00:25:35.196893",
    })
  );
});

export const postLogin = rest.post("/member/login", async (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.set({
      "Access-Token": "tokenString",
      "Set-Cookie": "Refresh-Token=tokenString",
    })
  );
});

export const getUserProfile = rest.get("/member/info", async (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      nickname: "삼코모",
      profile_image_url:
        "https://e1.pxfuel.com/desktop-wallpaper/210/265/desktop-wallpaper-cute-kitten-i-love-kittens.jpg",
      email: "ddd@gmail.com",
      phone: "010-1111-2222",
    })
  );
});
