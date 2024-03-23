import axios from "axios";

export const BASE_URL = "https://dbz-front-end.vercel.app";

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
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
export const axiosAcces = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosAcces.interceptors.request.use(
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
// access-token 만료시 refresh-token 사용해서 재발급
axiosAuth.interceptors.response.use(
  response => response,
  async error => {
    console.log(error);
    const errorCode = error.response.data.errorCode;
    // const errorStatus = error.reponse.status;

    const req = error.config;

    if (errorCode === 'ACCESS_TOKEN_EXPIRED') {
      try {
        const res = await axiosAuth.post('/member/reissue');
        const newACToken = res.headers["access-token"];
        localStorage.setItem("Access-Token", newACToken);

        req.headers.Authorization = `Bearer ${newACToken}`;
        return await axios(req);
      } catch (err) {
        alert('로그인을 다시 진행해주세요.');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);
