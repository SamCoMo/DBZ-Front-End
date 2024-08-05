import { LoginDataType } from "@/types/auth/LoginDataType";
import { rest } from "msw";

export const postSignUp = rest.post(
  "/member/register",
  async (req, res, ctx) => {
    const newUser = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        memberId: 1,
        memberInfo: newUser,
        status: "ACTIVE",
        role: "MEMBER",
        createdAt: "2024-03-03T00:25:35.196872",
        updatedAt: "2024-03-03T00:25:35.196893",
      })
    );
  }
);

export const postLogin = rest.post<LoginDataType>(
  "/member/login",
  async (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === "test@test.com" && password === "qwer123!") {
      return res(
        ctx.status(200),
        ctx.set({
          "Access-Token": "tokenString",
          "Set-Cookie": "Refresh-Token=tokenString",
        })
      );
    } else {
      return res(ctx.status(400));
    }
  }
);

export const getUserProfile = rest.get("/member/my", async (_, res, ctx) => {
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

export const postLogout = rest.post("/member/logout", async (_, res, ctx) => {
  return res(ctx.status(200));
});

export const postWithDraw = rest.post(
  "/member/withdraw",
  async (_, res, ctx) => {
    return res(ctx.status(200));
  }
);
