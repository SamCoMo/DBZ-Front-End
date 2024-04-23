import useUserState from "@/hooks/useUserState";
import axios from "axios";
// import { response } from "msw";

export const BASE_URL = "https://www.samcomo.site";
// export const BASE_URL = "http://localhost:5173";

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosAccess = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("Access-Token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// access-token 만료시 refresh-token 사용해서 재발급
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const errorCode = error.response.data.errorCode;

    const { userState, updateUser } = useUserState();

    const req = error.config;

    if (errorCode === "ACCESS_TOKEN_EXPIRED") {
      try {
        const res = await axiosAccess.post("/member/reissue");
        const newACToken = res.headers["access-token"];
        localStorage.setItem("Access-Token", newACToken);

        req.headers.Authorization = `Bearer ${newACToken}`;
        return await axios(req);
      } catch (err) {
        updateUser({
          ...userState,
          isLogin: false
        })
        alert("로그인을 다시 진행해주세요.");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

axiosAccess.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("Access-Token");
    if (accessToken) {
      config.headers["Access-Token"] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosAccess.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const errorCode = error.response.data.errorCode;

    const { userState, updateUser } = useUserState();

    const req = error.config;

    if (errorCode === "ACCESS_TOKEN_EXPIRED") {
      try {
        const res = await axiosAccess.post("/member/reissue");
        const newACToken = res.headers["access-token"];
        localStorage.setItem("Access-Token", newACToken);

        req.headers["Access-Token"] = `${newACToken}`;
        return await axios(req);
      } catch (err) {
        updateUser({
          ...userState,
          isLogin: false
        })
        alert("로그인을 다시 진행해주세요.");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
